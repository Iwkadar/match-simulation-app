import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { matchesById } from '../../utils/data-parser';
import { Teams } from '../../types/teams';
import { Matches, ScoreBoard } from '../../types/score-board';
import { RootState } from '../../types/app';

const defaultState: ScoreBoard = {
    matches: { byId: {} }
};

const scoreBoardSlice = createSlice({
    name: 'scoreBoard',
    initialState: defaultState,
    reducers: {
        simulationStarted: (state, action: PayloadAction<Teams>) => ({
            ...state,
            matches: {
                ...state.matches,
                byId: {
                    ...matchesById(action.payload)
                }
            }
        })
    }
});

export const { simulationStarted } = scoreBoardSlice.actions;

export const selectScoreBoardMatches = (state: RootState): Matches => state.scoreBoard.matches.byId;

export default scoreBoardSlice.reducer;
