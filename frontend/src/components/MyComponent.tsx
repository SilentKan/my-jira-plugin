import React, { useState } from 'react';
import Button from '@atlaskit/button/new';
import { PageLayout, Main, Content } from '@atlaskit/page-layout';
import { Box, xcss } from '@atlaskit/primitives';
import SectionMessage from '@atlaskit/section-message';

const wrapperStyles = xcss({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 'space.500',
});

const cardStyles = xcss({
    backgroundColor: 'elevation.surface',
    boxShadow: 'elevation.shadow.raised',
    padding: 'space.500',
    borderRadius: 'border.radius.200',
    textAlign: 'center',
    width: '100%',
    maxWidth: '360px',
});

const MyComponent: React.FC = () => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => setCounter((prev) => prev + 1);

    return (
        <PageLayout>
            <Content>
                <Main>
                    <Box xcss={wrapperStyles}>
                        <Box xcss={cardStyles}>
                            <Box xcss={xcss({ marginBottom: 'space.300' })}>
                                <Button appearance="primary" onClick={handleClick}>
                                    Нажми меня
                                </Button>
                            </Box>

                            {counter > 0 && (
                                <SectionMessage appearance="information">
                                    <div>
                                        <strong>Ты нажал {counter} раз</strong>
                                        <div style={{ marginTop: '8px' }}>
                                            Нажимай ещё раз, чтобы увеличить счётчик
                                        </div>
                                    </div>
                                </SectionMessage>
                            )}
                        </Box>
                    </Box>
                </Main>
            </Content>
        </PageLayout>
    );
};

export default MyComponent;
