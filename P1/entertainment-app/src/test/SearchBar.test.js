import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () =>
{
    it('updates currentSearch state when input value changes', () =>
    {
        const { getByPlaceholderText } = render(<SearchBar />);

        const input = getByPlaceholderText('Search for movies or TV series');

        fireEvent.change(input, { target: { value: 'test' } });

        expect(input.value).toBe('test');
    });

    it('updates searchParams when form is submitted', () =>
    {
        const setSearchParams = jest.fn();
        const { getByPlaceholderText, getByRole } = render(
            <Router>
                <SearchBar />
            </Router>
        );

        const input = getByPlaceholderText('Search for movies or TV series');
        const form = getByRole('form');

        fireEvent.change(input, { target: { value: 'test' } });

        fireEvent.submit(form);

        expect(setSearchParams).toHaveBeenCalledWith({ search: 'test' });
    });
});