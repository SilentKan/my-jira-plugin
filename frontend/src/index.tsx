import React from 'react';
import * as ReactDOM from 'react-dom/client';
import MyComponent from './components/MyComponent';

const container = document.getElementById('my-plugin-container');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<MyComponent />);
}
