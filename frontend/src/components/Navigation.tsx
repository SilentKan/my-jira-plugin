import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@atlaskit/primitives';

const Navigation = () => {
    const location = useLocation();

    return (
        <Box
            as="nav"
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '32px',
                marginBottom: '24px',
            }}
        >
            <Link
                to="/view-local-counter"
                style={{
                    color: location.pathname === '/view-local-counter' ? '#0c66e4' : '#172B4D',
                    textDecoration: 'none',
                    fontWeight: location.pathname === '/view-local-counter' ? 'bold' : 'normal',
                }}
            >
                Local counter
            </Link>
            <Link
                to="/view-rest"
                style={{
                    color: location.pathname === '/view-rest' ? '#0c66e4' : '#172B4D',
                    textDecoration: 'none',
                    fontWeight: location.pathname === '/view-rest' ? 'bold' : 'normal',
                }}
            >
                Rest
            </Link>
        </Box>
    );
};

export default Navigation;
