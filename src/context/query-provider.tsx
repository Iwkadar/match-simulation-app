import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const QueryProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const queryClient = new QueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
