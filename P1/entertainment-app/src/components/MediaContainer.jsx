import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";
import MediaList from './MediaList';
import {
    // QueryClient,
    // QueryClientProvider,
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
    console.log(pageTitle)

    const { isLoading, data, error } = useQuery({
        queryKey: ['media', `${pageTitle}`],
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

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className='flex flex-col'>
            {(searchString !== null && searchString !== "") ? (
                <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'>{data.length !== 0 ? `Found ${data.length} result${data.length !== 1 ? "s" : ""} for "${searchString}"` : "No results found for \"" + searchString + "\""}</h1>
            ) : <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> {pageTitle}</h1>}
            <MediaList results={data} />
        </div>
    )
}

MediaContainer.propTypes = {
    pageTitle: PropTypes.string,
}
// MediaContainerQuery.propTypes = {
//     pageTitle: PropTypes.string,
// }