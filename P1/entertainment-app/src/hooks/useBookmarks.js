import { BookmarkContext } from '../components/BookmarkProvider.jsx';
import { useContext } from 'react';

export const useBookmarks = () => {
    const bookmarks = useContext(BookmarkContext);
    return { bookmarks };
}
