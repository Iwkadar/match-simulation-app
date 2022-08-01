import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { matchesById } from '../../utils/data-parser';
import { Matches, ScoreBoard, Status, Teams } from '../../types/score-board';
import { RootState } from '../../types/app';

const defaultState: ScoreBoard = {
    matches: { byId: {} },
    teams: {
        byId: {
            0: { id: 0, name: 'Poland', score: 0 },
            1: { id: 1, name: 'Germany', score: 0 },
            2: { id: 2, name: 'Brazil', score: 0 },
            3: { id: 3, name: 'Mexico', score: 0 },
            4: { id: 4, name: 'Argentina', score: 0 },
            5: { id: 5, name: 'Uruguay', score: 0 }
        }
    },
    status: 'initializing'
};

const scoreBoardSlice = createSlice({
    name: 'scoreBoard',
    initialState: defaultState,
    reducers: {
        initializedMatches: (state) => ({
            ...state,
            matches: {
                ...state.matches,
                byId: {
                    ...matchesById(state.teams.byId)
                }
            }
        }),
        updatedScore: (state, action: PayloadAction<Teams>) => ({
            ...state,
            teams: {
                ...state.teams,
                byId: {
                    ...action.payload
                }
            }
        }),
        simulationStarted: (state) => ({ ...state, status: 'running' }),
        simulationFinished: (state) => ({ ...state, status: 'finished' })
    }
});

export const { initializedMatches, updatedScore, simulationStarted, simulationFinished } = scoreBoardSlice.actions;

export const selectScoreBoardMatches = (state: RootState): Matches => state.scoreBoard.matches.byId;
export const selectScoreBoardTeams = (state: RootState): Teams => state.scoreBoard.teams.byId;
export const selectScoreBoardStatus = (state: RootState): Status => state.scoreBoard.status;

export default scoreBoardSlice.reducer;
