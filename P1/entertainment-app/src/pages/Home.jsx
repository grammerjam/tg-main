import { useState, useEffect } from "react";
import data from "../../data.json"
import SearchBar from "../components/SearchBar.jsx"
import Feed from "../components/Feed.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () =>
{
    const [searchQuery, setSearchQuery] = useState('');
    const [media, setMedia] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("default");

    useEffect(() =>
    {
        setMedia(data)
    }, [])

    const handleSearch = (query) =>
    {
        setSearchQuery(query)
        const filteredMedia = data.filter((item) =>
            item.title.toLocaleLowerCase().includes(query.toLowerCase())
        );
        setMedia(filteredMedia)
    }

    const handleNavbarFilter = (category) =>
    {
        const filteredMedia = data.filter((item) =>
            item.category === category
        );
        setMedia(filteredMedia)
        setSelectedFilter(category)
    }

    const filteredMedia = searchQuery ? media.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : media;

    const noResults = media.length === 0 && searchQuery !== "";

    return (
        <div className="flex flex-col lg:flex-row lg:mt-10">
            <div className="lg:w-1/6 flex items-start justify-center">
                <Navbar handleFilter={handleNavbarFilter} className="lg:block sticky top-0" />
            </div>
            <div className="lg:w-3/4 flex flex-col">
                <SearchBar handleSearch={handleSearch} noResults={noResults} selectedFilter={selectedFilter} />
                <Feed filteredMedia={filteredMedia} selectedFilter={selectedFilter}> </Feed>
            </div>
        </div>
    )
}

export default Home