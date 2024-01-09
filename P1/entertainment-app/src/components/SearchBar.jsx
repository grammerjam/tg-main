import { useState } from "react"
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const SearchBar = ({ handleSearch, noResults, selectedFilter }) =>
{

    SearchBar.propTypes = {
        handleSearch: PropTypes.func.isRequired,
        noResults: PropTypes.bool.isRequired,
        selectedFilter: PropTypes.string.isRequired,
    };

    const [currentSearch, setCurrentSearch] = useState("")

    const navigateTo = useNavigate();

    const handleChange = (e) =>
    {
        const query = e.target.value;
        setCurrentSearch(query)
        handleSearch(query)
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault
        navigateTo(`/${currentSearch}`)

    }

    let placeholderText = "Search for "
    switch (selectedFilter)
    {
        case "Movie":
            placeholderText += "Movies";
            break;
        case "TV Series":
            placeholderText += "TV series";
            break;
        case "Bookmarked":
            placeholderText += "bookmarked shows";
            break;
        default:
            placeholderText += "movies or TV series";
    }

    return (
        <>
            <form className="flex items-center px-4" onSubmit={handleSubmit}>
                <button type="submit" >
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#FFF" onSubmit={handleSubmit} /></svg>
                </button>
                <input
                    type="text"
                    placeholder={placeholderText}
                    onChange={handleChange}
                    className={`outline-none border-b ${currentSearch ? 'border-5A698F' : 'border-transparent'} w-max px-4 py-2 text-lg bg-transparent`}
                />

            </form>
            {noResults && (
                <p>
                    No Results Found.
                </p>
            )}
        </>
    )
}

export default SearchBar