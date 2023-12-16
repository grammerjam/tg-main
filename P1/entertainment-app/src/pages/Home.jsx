import React, { useState, useEffect } from "react";
import data from "../../data.json"
import SearchBar from "../components/SearchBar"

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

    return (
        <div>
            <SearchBar handleSearch={handleSearch} noResults={noResults} />
            {media.map((movie, index) => (
                <div key={index}>
                    <h2>{movie.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default Home