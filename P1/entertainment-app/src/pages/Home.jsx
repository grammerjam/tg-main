import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import Navbar from "../components/Navbar.jsx";
import MediaContainer from "../components/MediaContainer.jsx";
import TrendingContainer from "../components/TrendingContainer.jsx"

const Home = () =>
{
    let [searchParams] = useSearchParams()
    let searchString = searchParams.get('search')

    return (
        <div className="flex flex-col desktop:flex-row">
            <div className="sticky top-0 h-16 z-10">
                <Navbar />
            </div>
            <SearchBar filterType={"movies or TV series"} />
            <div className="px-[1rem] pt-[4.5rem] tablet:px-[1.5rem] w-full">
                {!searchString && <TrendingContainer />}
                <MediaContainer pageTitle={"Recommended"} />
            </div>
        </div>
    )
}

export default Home