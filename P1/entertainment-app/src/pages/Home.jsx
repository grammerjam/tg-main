import { useState, useEffect } from "react";
import data from "../../data.json"
import SearchBar from "../components/SearchBar.jsx"
import Feed from "../components/Feed.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () =>
{
    const [media, setMedia] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("default");

    useEffect(() =>
    {
        setMedia(data)
    }, [])



    const handleNavbarFilter = (category) =>
    {
        const filteredMedia = data.filter((item) =>
            item.category === category
        );
        setMedia(filteredMedia)
        setSelectedFilter(category)
    }

    return (
        <div>
            <Navbar handleFilter={handleNavbarFilter} />
            <SearchBar media={media} setMedia={setMedia} selectedFilter={selectedFilter} />
            <Feed filteredMedia={media} selectedFilter={selectedFilter}> </Feed>
        </div>
    )
}

export default Home