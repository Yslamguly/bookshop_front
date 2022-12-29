import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import AuthProvider from "./hooks/UserContext";
import ShoppingCartContext from "./hooks/ShoppingCartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ShoppingCartContext>
                <App/>
            </ShoppingCartContext>
        </AuthProvider>
    </React.StrictMode>
);
