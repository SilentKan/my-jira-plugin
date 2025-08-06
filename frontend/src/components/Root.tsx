// src/components/Root.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocalCounterComponent from './MyComponent';
import RestComponent from './RestComponent';
import Navigation from './Navigation';

const Root = () => {
    return (
        <BrowserRouter basename="/plugins/servlet/my-react-page">
            <Navigation />
            <Routes>
                <Route path="/" element={<div style={{ marginTop: 32 }}>Выберите вкладку выше</div>} />
                <Route path="/view-local-counter" element={<LocalCounterComponent />} />
                <Route path="/view-rest" element={<RestComponent />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Root;
