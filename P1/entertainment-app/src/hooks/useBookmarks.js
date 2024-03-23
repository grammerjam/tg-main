import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

const backendRootUrl = import.meta.env.VITE_BACKEND_URL

export const useBookmarks = () => {
    const { user } = useUser();
    let userEmail = user.primaryEmailAddress.emailAddress

    const {data: bookmarks} = useQuery({
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

    return bookmarks;
}