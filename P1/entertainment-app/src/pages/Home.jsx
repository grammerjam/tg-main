import { useSearchParams } from "react-router-dom";
import MediaContainer from "../components/MediaContainer.jsx";
import TrendingContainer from "../components/TrendingContainer.jsx"
import { Helmet } from 'react-helmet';

const Home = () => {
    let [searchParams] = useSearchParams()
    let searchString = searchParams.get('search')

    return (
        <div className="flex flex-col">
            <Helmet>
                <title>Home - Entertainment App</title>
                <meta name="description" content="Stream endless entertainment with thousands of hit movies, TV series, documentaries, and exclusive originals all in one place. Discover your next favorite story on our entertainment platform today." />
            </Helmet>
            <div className="pl-[1rem] tablet:pl-[1.5rem] w-full">
                {!searchString && <TrendingContainer />}
            </div>
                <MediaContainer pageTitle={"Recommended"} />
        </div>
    )

}
export default Home