import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerServiceWorker, setupInstallPrompt } from './utils/pwa-utils';



// Ensure the root element exists and is not null
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  //<React.StrictMode>
  <Router>
    <App />
  </Router>
  //</React.StrictMode>
);

reportWebVitals(console.log);

window.AddEventListener('load', () => {
  registerServiceWorker();
  setupInstallPrompt();
})
