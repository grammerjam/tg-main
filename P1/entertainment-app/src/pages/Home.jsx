import SearchBar from "../components/SearchBar.jsx"
import Navbar from "../components/Navbar.jsx";
import MediaContainer from "../components/MediaContainer.jsx";


const Home = () =>
{

    return (
        <div className="flex flex-col desktop:flex-row">
            <Navbar />
            <div className="px-[16px] tablet:px-[24px] desktop:pl-[12px] desktop:pr-[36px]">
                <SearchBar filterType={"movies or TV series"}  />
                <MediaContainer pageTitle={"Movies"} />
            </div>
        </div>
    )
}

export default Home