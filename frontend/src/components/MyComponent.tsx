import React, { useState } from 'react';
import Button from '@atlaskit/button/new';
import { Box, xcss } from '@atlaskit/primitives';
import SectionMessage from '@atlaskit/section-message';

const containerStyles = xcss({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'space.200',
    marginTop: 'space.400',
});

const MyComponent: React.FC = () => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter((prev) => prev + 1);
    };

    return (
        <Box xcss={containerStyles}>
            <Button appearance="primary" onClick={handleClick}>
                Нажми меня
            </Button>

            {counter > 0 && (
                <Box as="pre" style={{ whiteSpace: 'pre-wrap', maxWidth: 600 }}>
                    <SectionMessage appearance="information">
                        <div>
                            <strong>Ты нажал {counter} раз</strong>
                            <div style={{ marginTop: 8 }}>
                                Нажимай ещё раз, чтобы увеличить счётчик
                            </div>
                        </div>
                    </SectionMessage>
                </Box>
            )}
        </Box>
    );
};

export default MyComponent;
