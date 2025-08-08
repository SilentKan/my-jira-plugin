export type RecordDto = { id: number; name: string; value: number };

// window.contextPath доступен, если в web-resource есть зависимость context-path
const CTX: string = (window as any).contextPath || '';
// замени my-plugin-key на key твоего REST-модуля
const BASE = `${CTX}/rest/myplugin/1.0/records`;

function assertOk(res: Response) {
    if (!res.ok) throw new Error(res.statusText);
    return res;
}

export async function fetchRecords(): Promise<RecordDto[]> {
    const res = await fetch(BASE, { credentials: 'same-origin' });
    await assertOk(res);
    return res.json();
}

export async function createRecord(payload: Omit<RecordDto, 'id'>): Promise<RecordDto> {
    const res = await fetch(BASE, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-Atlassian-Token': 'no-check',
        },
        body: JSON.stringify(payload),
    });
    await assertOk(res);
    return res.json();
}

export async function deleteRecord(id: number): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { 'X-Atlassian-Token': 'no-check' },
    });
    await assertOk(res);
}
