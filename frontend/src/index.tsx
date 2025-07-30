import React from 'react';
import { createRoot } from 'react-dom/client';
import MyComponent from './components/MyComponent';

// Принудительно импортируем WRM, чтобы зависимость попала в wr-defs.xml
// @ts-ignore
import WRM from 'wr';
console.log('[my-plugin] WRM loaded:', WRM);

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

// @ts-ignore
if (typeof define === 'function' && define.amd) {
    // @ts-ignore
    define('my-plugin', [], () => init);
}


// Экспортируем функцию инициализации для AMD модуля
export default init;
