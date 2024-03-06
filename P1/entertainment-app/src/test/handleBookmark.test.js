import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { updateBookmark } from '../hooks/handleBookmark';

const server = setupServer(
    rest.put(`${backendRootUrl}/api/${bookmarkRoute}`, (req, res, ctx) =>
    {
        return res(
            ctx.status(200),
            ctx.json({ message: 'Bookmark updated successfully' })
        );
    })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('updateBookmark', () =>
{
    test('updates bookmark successfully', async () =>
    {
        const testData = {
            userEmail: 'test@example.com',
            bookmarkId: 123,
        };
        console.log = jest.fn();
        await updateBookmark(testData);
      expect(console.log).toHaveBeenCalledWith('Bookmark updated successfully');
    });
});
