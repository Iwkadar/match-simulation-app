import { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const ScoreBoard = lazy(() => import('./features/score-board/score-board'));

export const App = hot(
    (): JSX.Element => (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<ScoreBoard />} />
                </Routes>
            </Suspense>
        </Router>
    )
);
