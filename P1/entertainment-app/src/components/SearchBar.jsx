import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useSearchParams, useLocation } from "react-router-dom";

const SearchBar = () => {

    SearchBar.propTypes = {
        filterType: PropTypes.string.isRequired,
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentSearch, setCurrentSearch] = useState(searchParams.get("search") || "");
    const [placeholder, setPlaceholder] = useState("Search for movies or TV series");
    
    const location = useLocation();
    useEffect(() => {  
        switch (location.pathname) {
            case "/":
                setPlaceholder("Search for movies or TV series")
                break;
            case "/movies":
                setPlaceholder("Search for movies")
                break;
            case "/tv-series":
                setPlaceholder("Search for TV series")
                break;
            case "/bookmark":
                setPlaceholder("Search for bookmarked media")
                break;
            default:
                break;
        }

    }, [location])

    const handleChange = (e) => {
        const query = e.target.value;
        // setCurrentSearch(query)
        setSearchParams({ search: query });
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setSearchParams({ search: currentSearch });
    // }


    return (
        <div className="fixed w-full flex items-center desktop:h-[5.5rem] desktop:items-end bg-ma-black h-[4rem] z-10">
            <form className="w-full text-h-med tablet:text-h-lg px-[1rem] flex items-center">
                <div className={`flex items-center desktop:py-[10px] w-full`}>
                    <div className="max-w-[24px] tablet:max-h-[24px]">
                        <img src={"/assets/icon-searchbar-search.svg"} />
                    </div>
                    <input
                        type="text"
                        placeholder={placeholder}
                        onChange={handleChange}
                        spellCheck = "false"
                        className={`outline-none border-b ${currentSearch ? 'border-5A698F w-10/12 tablet:w-6/12' : 'border-transparent'} w-full px-4 py-[2px] text-lg bg-transparent text-[16px] font-[300] tablet:text-[24px] desktop:ml-[8px]`}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchBar