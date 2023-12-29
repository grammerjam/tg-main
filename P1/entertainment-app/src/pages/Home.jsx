import { useState, useEffect } from "react";
import data from "../../data.json"
import SearchBar from "../components/SearchBar"
import Feed from "../components/Feed";
import LoginModal from "../components/LoginModal";

const Home = () =>
{
    const [searchQuery, setSearchQuery] = useState('');
    const [media, setMedia] = useState([])

    useEffect(() =>
    {
        setMedia(data)
    }, [])

    const handleSearch = (query) =>
    {
        setSearchQuery(query)
        const filteredMedia = data.filter((media) =>
            media.title.toLocaleLowerCase().includes(query.toLowerCase())
        );
        setMedia(filteredMedia)
    }

    const noResults = media.length === 0 && searchQuery !== "";
    const trendingItems = data.filter((item) => item.isTrending)

    return (
        <div>
            <SearchBar handleSearch={handleSearch} noResults={noResults} />
            <Feed selectedFilter={noResults ? null : "Filtered"} trendingItems={trendingItems}> </Feed> 
            <LoginModal />
        </div>
    )
}

export default Home