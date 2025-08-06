import React from 'react';
import { createRoot } from 'react-dom/client';
import MyComponent from './components/MyComponent';
import Root from "./components/Root";

(window as any).initMyPlugin = function () {
    const container = document.getElementById('my-plugin-container');
    if (container) {
        const root = createRoot(container);
        root.render(
            <React.StrictMode>
                <Root/>
            </React.StrictMode>
        );
    }
};
