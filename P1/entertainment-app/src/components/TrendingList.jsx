import PropTypes from 'prop-types';
import TrendingCard from "./TrendingCard";

const TrendingList = ({ trendingResults }) =>
{

    return (
        <div className='overflow-x-auto' role="list" aria-label="Trending Items">
            <div className='h-full flex tablet:flex-row justify-start gap-x-[15px] tablet:gap-x-[40px]' role="listitem">
                {trendingResults.map((trendingResults) =>
                {
                    return (
                        <TrendingCard key={trendingResults.id} trendingMedia={trendingResults} />
                    )
                })}
            </div>
        </div>
    )
}

TrendingList.propTypes = {
    trendingResults: PropTypes.array
}

export default TrendingList