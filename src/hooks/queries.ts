import { useQuery, UseQueryResult } from 'react-query';

export const useTeams = (enabled: boolean): UseQueryResult =>
    useQuery(
        '',
        () =>
            fetch('/teams').then((response) =>
                response.ok
                    ? response.json()
                    : response
                          .text()
                          .then((text) => JSON.parse(text))
                          .then(({ error }) => Promise.reject(new Error(error)))
            ),
        {
            refetchInterval: 10000,
            enabled
        }
    );
