import { render } from '@testing-library/react';
import { App } from './app';

test('renders App', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
});
