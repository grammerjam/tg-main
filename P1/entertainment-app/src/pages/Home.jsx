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
            <div className="px-[16px] tablet:px-[24px] desktop:pl-[12px] desktop:pr-[36px] w-full">
                <div className="fixed top-20 tablet:top-32 desktop:top-0 tablet:mb-16 desktop:mb-0 w-full">
                    <SearchBar filterType={"movies or TV series"} />
                </div>
                {!searchString && <TrendingContainer />}
                <MediaContainer pageTitle={"Recommended"} />
            </div>
        </div>
    )
}

export default Home