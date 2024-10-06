
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'modern-normalize';
import './index.css';
import './i18n.js';

import { persistor, store } from './redux/store'; // Убедитесь, что это TypeScript файл
import App from './App'; // Убедитесь, что это TypeScript файл

// Определяем тип для элемента root
const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
