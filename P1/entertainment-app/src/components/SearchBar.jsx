import { useState } from "react"
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const SearchBar = ({ setMedia, selectedFilter, media }) =>
{

    SearchBar.propTypes = {
        setMedia: PropTypes.func.isRequired,
        selectedFilter: PropTypes.string.isRequired,
        media: PropTypes.array.isRequired,

    };

    const [currentSearch, setCurrentSearch] = useState("")
    const [resultsCount, setResultsCount] = useState(0);

    const navigateTo = useNavigate();


    const handleSearch = (e) =>
    {
        const query = e.target.value;
        setCurrentSearch(query)

        const filteredMedia = media.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        setMedia(filteredMedia);
        setResultsCount(filteredMedia.length);
        return filteredMedia;
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault
        const filteredMedia = handleSearch(currentSearch);

        if (filteredMedia.length === 0 && currentSearch !== "")
        {
            navigateTo(`/no-results-for-${encodeURIComponent(currentSearch)}`)
        } else if (currentSearch)
        {
            navigateTo(`/${currentSearch}`)
        }
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
            <form className="flex items-center px-4 mt-4 mb-4 tablet:tablet:mb-0" onSubmit={handleSubmit}>
                <button type="submit" >
                    <img src="../../assets/icon-search.svg" alt="Search Icon" className="w-6 h-6 tablet:w-8 tablet:h-8 desktop:w-8 desktop:h-8" />

                </button>
                <input
                    type="text"
                    placeholder={placeholderText}
                    onChange={(e) => handleSearch(e)}
                    className={`outline-none border-b ${currentSearch ? 'border-5A698F' : 'border-transparent'} w-max px-4 py-2 text-h-sm tablet:text-h-sm desktop:text-h-sm bg-transparent font-light`}
                />
                {resultsCount > 0 && (
                    <p>Found {resultsCount} Result{resultsCount !== 1 ? 's' : ''} for &quot;{currentSearch}&quot;.</p>
                )}
            </form>

            {resultsCount === 0 && currentSearch !== "" && (
                <p>
                    No Results Found.
                </p>
            )}

        </>
    )
}

export default SearchBar