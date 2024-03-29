import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { useUser } from "@clerk/clerk-react";

import { joinArrays } from '../Utils';

import MediaList from './MediaList';

const backendRootUrl = import.meta.env.VITE_BACKEND_URL

function getUrlQuery(title, email) {
    switch (title) {
        case "Movies":
            return "media/movies"
        case "TV Series":
            return "media/tv-series"
        case "Bookmarked":
            return `users/bookmarks/?email=${email}`
        default:
            // Home
            return "media"
    }
}
export default function MediaContainer({ pageTitle }) {

    const { user } = useUser();
    let userEmail = user.primaryEmailAddress.emailAddress
    let [searchParams] = useSearchParams()
    let searchString = searchParams.get('search')

    const { isLoading, data, error } = useQuery({
        queryKey: [`${pageTitle}Media`],
        queryFn: () =>
            fetch(backendRootUrl + "api/" + getUrlQuery(pageTitle, userEmail)).then((res) =>
                res.json(),
            ),
        keepPreviousData: true,
    })

    const { isLoading2, data: bookmarks, error2 } = useQuery({
        queryKey: [`Bookmarked`],
        queryFn: () => {
            const bookmarks = fetch(backendRootUrl + "api/" + `users/bookmarks/?email=${userEmail}`)
            .then((res) =>
                res.json(),
            )
            return bookmarks
        },
        keepPreviousData: true,
    })

    if (isLoading || isLoading2 || bookmarks == undefined || data == undefined) {

        const emptyCardNumber = 20
        const emptyCardArray = []
        for (let i = 0; i < emptyCardNumber; i++) {
            const newEmptyCardObject = {
                id: i,
                year: "YYYY",
                category: "Movie",
                title: "Loading",
                rating: "PG",
                tpath: "/assets/grayBox.jpg"
            }
            emptyCardArray.push(newEmptyCardObject)
        }
        return (
            <div className='flex flex-col px-[1rem] tablet:px-[1.5rem] w-full desktop:pr-[36px]' role="region" aria-label="Media Container" tabIndex="0">
                {(searchString !== null && searchString !== "" && !isLoading && !isLoading2) ? (
                    <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]' aria-live="assertive">{data.length !== 0 ? `Found ${data.length} result${data.length !== 1 ? "s" : ""} for "${searchString}"` : "No results found for \"" + searchString + "\""}</h1>
                ) : <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]' aria-live="polite"> {pageTitle}</h1>}
                <MediaList results={emptyCardArray} loading={true} />
            </div>
        )
    }
    if (error || error2) return 'An error has occurred: ' + error.message

    const allData = joinArrays(bookmarks, data, "id")
    
    function filterData(data) {
        if (searchString) {
            searchString = searchString.toLowerCase()
            let filteredPageResults = data.filter((movie) => {
                return movie.title.toLowerCase().includes(searchString)
            })
            return filteredPageResults
        }
    }

    return (
        <div className='flex flex-col px-[1rem] tablet:px-[1.5rem] w-full desktop:pr-[36px]'>
            {(searchString !== null && searchString !== "") ? (
                <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'>{filterData(allData).length !== 0 ? `Found ${filterData(allData).length} result${filterData(allData).length !== 1 ? "s" : ""} for "${searchString}"` : "No results found for \"" + searchString + "\""}</h1>
            ) : <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> {pageTitle}</h1>}
            <MediaList results={searchString ? filterData(allData) : allData} />
        </div>
    )
}

MediaContainer.propTypes = {
    pageTitle: PropTypes.string,
}