import PropTypes from 'prop-types';

import { useUser } from "@clerk/clerk-react";
import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const backendRootUrl = import.meta.env.VITE_BACKEND_URL

export const BookmarkContext = createContext({});

const BookmarkProvider = ({ children }) => {
    const { user } = useUser();
    let userEmail = user.primaryEmailAddress.emailAddress

    const {data: bookmarks, error } = useQuery({
        queryKey: [`bookmarks`],
        queryFn: async () => {
            const res = await fetch(backendRootUrl + "api/" + `users/bookmarks/?email=${userEmail}`);
            const data = await res.json();
            let bookmarkIds = {};
            data.forEach(bookmark => {
                bookmarkIds[bookmark.id] = true;
            });
            return bookmarkIds;
        },
    });
    return (
        <>
            <BookmarkContext.Provider value={{bookmarks: bookmarks, error: error}}>
                {children}
            </BookmarkContext.Provider>
        </>
    )
}

BookmarkProvider.propTypes = {
    children: PropTypes.node
}

export default BookmarkProvider;


