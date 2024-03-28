import PropTypes from 'prop-types';

import { useUser } from "@clerk/clerk-react";
import { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const backendRootUrl = import.meta.env.VITE_BACKEND_URL

export const BookmarkContext = createContext(null);

const BookmarkProvider = ({ children }) => {
    const { user } = useUser();
    const [bookmarks, setBookmarks] = useState([])
    let userEmail = user.primaryEmailAddress.emailAddress

    const { isSuccess, isLoading, error } = useQuery({
        queryKey: [`bookmarks`],
        queryFn: async () => {
            const bookmarks = await fetch(backendRootUrl + "api/" + `users/bookmarks/?email=${userEmail}`)
                .then((bookmarks) => 
                    bookmarks.json(),
                )
            setBookmarks(bookmarks)
        },
        keepPreviousData: true,
    });

    return (
        <>
            <BookmarkContext.Provider value={
                {
                    bmLoading: isLoading,
                    bmError: error,
                    bmSuccess: isSuccess,
                    bookmarks: bookmarks,
                    setBookmarks: setBookmarks
                }
            }>
                {children}
            </BookmarkContext.Provider>
        </>
    )
}

BookmarkProvider.propTypes = {
    children: PropTypes.node
}

export default BookmarkProvider;


