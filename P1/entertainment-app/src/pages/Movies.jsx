import MediaContainer from "../components/MediaContainer";
import { Helmet } from 'react-helmet';

export default function Movies() {
    return (
        <div className="flex flex-col desktop:flex-row w-full">      
            <Helmet>
                <title>Movies - Entertainment App </title>
                <meta name="description" content="Explore a vast collection of blockbuster hits, timeless classics, and indie gems in the Movies section of Entertainment App. Find your next movie night favorite today." />
            </Helmet>    
                <MediaContainer pageTitle={"Movies"} />
        </div>
    )
}
