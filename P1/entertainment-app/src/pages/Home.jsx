import { useSearchParams } from "react-router-dom";
import MediaContainer from "../components/MediaContainer.jsx";
import TrendingContainer from "../components/TrendingContainer.jsx"

const Home = () => {
    let [searchParams] = useSearchParams()
    let searchString = searchParams.get('search')

    return (
        <div className="flex flex-col">
            <div className="pl-[1rem] tablet:pl-[1.5rem] w-full">
                {!searchString && <TrendingContainer />}
            </div>
                <MediaContainer pageTitle={"Recommended"} />
        </div>
    )

}
export default Home