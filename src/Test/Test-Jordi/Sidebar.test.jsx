import { render } from '@testing-library/react';
import 'vitest'

import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

test('renders Sidebar', () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    );
    expect(getByTestId('testSidebar')).toBeInTheDocument();
});
