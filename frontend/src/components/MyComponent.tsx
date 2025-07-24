import React, { useState } from 'react';
import Button from '@atlaskit/button/new';
import Textfield from '@atlaskit/textfield';
import { token } from '@atlaskit/tokens';
import styled from '@emotion/styled';

const Container = styled.div`
    padding: ${token('space.200', '16px')};
    background: ${token('elevation.surface', '#FFF')};
    max-width: 400px;
    margin: 32px auto;
    border-radius: 8px;
    box-shadow: 0 0 0 1px ${token('color.border', '#DFE1E6')};
`;

const FieldWrapper = styled.div`
    margin-bottom: 16px;
`;

const MyComponent: React.FC = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!value.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/rest/myplugin/1.0/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value }),
            });

            if (!response.ok) {
                console.error('Request failed', await response.text());
            } else {
                console.log('Data submitted successfully');
                setValue('');
            }
        } catch (error) {
            console.error('Error submitting data', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FieldWrapper>
                <Textfield
                    name="input"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}

                    placeholder="Enter text"
                    autoFocus
                />
            </FieldWrapper>
            <Button appearance="primary" onClick={handleSubmit} isDisabled={loading}>
                {loading ? 'Sending…' : 'Submit'}
            </Button>
        </Container>
    );
};

export default MyComponent;
