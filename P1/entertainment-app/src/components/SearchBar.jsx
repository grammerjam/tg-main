import { useState } from "react"
import PropTypes from 'prop-types'

const SearchBar = ({ handleSearch, noResults, selectedFilter }) => {

    SearchBar.propTypes = {
        handleSearch: PropTypes.func.isRequired,
        noResults: PropTypes.bool.isRequired,
        selectedFilter: PropTypes.string.isRequired,
    };


    const [currentSearch, setCurrentSearch] = useState("")

    const handleChange = (e) => {
        const query = e.target.value;
        setCurrentSearch(query)
        handleSearch(query)
    }

    let placeholderText = "Search for "
    switch (selectedFilter) {
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
            <div className="tablet:pb-[24px] desktop:py-[28px] desktop:px-0">
                <div className="flex items-center desktop:py-[10px]">
                    <div className="max-w-[24px] tablet:max-h-[24px]">
                        <img src={"/assets/icon-searchbar-search.svg"}/>
                    </div>
                    <input
                        type="text"
                        placeholder={placeholderText}
                        onChange={handleChange}
                        className={`outline-none border-b ${currentSearch ? 'border-5A698F' : 'border-transparent'} w-full px-4 py-2 text-lg bg-transparent text-[16px] font-[300] tablet:text-[24px] desktop:ml-[24px]`}
                    />

                </div>
                {noResults && (
                    <p>
                        No Results Found.
                    </p>
                )}
            </div>
        </>
    )
}

export default SearchBar