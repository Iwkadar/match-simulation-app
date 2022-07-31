import { loadFeature, defineFeature } from 'jest-cucumber';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryProvider } from '../../context/query-provider';
import { store } from '../../store';
import { useTeams } from '../../hooks/queries';
import { useAppSelector } from '../../hooks/redux';

import ScoreBoard from './score-board';

const feature = loadFeature('src/features/score-board/start-simulation.feature');

jest.mock('../../hooks/queries', () => ({
    useTeams: jest.fn()
}));

jest.mock('../../hooks/redux', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn()
}));

const teams = {
    0: { id: 0, name: 'Poland', score: 0 },
    1: { id: 1, name: 'Germany', score: 0 },
    2: { id: 2, name: 'Brazil', score: 0 },
    3: { id: 3, name: 'Mexico', score: 0 },
    4: { id: 4, name: 'Argentina', score: 0 },
    5: { id: 5, name: 'Uruguay', score: 0 }
};

const scoreBoardStore = {
    matches: {
        byId: {
            0: { id: 0, teamsId: [1, 0] },
            1: { id: 1, teamsId: [2, 3] },
            2: { id: 2, teamsId: [4, 5] }
        }
    }
};

defineFeature(feature, (test) => {
    let containerEl: HTMLElement;

    beforeEach(() => {
        (useAppSelector as jest.Mock).mockImplementation(() => scoreBoardStore.matches.byId);

        (useTeams as jest.Mock).mockImplementation((enabled) => {
            if (enabled) {
                teams['0'].score += 1;
                useAppSelector(() => scoreBoardStore.matches.byId);
                return {
                    data: teams,
                    dataUpdatedAt: true
                };
            }
            return {
                data: teams,
                dataUpdatedAt: true
            };
        });
    });

    test('Clicking start button', ({ given, when, then }) => {
        given('I am on the start page', () => {
            const { container } = render(
                <Provider store={store}>
                    <QueryProvider>
                        <ScoreBoard />
                    </QueryProvider>
                </Provider>
            );
            containerEl = container;
        });

        when('I click on "start button"', () => {
            userEvent.click(screen.getByRole('button', { name: /Start/i }));
        });

        then('Simulation should start', () => {
            let totalScore = 0;
            const elementsWithScore = containerEl.getElementsByClassName('score');
            // eslint-disable-next-line no-return-assign
            Array.from(elementsWithScore, (e) => (totalScore += parseInt(e.textContent!, 10)));
            expect(totalScore).toBe(1);
            expect(useTeams).toHaveBeenCalledTimes(2);
        });
    });
});
