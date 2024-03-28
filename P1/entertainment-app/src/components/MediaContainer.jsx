import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { useUser } from "@clerk/clerk-react";
import { useBookmarks } from '../hooks/useBookmarks';

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
    const { bmLoading, bookmarks } = useBookmarks();

    let userEmail = user.primaryEmailAddress.emailAddress
    let [searchParams] = useSearchParams()
    let searchString = searchParams.get('search')

    function filterData(data) {
        if (searchString) {
            searchString = searchString.toLowerCase()
            let filteredPageResults = data.filter((movie) => {
                return movie.title.toLowerCase().includes(searchString)
            })
            return filteredPageResults
        }
    }

    function searchTitle(media) {
        return filterData(media).length !== 0 ?
            `Found ${filterData(media).length} result${filterData(media).length !== 1 ? "s" : ""} for "${searchString}"` :
            "No results found for \"" + searchString + "\""
    }


    const { isLoading, data: media, error } = useQuery({
        queryKey: [`${pageTitle}Media`],
        queryFn: () =>
            fetch(backendRootUrl + "api/" + getUrlQuery(pageTitle, userEmail)).then((res) =>
                res.json(),
            ),
        keepPreviousData: true,
    })

    
    if (isLoading || bmLoading || media === undefined || bookmarks === undefined) {

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
            <div className='flex flex-col px-[1rem] tablet:pl-[1.5rem] w-full desktop:pr-[36px]'>
                {(searchString !== null && searchString !== "" && !isLoading) ? (
                    <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'>{searchTitle(media)}</h1>
                ) : <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> {pageTitle}</h1>}
                <MediaList results={emptyCardArray} loading={true} />
            </div>
        )
    }

    if (error) return 'An error has occurred: ' + error.message

    const allMedia = joinArrays( bookmarks, media, "id");

    return (
        <div className='flex flex-col px-[1rem] tablet:pl-[1.5rem] w-full desktop:pr-[36px]'>
            {(searchString !== null && searchString !== "") ? (
                <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'>{searchTitle(allMedia)}</h1>
            ) : <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> {pageTitle}</h1>}
            <MediaList results={searchString ? filterData(allMedia) : allMedia} />
        </div>
    )
}

MediaContainer.propTypes = {
    pageTitle: PropTypes.string,
}