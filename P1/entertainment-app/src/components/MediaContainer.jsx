import PropTypes from 'prop-types';
import data from '../../data.json'
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MediaList from './MediaList';

export default function MediaContainer({ pageTitle }) {

    let [searchParams] = useSearchParams()
    let [results, setResults] = useState([])

    function pageResultCategory(title) {
        switch(title) {
            case "Movies":
                return "Movie"
            case "TV Series":
                return "TV Series"
            case "Recommended":
                return true
        }
    }

    useEffect(() => {
        let pageResults = data.filter((result) => {
            return result.category === pageResultCategory(pageTitle)
        })
        let searchString = searchParams.get('search')
        if (searchString === null) {
            setResults(() => {
                return pageResults
            })
        } else {
            searchString = searchString.toLowerCase()
            let filteredMovieResults = pageResults.filter((movie) => {
                return movie.title.toLowerCase().includes(searchString)
            })
            setResults(() => {
                return filteredMovieResults
            })
        }
    }, [searchParams, pageTitle])

    return (
        <div className='flex flex-col'>
            <h1 className='text-h-sm mb-[1.5rem] desktop:mb-[2rem]'> {pageTitle}</h1>
            <MediaList results={results}/>
        </div>
    )
}

MediaContainer.propTypes = {
    pageTitle: PropTypes.string,
}