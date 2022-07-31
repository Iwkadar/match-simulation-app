import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryProvider } from '../context/query-provider';
import { useTeams } from '../hooks/queries';

import ScoreBoard from '../score-board';

const feature = loadFeature('src/features/start-simulation.feature');

const teams = {
    0: { id: 0, name: 'Poland', score: 0 },
    1: { id: 1, name: 'Germany', score: 0 },
    2: { id: 2, name: 'Brazil', score: 0 },
    3: { id: 3, name: 'Mexico', score: 0 },
    4: { id: 4, name: 'Argentina', score: 0 },
    5: { id: 5, name: 'Uruguay', score: 0 }
};

jest.mock('../hooks/queries', () => ({
    useTeams: jest.fn()
}));

defineFeature(feature, (test) => {
    let containerEl: HTMLElement;

    beforeEach(() => {
        (useTeams as jest.Mock).mockImplementation((enabled) => ({
            data: teams
        }));
    });

    test('Clicking start button', ({ given, when, then }) => {
        given('I am on the start page', () => {
            const { container } = render(
                <QueryProvider>
                    <ScoreBoard />
                </QueryProvider>
            );
            containerEl = container;
        });

        when('I click on "start button"', () => {
            userEvent.click(screen.getByRole('button', { name: /Start/i }));
        });

        then('Simulation should start', () => {
            // eslint-disable-next-line no-return-assign
            expect(useTeams).toHaveBeenCalledTimes(2);
        });
    });
});
