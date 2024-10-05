
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "modern-normalize";
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import './i18n.ts';

createRoot(document.getElementById('root')!).render(


    <BrowserRouter>
    <App />
    
    
    </BrowserRouter>


)
