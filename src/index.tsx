import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryProvider } from './context/query-provider';
import { store } from './store';

import { App } from './app';

import './style.css';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <QueryProvider>
                <App />
            </QueryProvider>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);
