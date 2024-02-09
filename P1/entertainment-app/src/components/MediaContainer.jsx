import PropTypes from 'prop-types';
// import data from '../../data.json'
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MediaList from './MediaList';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

const msToMinute = 60000

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: msToMinute * 30 } }
})

export default function MediaContainer({ pageTitle }) {
    return (
        <QueryClientProvider client={queryClient}>
            <MediaContainerQuery pageTitle={pageTitle} />
        </QueryClientProvider>
    )
}
const backendRootUrl = import.meta.env.VITE_BACKEND_URL

function getUrlQuery(title) {
    switch (title) {
        case "Movies":
            return "media/movies"
        case "TV Series":
            return "media/tv-series"
        case "Recommended":
            return "media"
        case "Bookmarked":
            return "isBookmarked"
    }
}

function MediaContainerQuery({ pageTitle }) {
    let [searchParams] = useSearchParams()
    let [results, setResults] = useState([])
    let [resultsLength, setResultsLength] = useState(0)
    //caching isn't implemented on the query key atm
    const { isLoading, data, error } = useQuery({
        queryKey: ['media', `${pageTitle}`],
        queryFn: () =>
            fetch(backendRootUrl + "api/" + getUrlQuery(pageTitle)).then((res) =>
                res.json(),
            ),
        keepPreviousData: true
    })



    let searchString = searchParams.get('search')
    if (searchString) {
        console.log(searchString)
        searchString = searchString.toLowerCase()
        let filteredPageResults = data.filter((movie) => {
            return movie.title.toLowerCase().includes(searchString)
        })
        setResults(() => {
            return filteredPageResults
        })
        setResultsLength(filteredPageResults.length)
    }

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className='flex flex-col'>
            {(searchString !== null && searchString !== "") ? (
                <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'>{resultsLength !== 0 ? `Found ${resultsLength} result${resultsLength !== 1 ? "s" : ""} for "${searchString}"` : "No results found for \"" + searchString + "\""}</h1>
            ) : <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> {pageTitle}</h1>}
            <MediaList results={data} />
        </div>
    )
}

MediaContainer.propTypes = {
    pageTitle: PropTypes.string,
}
MediaContainerQuery.propTypes = {
    pageTitle: PropTypes.string,
}