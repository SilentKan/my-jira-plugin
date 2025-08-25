import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocalCounterComponent from './MyComponent';
import RestComponent from './RestComponent';
import Navigation from './Navigation';
import AoComponent from "./AoComponent";
import WrmBootstrapPage from "./WrmBootstrapPage";


const Root: React.FC = () => {
    const boot = (window as any).APP_BOOTSTRAP ?? {};

    return (
        <BrowserRouter basename="/plugins/servlet/my-react-page">
            <Navigation />
            <Routes>
                <Route path="/" element={<div style={{ marginTop: 32 }}>Выберите вкладку выше</div>} />
                <Route path="/view-local-counter" element={<LocalCounterComponent />} />
                <Route path="/view-rest" element={<RestComponent />} />
                <Route path="/view-ao" element={<AoComponent />} />
                <Route path="/view-wrm-bootstrap" element={<WrmBootstrapPage bootstrap={boot} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Root;
