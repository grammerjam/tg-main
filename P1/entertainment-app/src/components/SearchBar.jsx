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
                    <img src="../../assets/icon-search.svg" alt="Search Icon" />

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