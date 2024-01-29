import MediaContainer from "../components/MediaContainer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function TVSeries() {
  return (
    <div className="flex flex-col desktop:flex-row">
      <div className="sticky top-0 h-16 z-10">
        <Navbar />
      </div>
      <div className="px-[16px] tablet:px-[24px] desktop:pl-[12px] desktop:pr-[36px] w-full">
        <div className="sticky top-20 tablet:top-32 desktop:top-0 tablet:mb-16 desktop:mb-0 desk z-20">
          <SearchBar filterType={"TV series"} />
        </div>
        <MediaContainer pageTitle={"TV Series"} />
      </div>
    </div>
  )
}
