import React from 'react';
import {Box, Stack, xcss} from '@atlaskit/primitives';
import Button from '@atlaskit/button/new';

const AoComponent = () => {

    const containerStyles = xcss({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'space.200',
        marginTop: 'space.400',
    });

    return (

        <Box xcss={containerStyles}>

            <Button appearance="primary" isDisabled>
                Добавить запись
            </Button>

            <p>Заглушка. Здесь будет таблица с CRUD по ActiveObjects.</p>
        </Box>
    );
};

export default AoComponent;
