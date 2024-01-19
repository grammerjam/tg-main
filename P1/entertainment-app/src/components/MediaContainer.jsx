import PropTypes from 'prop-types';
import data from '../../data.json'
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MediaList from './MediaList';

export default function MediaContainer({ pageTitle })
{

    let [searchParams] = useSearchParams()
    let [results, setResults] = useState([])
    let [resultsLength, setResultsLength] = useState(0)

    function pageResultCategory(title)
    {
        switch (title)
        {
            case "Movies":
                return "Movie"
            case "TV Series":
                return "TV Series"
            case "Recommended":
                return "Recommended"
            case "Bookmarked":
                return "isBookmarked"
        }
    }

    let searchString = searchParams.get('search')

    useEffect(() =>
    {
        let pageResults = data.filter((results) =>
        {
            if (pageTitle === "Bookmarked")
            {
                return results.isBookmarked === true
            } else if (pageTitle === "Recommended")
            {
                return results
            }
            else
            {
                return results.category === pageResultCategory(pageTitle)
            }
        })
        console.log(pageResults)
        let searchString = searchParams.get('search')

        if (searchString === null)
        {
            setResults(() =>
            {
                return pageResults
            })
        } else
        {
            let searchString = searchParams.get('search')
            searchString = searchString.toLowerCase()
            let filteredMovieResults = pageResults.filter((movie) =>
            {
                return movie.title.toLowerCase().includes(searchString)
            })
            setResults(() =>
            {
                return filteredMovieResults
            })
            setResultsLength(filteredMovieResults.length)
        }
    }, [searchParams, pageTitle, searchString])

    return (
        <div className='flex flex-col'>
            {(searchString !== null && searchString !== "") ? (
                <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'>{resultsLength !== 0 ? `Found ${resultsLength} result${resultsLength !== 1 ? "s" : ""} for "${searchString}"` : "No results found for \"" + searchString + "\""}</h1>
            ) : <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> {pageTitle}</h1>}
            <MediaList results={results} />
        </div>
    )
}

MediaContainer.propTypes = {
    pageTitle: PropTypes.string,
}