import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CreateAccount from '../pages/CreateAccount';
import { useUser } from '@clerk/clerk-react';

jest.mock('@clerk/clerk-react', () => ({
    useUser: jest.fn(),
}));

const server = setupServer(
    rest.post(`${backendRootUrl}/api/users`, (req, res, ctx) =>
    {
        return res(ctx.status(200));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CreateAccount', () =>
{
    test('renders Loading message', () =>
    {
        useUser.mockReturnValue({ user: { primaryEmailAddress: { emailAddress: 'test@example.com' } } });
        render(<CreateAccount />);
        expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    test('makes POST request and redirects to homepage', async () =>
    {
        useUser.mockReturnValue({ user: { primaryEmailAddress: { emailAddress: 'test@example.com' } } });

        render(<CreateAccount />);

        await waitFor(() => expect(fetch).toHaveBeenCalledWith(
            `${backendRootUrl}/api/users`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: 'test@example.com' }),
            })
        ));

        expect(window.location.pathname).toEqual('/');
    });
});
