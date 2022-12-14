import { configureStore, combineReducers } from '@reduxjs/toolkit';
import scoreBoardReducer from './features/score-board/score-board-slice';

export const rootReducer = combineReducers({
    scoreBoard: scoreBoardReducer
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer
    });
