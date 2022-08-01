import { useQuery, UseQueryResult } from 'react-query';

export const useTeams = (initTeamsData: unknown): UseQueryResult =>
    useQuery(
        [initTeamsData],
        () =>
            fetch('/teams', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) =>
                response.ok
                    ? response.json()
                    : response
                          .text()
                          .then((text) => JSON.parse(text))
                          .then(({ error }) => Promise.reject(new Error(error)))
            ),
        {
            enabled: !!initTeamsData,
            refetchInterval: 10000
        }
    );

export const useInitTeams = (enabled: boolean): UseQueryResult =>
    useQuery(
        [enabled],
        () =>
            fetch('/init').then((response) =>
                response.ok
                    ? response.json()
                    : response
                          .text()
                          .then((text) => JSON.parse(text))
                          .then(({ error }) => Promise.reject(new Error(error)))
            ),
        {
            enabled,
            refetchInterval: false
        }
    );
