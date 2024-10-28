import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import Home from '../../pages/Home';

test('displays Sidebar and Navbar components when route changes', () => {
    render(<App />);


        expect(screen.getByTestId('test-login')).toBeInTheDocument(); 
        expect(screen.getByTestId('testSidebar')).toBeInTheDocument(); 
        expect(screen.getByTestId('test-home')).toBeInTheDocument();
    // Check if the Sidebar and Home components are displayed in App component

});
