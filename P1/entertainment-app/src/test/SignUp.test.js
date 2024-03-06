import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSignUp } from '@clerk/clerk-react';
import SignUp from '../pages/SignUp';

jest.mock('@clerk/clerk-react', () => ({
    useSignUp: jest.fn(),
}));

describe('SignUp Component', () =>
{
    it('renders input fields and buttons', () =>
    {
        useSignUp.mockReturnValue({ isLoaded: true });
        const { getByPlaceholderText, getByText } = render(<Router><SignUp /></Router>);

        expect(getByPlaceholderText('Email address')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
        expect(getByPlaceholderText('Repeat Password')).toBeInTheDocument();
        expect(getByText('Create an Account')).toBeInTheDocument();
        expect(getByText('Already have an account?')).toBeInTheDocument();
    });

    it('submits form with valid data', async () =>
    {
        useSignUp.mockReturnValue({
            isLoaded: true,
            signUp: { create: jest.fn(() => Promise.resolve()) },
        });
        const { getByPlaceholderText, getByText } = render(<Router><SignUp /></Router>);

        fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(getByPlaceholderText('Repeat Password'), { target: { value: 'password123' } });
        fireEvent.click(getByText('Create an Account'));

        await waitFor(() => expect(useSignUp().signUp.create).toHaveBeenCalled());
    });

    it('displays error message on password mismatch', async () =>
    {
        useSignUp.mockReturnValue({ isLoaded: true });
        const { getByPlaceholderText, getByText } = render(<Router><SignUp /></Router>);

        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(getByPlaceholderText('Repeat Password'), { target: { value: 'differentPassword' } });
        fireEvent.click(getByText('Create an Account'));

        expect(getByText('Passwords do not match')).toBeInTheDocument();
    });

});
