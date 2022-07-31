import { configureStore, combineReducers } from '@reduxjs/toolkit';
import scoreBoardReducer from './features/score-board/score-board-slice';

const rootReducer = combineReducers({
    scoreBoard: scoreBoardReducer
});

/* eslint no-underscore-dangle: 0 */
export const store = configureStore({ reducer: rootReducer });
