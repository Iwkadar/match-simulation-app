import { loadFeature, defineFeature } from 'jest-cucumber';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from '../../store';
import { useInitTeams, useTeams } from '../../hooks/queries';
import { renderWithProviders } from '../../utils/test-utils';
import { simulationFinished, simulationStarted, updatedScore } from './score-board-slice';

import ScoreBoard from './score-board';

const feature = loadFeature('src/features/score-board/start-simulation.feature');

jest.mock('../../hooks/queries', () => ({
    useInitTeams: jest.fn(),
    useTeams: jest.fn()
}));

const teams = {
    0: { id: 0, name: 'Poland', score: 1 },
    1: { id: 1, name: 'Germany', score: 0 },
    2: { id: 2, name: 'Brazil', score: 0 },
    3: { id: 3, name: 'Mexico', score: 0 },
    4: { id: 4, name: 'Argentina', score: 0 },
    5: { id: 5, name: 'Uruguay', score: 0 }
};

defineFeature(feature, (test) => {
    let containerEl: HTMLElement;

    beforeEach(() => {
        (useInitTeams as jest.Mock).mockImplementation((enabled) => {
            if (enabled) {
                return {
                    data: teams
                };
            }
            return {
                data: undefined
            };
        });

        (useTeams as jest.Mock).mockImplementation((enabled) => {
            if (enabled) {
                return {
                    data: teams,
                    dataUpdatedAt: true
                };
            }
            return {
                data: undefined,
                dataUpdatedAt: false
            };
        });
    });

    test('Clicking start button', ({ given, when, then }) => {
        given('I am on the score board page', () => {
            const { container } = renderWithProviders(<ScoreBoard />);
            containerEl = container;
        });

        when('I click on "start button"', () => {
            userEvent.click(screen.getByRole('button', { name: /Start/i }));
        });

        then('Button should change text to Finish', () => {
            const buttonElement = containerEl.getElementsByTagName('button');
            expect(buttonElement[0].firstChild!.nodeValue).toEqual('Finish');
        });

        then('Simulation should start', () => {
            let totalScore = 0;
            const elementsWithScore = containerEl.getElementsByClassName('score');
            // eslint-disable-next-line no-return-assign
            Array.from(elementsWithScore, (e) => (totalScore += parseInt(e.textContent!, 10)));
            expect(totalScore).toBe(1);
            expect(useInitTeams).toHaveBeenCalledTimes(4);
            expect(useTeams).toHaveBeenCalledTimes(4);
        });
    });

    test('Clicking finish button', ({ given, when, then }) => {
        given('I am on the score board page', () => {
            const store = setupStore();
            store.dispatch(simulationStarted());
            store.dispatch(updatedScore(teams));
            const { container } = renderWithProviders(<ScoreBoard />, { store });
            containerEl = container;
        });

        when('I click on "finish button"', () => {
            userEvent.click(screen.getByRole('button', { name: /Finish/i }));
        });

        then('Button should change text to Restart', () => {
            const buttonElement = containerEl.getElementsByTagName('button');
            expect(buttonElement[0].firstChild!.nodeValue).toEqual('Restart');
        });

        then('Simulation should finish', () => {
            let totalScore = 0;
            const elementsWithScore = containerEl.getElementsByClassName('score');
            // eslint-disable-next-line no-return-assign
            Array.from(elementsWithScore, (e) => (totalScore += parseInt(e.textContent!, 10)));
            expect(totalScore).toBe(1);
        });
    });

    test('Clicking restart button', ({ given, when, then }) => {
        given('I am on the score board page', () => {
            const store = setupStore();
            store.dispatch(simulationFinished());
            store.dispatch(updatedScore(teams));
            const { container } = renderWithProviders(<ScoreBoard />, { store });
            containerEl = container;
        });

        when('I click on "restart button"', () => {
            userEvent.click(screen.getByRole('button', { name: /Restart/i }));
        });

        then('Button should change text to Finish', () => {
            const buttonElement = containerEl.getElementsByTagName('button');
            expect(buttonElement[0].firstChild!.nodeValue).toEqual('Finish');
        });

        then('Simulation should start', () => {
            let totalScore = 0;
            const elementsWithScore = containerEl.getElementsByClassName('score');
            // eslint-disable-next-line no-return-assign
            Array.from(elementsWithScore, (e) => (totalScore += parseInt(e.textContent!, 10)));
            expect(totalScore).toBe(1);
        });
    });
});
