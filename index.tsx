
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './components/Toast';
import { AnimationSettingsProvider } from './hooks/useAnimationSettings';
import './hooks/i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AnimationSettingsProvider>
        <App />
      </AnimationSettingsProvider>
    </ToastProvider>
  </React.StrictMode>
);
