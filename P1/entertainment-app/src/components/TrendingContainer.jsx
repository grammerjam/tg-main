import data from "../../dataOld.json"
import { useEffect, useState } from "react";
import TrendingList from "./TrendingList";

const TrendingContainer = () =>
{
    const [trendingResults, setTrendingResults] = useState([]);

    useEffect(() =>
    {
        const trendingItems = data.filter(item => item.isTrending === true);
        setTrendingResults(trendingItems);
    }, [])

    return (
        <div className='flex flex-col' role="region" aria-label="Trending Feed" tabIndex="0">
            <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]' role="heading" aria-level="2"> Trending </h1>
            <TrendingList trendingResults={trendingResults} />
        </div>)
}

export default TrendingContainer