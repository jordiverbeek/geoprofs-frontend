import { render } from '@testing-library/react';
import 'vitest'

import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register';

test('renders Register', () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
    expect(getByTestId('testRegister')).toBeInTheDocument();
});
