import { BookmarkContext } from '../components/BookmarkProvider.jsx';
import { useContext } from 'react';

export const useBookmarks = () => {
    return useContext(BookmarkContext);
}
