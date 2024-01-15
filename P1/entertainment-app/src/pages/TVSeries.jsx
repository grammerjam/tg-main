import MediaContainer from "../components/MediaContainer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function TVSeries() {
  return (
    <div className="flex flex-col desktop:flex-row">
      <Navbar />
      <div className="px-[16px] tablet:px-[24px] desktop:pl-[12px] desktop:pr-[36px]">
        <SearchBar />
        <MediaContainer pageTitle={"TV Series"} />
      </div>
    </div>
  )
}
