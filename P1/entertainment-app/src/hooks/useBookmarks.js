import { useContext } from "react";
import { BookmarkContext } from "../components/BookmarkProvider";

export const useBookmarks = () => {
    const {bookmarks, error} = useContext(BookmarkContext);
    
    if (error){
        console.log(error)
        return {}
    }
    return bookmarks;
}