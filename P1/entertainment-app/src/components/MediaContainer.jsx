import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";
import MediaList from './MediaList';
import {
    useQuery,
} from '@tanstack/react-query'
import { useUser } from "@clerk/clerk-react";

const backendRootUrl = import.meta.env.VITE_BACKEND_URL

function getUrlQuery(title, email) {
    switch (title) {
        case "Movies":
            return "media/movies"
        case "TV Series":
            return "media/tv-series"
        case "Recommended":
            return "media"
        case "Bookmarked":
            return `users/bookmarks/?userEmail=${email}`
    }
}

export default function MediaContainer({ pageTitle }) {
    const { user } = useUser();
    let userEmail = user.primaryEmailAddress.emailAddress
    let [searchParams] = useSearchParams()
    let searchString = searchParams.get('search')

    const { isLoading, data, error } = useQuery({
        queryKey: [`${pageTitle}`],
        queryFn: () =>
            fetch(backendRootUrl + "api/" + getUrlQuery(pageTitle, userEmail)).then((res) =>
                res.json(),
            ),
        keepPreviousData: true,
        select: (response) => {
            if (searchString) {
                searchString = searchString.toLowerCase()
                let filteredPageResults = response.filter((movie) => {
                    return movie.title.toLowerCase().includes(searchString)
                })
                return filteredPageResults
            } else {
                return response
            }
        },
    })

    const { isLoading2, data: bookmarks, error2 } = useQuery({
        queryKey: [`Bookmarked`],
        queryFn: () => {
            const bookmarks = fetch(backendRootUrl + "api/" + `users/bookmarks/?userEmail=${userEmail}`).then((res) =>
                res.json(),
            )
            return bookmarks
        },
        keepPreviousData: true,
    })

    if (isLoading || isLoading2 || bookmarks == undefined || data == undefined) return 'Loading...'
    if (error || error2) return 'An error has occurred: ' + error.message

    const joinArrays = (arr1, arr2, uniqueKey) => {
        const map = new Map();
        function addItemsToMap(array) {
            for (const item of array) {
                map.set(item[uniqueKey], item);
            }
        }
        addItemsToMap(arr2);
        addItemsToMap(arr1);
        const newArray = Array.from(map.values())
        return newArray
    }

    return (
        <div className='flex flex-col'>
            {(searchString !== null && searchString !== "") ? (
                <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'>{data.length !== 0 ? `Found ${data.length} result${data.length !== 1 ? "s" : ""} for "${searchString}"` : "No results found for \"" + searchString + "\""}</h1>
            ) : <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> {pageTitle}</h1>}
            <MediaList results={joinArrays(bookmarks, data, "id")} />
        </div>
    )
}

MediaContainer.propTypes = {
    pageTitle: PropTypes.string,
}