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

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MediaContainer />
        </QueryClientProvider>
    )
}
const backendRootUrl = import.meta.env.VITE_BACKEND_URL

function MediaContainer({ pageTitle }) {


    let [searchParams] = useSearchParams()
    // let [results, setResults] = useState([])
    let [resultsLength, setResultsLength] = useState(0)
    const { isLoading, data, error } = useQuery({
        queryKey: ['media'],
        queryFn: () =>
            fetch(backendRootUrl + "api/media").then((res) =>
                res.json(),
            ),
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(pageTitle)
    let searchString = searchParams.get('search')

    // function pageResultCategory(title) {
    //     switch (title) {
    //         case "Movies":
    //             return "Movie"
    //         case "TV Series":
    //             return "TV Series"
    //         case "Recommended":
    //             return "Recommended"
    //         case "Bookmarked":
    //             return "isBookmarked"
    //     }
    // }




    // let pageResults = data.filter((results) => {
    //     if (pageTitle === "Bookmarked") {
    //         return results.isBookmarked === true
    //     } else if (pageTitle === "Recommended") {
    //         return results
    //     } else {
    //         return results.category === pageResultCategory(pageTitle)
    //     }
    // })

    // if (searchString === null) {
    //     setResults(() => {
    //         return pageResults
    //     })
    // } else {
    //     let searchString = searchParams.get('search')
    //     searchString = searchString.toLowerCase()
    //     let filteredMovieResults = pageResults.filter((movie) => {
    //         return movie.title.toLowerCase().includes(searchString)
    //     })
    //     setResults(() => {
    //         return filteredMovieResults
    //     })
    //     setResultsLength(filteredMovieResults.length)
    // }

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