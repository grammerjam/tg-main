import MediaContainer from "../components/MediaContainer";

export default function Movies() {
    return (
        <div className="flex flex-col desktop:flex-row w-full">      
                <MediaContainer pageTitle={"Movies"} />
        </div>
    )
}
