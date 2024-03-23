import MediaContainer from "../components/MediaContainer";
import { Helmet } from 'react-helmet';

export default function TVSeries() {
  return (
    <div className="flex flex-col desktop:flex-row">
      <Helmet>
        <title>TV Series - Entertainment App </title>
        <meta name="description" content="Dive into an endless selection of binge-worthy series, from gripping dramas to hilarious comedies, on the TV Shows section of Entertainment App. Discover your next addiction now." />
      </Helmet>    
        <MediaContainer pageTitle={"TV Series"} />
    </div>
  )
}
