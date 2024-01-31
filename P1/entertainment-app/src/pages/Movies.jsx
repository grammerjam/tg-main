import MediaContainer from "../components/MediaContainer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function Movies() {
    return (
        <div className="flex flex-col desktop:flex-row">
            <div className="sticky top-0 h-16 z-10">
                <Navbar />
            </div>
            <SearchBar filterType={"movies"} />
            <div className="px-[1rem] pt-[4.5rem] tablet:px-[1.5rem] w-full">
                <MediaContainer pageTitle={"Movies"} />
            </div>
        </div>
    )
}
