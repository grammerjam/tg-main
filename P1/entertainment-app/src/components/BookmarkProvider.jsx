import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const BookmarkContext = createContext([]);

const BookmarkProvider = ({ children }) => {
    const [contextBookmarks, setContextBookmarks] = useState([])
    

    return (<>
        <BookmarkContext.Provider value={[contextBookmarks, setContextBookmarks]}>
            {children}
        </BookmarkContext.Provider>
    </>)
}

BookmarkProvider.propTypes = {
    children: PropTypes.node
}

export default BookmarkProvider;


