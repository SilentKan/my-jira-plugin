import React, { useState } from 'react';
import Button from '@atlaskit/button/new';
import { token } from '@atlaskit/tokens';
import styled from '@emotion/styled';

const Container = styled.div`
    padding: ${token('space.200', '16px')};
    background: ${token('elevation.surface', '#FFF')};
    max-width: 300px;
    margin: 32px auto;
    border-radius: 8px;
    box-shadow: 0 0 0 1px ${token('color.border', '#DFE1E6')};
    text-align: center;
`;

const Label = styled.h4`
    margin-bottom: ${token('space.150', '12px')};
`;

const MyComponent: React.FC = () => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        const next = counter + 1;
        setCounter(next);
        console.log(`Button clicked ${next} times`);
    };

    return (
        <Container>
            <Label>Простой счётчик</Label>
            <Button appearance="primary" onClick={handleClick}>
                Нажми меня
            </Button>
        </Container>
    );
};

export default MyComponent;
