import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryProvider } from './context/query-provider';
import { setupStore } from './store';

import { App } from './app';

import './style.css';

ReactDOM.render(
    <StrictMode>
        <Provider store={setupStore()}>
            <QueryProvider>
                <App />
            </QueryProvider>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);
