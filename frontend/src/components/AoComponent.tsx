import React, { useEffect, useMemo, useState } from 'react';
import { Box, xcss } from '@atlaskit/primitives';
import Button from '@atlaskit/button/new';
import DynamicTable from '@atlaskit/dynamic-table';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '@atlaskit/modal-dialog';
import Form, { Field, FormFooter } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import EmptyState from '@atlaskit/empty-state';
import SectionMessage from '@atlaskit/section-message';
import Spinner from '@atlaskit/spinner';
import { fetchRecords, createRecord, deleteRecord, RecordDto } from '../api/records';

const container = xcss({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'space.200',
    marginTop: 'space.400',
    width: '100%',
});
const tableWrap = xcss({ width: '100%', maxWidth: '960px' });

const AoComponent = () => {
    const [data, setData] = useState<RecordDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [isOpen, setOpen] = useState(false);

    // load from backend
    useEffect(() => {
        let alive = true;
        setLoading(true);
        setErr(null);
        fetchRecords()
            .then((rows) => alive && setData(rows))
            .catch((e) => alive && setErr(String(e.message || e)))
            .finally(() => alive && setLoading(false));
        return () => {
            alive = false;
        };
    }, []);

    const head = useMemo(
        () => ({
            cells: [
                { key: 'id', content: 'ID', isSortable: true, width: 1 },
                { key: 'name', content: 'NAME', isSortable: true, width: 3 },
                { key: 'value', content: 'VALUE', isSortable: true, width: 2 },
                { key: 'actions', content: 'Actions', width: 2 },
            ],
        }),
        [],
    );

    const rows = useMemo(
        () =>
            data.map((r) => ({
                key: String(r.id),
                cells: [
                    { key: `id-${r.id}`, content: r.id },
                    { key: `name-${r.id}`, content: r.name },
                    { key: `value-${r.id}`, content: r.value },
                    {
                        key: `actions-${r.id}`,
                        content: (
                            <Button
                                appearance="danger"
                                onClick={async () => {
                                    const snapshot = data;
                                    setData((d) => d.filter((x) => x.id !== r.id));
                                    try {
                                        await deleteRecord(r.id);
                                    } catch (e) {
                                        setData(snapshot); // откат если упало
                                        setErr(`Не удалось удалить запись #${r.id}: ${String((e as Error).message || e)}`);
                                    }
                                }}
                            >
                                Удалить
                            </Button>
                        ),
                    },
                ],
            })),
        [data],
    );

    // Валидации формы
    const validateName = (value?: string) => {
        const v = (value ?? '').trim();
        if (!v) return 'Введите имя';
        if (v.length > 255) return 'Макс. длина 255 символов';
        return undefined;
    };
    const validateValue = (value?: string) => {
        if (value === undefined) return 'Введите значение';
        const n = Number(value);
        if (!Number.isFinite(n) || !Number.isInteger(n)) return 'Должно быть целое число';
        return undefined;
    };

    return (
        <Box xcss={container}>
            <Button appearance="primary" onClick={() => setOpen(true)}>
                Добавить запись
            </Button>

            {err && (
                <Box style={{ width: '100%', maxWidth: 960 }}>
                    <SectionMessage appearance="error" title="Ошибка">{err}</SectionMessage>
                </Box>
            )}

            <Box xcss={tableWrap}>
                {loading ? (
                    <Box style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
                        <Spinner size="large" />
                    </Box>
                ) : (
                    <DynamicTable
                        testId="ao-table"
                        caption="AO Records"
                        head={head}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onSetPage={(p) => setPage(p)}
                        defaultSortKey="id"
                        defaultSortOrder="ASC"
                        isFixedSize
                        emptyView={
                            <EmptyState
                                header="Нет записей"
                                description="Нажми «Добавить запись», чтобы создать первую строку."
                                primaryAction={
                                    <Button appearance="primary" onClick={() => setOpen(true)}>
                                        Добавить запись
                                    </Button>
                                }
                            />
                        }
                    />
                )}
            </Box>

            {isOpen && (
                <Modal onClose={() => setOpen(false)}>
                    <ModalHeader>
                        <ModalTitle>Новая запись</ModalTitle>
                    </ModalHeader>
                    <Form<{ name: string; value: string }>
                        onSubmit={async ({ name, value }) => {
                            try {
                                const created = await createRecord({ name: name.trim(), value: parseInt(value, 10) });
                                setData((d) => [...d, created]);
                                setOpen(false);
                            } catch (e) {
                                setErr(`Не удалось создать запись: ${String((e as Error).message || e)}`);
                            }
                        }}
                    >
                        {({ formProps, submitting }) => (
                            <>
                                <ModalBody>
                                    <form {...formProps} id="ao-add-form">
                                        <Field name="name" label="NAME" isRequired validate={validateName} defaultValue="">
                                            {({ fieldProps, error }) => <Textfield {...fieldProps} isInvalid={!!error} />}
                                        </Field>
                                        <Field name="value" label="VALUE" isRequired validate={validateValue} defaultValue="">
                                            {({ fieldProps, error }) => <Textfield {...fieldProps} type="number" isInvalid={!!error} />}
                                        </Field>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <FormFooter>
                                        <Button type="submit" form="ao-add-form" appearance="primary" isLoading={submitting}>
                                            Сохранить
                                        </Button>
                                        <Button appearance="subtle" onClick={() => setOpen(false)}>
                                            Отмена
                                        </Button>
                                    </FormFooter>
                                </ModalFooter>
                            </>
                        )}
                    </Form>
                </Modal>
            )}
        </Box>
    );
};

export default AoComponent;
