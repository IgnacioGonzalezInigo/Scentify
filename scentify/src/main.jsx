import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';


const rootDiv = document.getElementById('root');
const reactRoot = createRoot(rootDiv);
reactRoot.render(<App />);
