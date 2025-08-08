import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

const Navigation = () => {
    const location = useLocation();

    const linkStyle = (path: string) => {
        const active = location.pathname === path;
        return {
            color: active ? token('color.link', '#0c66e4') : token('color.text', '#172B4D'),
            textDecoration: 'none',
            fontWeight: active ? 'bold' as const : 'normal' as const,
        };
    };

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
            <Link to="/view-local-counter" style={linkStyle('/view-local-counter')}>
                Local counter
            </Link>
            <Link to="/view-rest" style={linkStyle('/view-rest')}>
                Rest
            </Link>
            <Link to="/view-ao" style={linkStyle('/view-ao')}>
                AO Records
            </Link>
        </Box>
    );
};

export default Navigation;