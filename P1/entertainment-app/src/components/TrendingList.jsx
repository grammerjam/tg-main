import PropTypes from 'prop-types';
import TrendingCard from "./TrendingCard";

const TrendingList = ({ trendingResults }) =>
{

    return (
        <div className='overflow-x-auto' role="list" aria-label="Trending Items">
            <div className='h-full flex tablet:flex-row justify-start gap-x-[0.94rem] tablet:gap-x-[1.88rem] desktop:gap-x-[2.5rem]' role="listitem">
                {trendingResults.map((trendingResults) =>
                {
                    return (

                        <TrendingCard key={trendingResults.title} trendingResults={trendingResults} />
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