import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ filterType }) =>
{

    SearchBar.propTypes = {
        filterType: PropTypes.string.isRequired,
    };

    const [isScrolled, setIsScrolled] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentSearch, setCurrentSearch] = useState(searchParams.get("search") || "");

    const handleChange = (e) =>
    {
        const query = e.target.value;
        setCurrentSearch(query)

    }

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        setSearchParams({ search: currentSearch });
    }

    let placeholderText = `Search for ${filterType}`

    return (
        <>
            <form onSubmit={handleSubmit} className={`pb-[20px] desktop:py-[28px] desktop:px-0 `}>
                <div className={`flex items-center desktop:py-[10px]`}>
                    <div className="max-w-[24px] tablet:max-h-[24px]">
                        <img src={"/assets/icon-searchbar-search.svg"} />
                    </div>
                    <input
                        type="text"
                        placeholder={placeholderText}
                        onChange={handleChange}
                        className={`outline-none border-b ${currentSearch ? 'border-5A698F w-10/12 tablet:w-6/12' : 'border-transparent'} w-full px-4 py-[2px] text-lg bg-transparent text-[16px] font-[300] tablet:text-[24px] desktop:ml-[8px]`}
                    />
                </div>
            </form>
        </>
    )
}

export default SearchBar