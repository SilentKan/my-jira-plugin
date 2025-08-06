// src/components/Navigation.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@atlaskit/primitives';

const Navigation = () => {
    const location = useLocation();

    return (
        <Box style={{ marginBottom: '16px' }}>
            <Link to="/view-local-counter" style={{ marginRight: 16, color: location.pathname === '/view-local-counter' ? '#0c66e4' : '#172B4D' }}>
                Local counter
            </Link>
            <Link to="/view-rest" style={{ color: location.pathname === '/view-rest' ? '#0c66e4' : '#172B4D' }}>
                Rest
            </Link>
        </Box>
    );
};

export default Navigation;
