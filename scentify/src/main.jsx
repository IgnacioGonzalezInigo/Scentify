import { createRoot } from 'react-dom/client';
import { exportProductsToFirestore } from "./data/firebase.js";
import './index.css';
import App from './App.jsx';

exportProductsToFirestore(); // Ejecutar SOLO una vez para subir productos

const rootDiv = document.getElementById('root');
const reactRoot = createRoot(rootDiv);
reactRoot.render(<App />);
