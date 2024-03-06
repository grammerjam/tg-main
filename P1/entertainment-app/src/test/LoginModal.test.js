import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginModal from '../components/LoginModal';


describe('LoginModal Component', () =>
{
    it('renders with input fields, buttons, and links', () =>
    {
        const { getByPlaceholderText, getByText } = render(<Router><LoginModal /></Router>);

        expect(getByPlaceholderText('Email address')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
        expect(getByText('Login to your account')).toBeInTheDocument();
        expect(getByText('Don\'t have an account?')).toBeInTheDocument();
        expect(getByText('Forgot Your Password?')).toBeInTheDocument();
    });

    it('updates emailAddress and password state on input change', () =>
    {
        const { getByPlaceholderText } = render(<Router><LoginModal /></Router>);

        const emailInput = getByPlaceholderText('Email address');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('submits form with valid data and navigates on successful login', async () =>
    {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        const mockSignIn = {
            isLoaded: true,
            signIn: {
                create: jest.fn(() => Promise.resolve({ status: 'complete', createdSessionId: '123' })),
            },
            setActive: jest.fn(),
        };
        jest.mock('@clerk/clerk-react', () => ({
            useSignIn: jest.fn(() => mockSignIn),
        }));

        const { getByPlaceholderText, getByText } = render(<Router><LoginModal /></Router>);

        const emailInput = getByPlaceholderText('Email address');
        const passwordInput = getByPlaceholderText('Password');
        const submitButton = getByText('Login to your account');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSignIn.signIn.create).toHaveBeenCalled());
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('displays error message on failed login attempt', async () =>
    {
        const mockSignIn = {
            isLoaded: true,
            signIn: {
                create: jest.fn(() => Promise.reject({ errors: [{ message: 'Invalid credentials' }] })),
            },
        };
        jest.mock('@clerk/clerk-react', () => ({
            useSignIn: jest.fn(() => mockSignIn),
        }));

        const { getByPlaceholderText, getByText } = render(<Router><LoginModal /></Router>);

        const emailInput = getByPlaceholderText('Email address');
        const passwordInput = getByPlaceholderText('Password');
        const submitButton = getByText('Login to your account');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText('Invalid credentials')).toBeInTheDocument());
    });
});
