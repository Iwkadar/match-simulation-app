import { FC, ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { AppStore } from '../types/app';
import { setupStore } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    store?: AppStore;
}

export const renderWithProviders = (
    ui: ReactElement,
    { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}
): RenderResult => {
    const Wrapper: FC = ({ children }): JSX.Element => <Provider store={store}>{children}</Provider>;

    return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
