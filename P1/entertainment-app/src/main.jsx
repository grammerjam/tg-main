import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/globals.css";
import App from './App.jsx';
import { ProSidebarProvider } from "react-pro-sidebar";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </div>
  </React.StrictMode>
);
