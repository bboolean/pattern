import { createRoot } from 'react-dom/client';
import { App } from './components/App.js';

// Connect the React app to the DOM.

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
