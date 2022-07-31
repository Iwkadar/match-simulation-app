import { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';

export const App = hot(
    (): JSX.Element => (
        <StrictMode>
            <Router>
                <div>Hello</div>
            </Router>
        </StrictMode>
    )
);
