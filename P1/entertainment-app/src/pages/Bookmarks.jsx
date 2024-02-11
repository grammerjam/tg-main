import MediaContainer from "../components/MediaContainer";
export default function Bookmarks() {
  return (
    <div className="flex flex-col desktop:flex-row">
      <div className="pl-[1rem] tablet:pl-[1.5rem] w-full">
        <MediaContainer pageTitle={"Bookmarked"} />
      </div>
    </div>
  )
}
