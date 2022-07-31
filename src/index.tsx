import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { QueryProvider } from './context/query-provider';

import { App } from './app';

import './style.css';

ReactDOM.render(
    <StrictMode>
        <QueryProvider>
            <App />
        </QueryProvider>
    </StrictMode>,
    document.getElementById('root')
);
