import React from 'react';
import Button from '@atlaskit/button/new';
import Textfield from '@atlaskit/textfield';
import { token } from '@atlaskit/tokens';
import styled from '@emotion/styled';

const Container = styled.div`
    padding: ${token('space.200', '16px')};
    background: ${token('elevation.surface', '#FFF')};
`;

const MyComponent: React.FC = () => {
    const [value, setValue] = React.useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('/rest/myapi/1.0/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value })
            });
            // Обработка ответа
        } catch (error) {
            // Обработка ошибки
        }
    };

    return (
        <Container>
            <Textfield
                name="input"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                placeholder="Enter text"
            />
            <Button 
                appearance="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Container>
    );
};

export default MyComponent; 