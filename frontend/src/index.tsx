import React from 'react';
import { createRoot } from 'react-dom/client';
import MyComponent from './components/MyComponent';

function init() {
    const container = document.getElementById('my-plugin-container');
    
    if (container) {
        const root = createRoot(container);
        root.render(
            <React.StrictMode>
                <MyComponent />
            </React.StrictMode>
        );
        return true;
    } else {
        console.error('Cannot find #my-plugin-container');
        return false;
    }
}

// Экспортируем функцию инициализации для AMD модуля
export default init;
