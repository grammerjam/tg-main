import MediaContainer from "../components/MediaContainer";
import { Helmet } from 'react-helmet';

export default function Bookmarks() {
  return (
    <div className="flex flex-col desktop:flex-row">
      <Helmet>
        <title>Bookmarked Movies and TV Series - Entertainment App</title>
        <meta name="description" content="Keep track of your favorite movies and TV shows with ease using the Bookmark section of Entertainment App. Never lose sight of what you love to watch."/>
      </Helmet>
        <MediaContainer pageTitle={"Bookmarked"} />
    </div>
  )
}
