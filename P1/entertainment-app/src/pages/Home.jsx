import { useState, useEffect } from "react";
import data from "../../data.json"
import SearchBar from "../components/SearchBar.jsx"
import Feed from "../components/Feed.jsx";
import Navbar from "../components/Navbar.jsx";

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
        const filteredMedia = data.filter((item) =>
            item.title.toLocaleLowerCase().includes(query.toLowerCase())
        );
        setMedia(filteredMedia)
    }


    const filteredMedia = searchQuery ? media.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : media;

    const noResults = media.length === 0 && searchQuery !== "";

    return (
        <div className="flex flex-col desktop:flex-row desktop:mt-10">
            <div className="desktop:w-1/6 flex items-start justify-center">
                <Navbar className="desktop:block sticky top-0" />
            </div>
            <div className="desktop:w-3/4 flex flex-col">
                <SearchBar handleSearch={handleSearch} noResults={noResults} />
                <Feed filteredMedia={filteredMedia}> </Feed>
            </div>
        </div>
    )
}

export default Home