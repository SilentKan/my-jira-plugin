import React, { useState } from 'react';
import Button from '@atlaskit/button/new';
import styled from '@emotion/styled';

const Wrapper = styled.div`
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Container = styled.div`
    padding: 24px;
    background: white;
    max-width: 320px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 0 0 1px #dfe1e6;
    text-align: center;
`;

const Label = styled.h4`
    margin-bottom: 20px; /* увеличенный отступ */
    font-size: 16px;
`;

const MyComponent: React.FC = () => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        const next = counter + 1;
        setCounter(next);
        console.log(`Button clicked ${next} times`);
    };

    return (
        <Wrapper>
            <Container>
                <Label>Простой счётчик</Label>
                <Button appearance="primary" onClick={handleClick}>
                    Нажми меня
                </Button>
            </Container>
        </Wrapper>
    );
};

export default MyComponent;
