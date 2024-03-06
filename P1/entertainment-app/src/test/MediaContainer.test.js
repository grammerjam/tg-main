import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MediaContainer from '../components/MediaContainer';

const server = setupServer(
  rest.get('/api/media', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: 'Movie 1', year: '2020' },
        { id: 2, title: 'Movie 2', year: '2021' },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Check rendering of the component in loading state', () => {
  test('renders MediaContainer component with loading state', () => {
    render(<MediaContainer pageTitle="Movies" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  test('renders MediaContainer component with data', async () => {
    render(<MediaContainer pageTitle="Movies" />);
    await waitFor(() => expect(screen.getByText('Movie 1')).toBeInTheDocument());
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  test('renders MediaContainer component with error state', async () => {
    server.use(
      rest.get('/api/media', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<MediaContainer pageTitle="Movies" />);
    await waitFor(() =>
      expect(screen.getByText('An error has occurred:')).toBeInTheDocument()
    );
  });

  test('renders MediaContainer component with search results', async () => {
    render(<MediaContainer pageTitle="Movies" />);
    await waitFor(() => expect(screen.getByText('Movie 1')).toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Movie 1' } });

    expect(screen.getByText('Found 1 result for "Movie 1"')).toBeInTheDocument();
    expect(screen.queryByText('Movie 2')).not.toBeInTheDocument();
  });
});
