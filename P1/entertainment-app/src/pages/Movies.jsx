import MediaContainer from "../components/MediaContainer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function Movies() {
    return (
        <div className="flex flex-col desktop:flex-row">
            <Navbar />
            <div className="px-[16px] tablet:px-[24px] desktop:pl-[12px] desktop:pr-[36px] w-full">
                <SearchBar filterType={"movies"} />
                <MediaContainer pageTitle={"Movies"} />
            </div>
        </div>
    )
}
