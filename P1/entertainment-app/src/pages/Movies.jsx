import MediaContainer from "../components/MediaContainer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function Movies() {
    return (
        <div className="flex flex-col desktop:flex-row">
            <div className="sticky top-0 h-16 z-10">
                <Navbar />
            </div>
            <div className="px-[1rem] tablet:px-[1.5rem] w-full">
                <div className="sticky top-16 tablet:top-24 desktop:top-0 z-10 mb-[1.5rem] tablet:mb-[3rem]">
                    <SearchBar filterType={"movies"} />
                </div>
                <MediaContainer pageTitle={"Movies"} />
            </div>
        </div>
    )
}
