import PropTypes from 'prop-types';

const WatchMoreCard = ({ trendingMedia }) => {

    return (
        <div className='w-full flex flex-col gap-[4px] tablet:flex-row tablet:gap-[32px] desktop:gap-[16px]'>
            <img className='w-full rounded-[10px] tablet:w-[30%] desktop:min-w-[150px] desktop:w-[50%]' src={trendingMedia.tpathTrending} />
            <div className='w-full flex flex-col gap-[8px] desktop:w-auto desktop:gap-0'>
                <div className='flex gap-[8px] items-baseline tablet:gap-[16px] desktop:flex-col desktop:gap-[4px]'>
                    <p className='text-[20px] font-[600] tablet:text-[24px] tablet:font-[500] desktop:text-[20px]'>{trendingMedia.title}</p>
                    <p className='text-ma-gray'>{trendingMedia.year}</p>
                </div>
                <p className='text-[12px] tablet:text-[16px] text-ma-gray'>{"Rated: " + trendingMedia.rating}</p>
                <div className='flex gap-[8px] desktop:pt-[4px]'>
                    {trendingMedia.genre.map((genre, index) => {
                        return (
                            <div key={index} className='bg-ma-blue rounded-[10px] px-[8px] py-[4px] tablet:px-[16px] tablet:py-[8px] desktop:px-[8px] desktop:py-[4px]'>
                                <p className='tablet:text-[20px] desktop:text-[16px]'>{genre}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

WatchMoreCard.propTypes = {
    trendingMedia: PropTypes.object
}

export default WatchMoreCard