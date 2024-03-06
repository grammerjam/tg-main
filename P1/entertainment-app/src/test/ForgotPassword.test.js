import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ForgotPassword from '../pages/ForgotPassword';

test('renders ForgotPassword component', () =>
{
    const { getByAltText, getByPlaceholderText, getByRole } = render(<ForgotPassword />);

    expect(getByAltText('Logo')).toBeInTheDocument();

    expect(getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(getByPlaceholderText('Reset Code')).toBeInTheDocument();
    expect(getByPlaceholderText('New Password')).toBeInTheDocument();

    expect(getByRole('button', { name: 'Send Code' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Reset' })).toBeInTheDocument();
});

test('form validation', () =>
{
    const { getByText, getByRole } = render(<ForgotPassword />);

    expect(getByText("Can't be empty")).not.toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'Send Code' }));
    expect(getByText("Can't be empty")).toBeInTheDocument();
});
