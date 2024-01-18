import PropTypes from 'prop-types';
import TrendingCard from "./TrendingCard";

const TrendingList = ({ trendingResults }) =>
{

    return (
        <div className='w-full h-full flex tablet:flex-row justify-start gap-x-[0.94rem] tablet:gap-x-[1.88rem] desktop:gap-x-[0.5rem] overflow-x-auto'>
            {trendingResults.map((trendingResults) =>
            {
                return (

                    <TrendingCard key={trendingResults.title} trendingResults={trendingResults} />
                )
            })}
        </div>
    )
}

TrendingList.propTypes = {
    trendingResults: PropTypes.array
}

export default TrendingList