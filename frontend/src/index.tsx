import React from 'react';
import { createRoot } from 'react-dom/client';
import MyComponent from './components/MyComponent';
import 'wrm/require';
import 'jira/api/react-18';
import 'jira/api/react-dom-18';

function init() {
    const container = document.getElementById('my-plugin-container');
    if (container) {
        const root = createRoot(container);
        root.render(
            <React.StrictMode>
                <MyComponent />
            </React.StrictMode>
        );
    }
}

export default init;
