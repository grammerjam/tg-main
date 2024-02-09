import MediaContainer from "../components/MediaContainer";

export default function TVSeries() {
  return (
    <div className="flex flex-col desktop:flex-row">
      <div className="px-[1rem] tablet:px-[1.5rem] w-full">
        <MediaContainer pageTitle={"TV Series"} />
      </div>
    </div>
  )
}
