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
            <Navbar />
            <div className="px-[16px] tablet:px-[24px] desktop:pl-[12px] desktop:pr-[36px] w-full">
                <SearchBar filterType={"movies or TV series"} />
                {!searchString && <TrendingContainer />}
                <MediaContainer pageTitle={"Recommended"} />
            </div>
        </div>
    )
}

export default Home