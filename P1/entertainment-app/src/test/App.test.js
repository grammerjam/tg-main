import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from '../App';

jest.mock('@clerk/clerk-react', () => ({
    SignedIn: ({ children }) => <div data-testid="signed-in">{children}</div>,
    SignedOut: ({ children }) => <div data-testid="signed-out">{children}</div>,
}));

describe('App', () =>
{
    test('renders login page when signed out', () =>
    {
        ClerkProvider.SignedOut = jest.fn(({ children }) => children);

        render(
            <Router>
                <App />
            </Router>
        );

        expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    });

    test('renders home page when signed in', () =>
    {
        ClerkProvider.SignedIn = jest.fn(({ children }) => children);

        render(
            <Router>
                <App />
            </Router>
        );

        expect(screen.getByTestId('signed-in')).toBeInTheDocument();
    });
});