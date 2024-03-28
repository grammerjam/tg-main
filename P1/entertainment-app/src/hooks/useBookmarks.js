import { BookmarkContext } from '../components/BookmarkProvider.jsx';
import { useContext } from 'react';

export const useBookmarks = () => {
    const context  = useContext(BookmarkContext);

    if (context === undefined) {
        throw new Error('useBookmarks must be used within a BookmarkProvider');
    }
    
    return context
}
