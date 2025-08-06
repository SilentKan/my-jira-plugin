import React, { useState } from 'react';
import Button from '@atlaskit/button/new';
import { Box, xcss } from '@atlaskit/primitives';
import Spinner from '@atlaskit/spinner';
import SectionMessage from "@atlaskit/section-message";

const containerStyles = xcss({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'space.200',
    marginTop: 'space.400',
});

const RestComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleLoadData = async () => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch('/rest/myplugin/1.0/data');
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const result = await response.text();
            setData(result);
        } catch (e: any) {
            setError(e.message || 'Неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box xcss={containerStyles}>
            <Button appearance="primary" onClick={handleLoadData} isDisabled={loading}>
                {loading ? 'Загрузка...' : 'Загрузить данные'}
            </Button>

            {loading && <Spinner size="medium" />}

            {data && (
                <Box as="pre" style={{ whiteSpace: 'pre-wrap', maxWidth: 600 }}>
                    <SectionMessage appearance="information">
                        <div>
                            <strong>{data}</strong>
                        </div>
                    </SectionMessage>

                </Box>
            )}

            {error && (
                <Box style={{ color: 'red' }}>
                    Ошибка: {error}
                </Box>
            )}
        </Box>
    );
};

export default RestComponent;
