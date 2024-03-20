import PropTypes from 'prop-types';

const WatchMoreCard = ({ trendingMedia }) => {

    return (
        <div className='w-full flex flex-col gap-[4px] tablet:flex-row tablet:gap-[32px]'>
            <img className='w-full rounded-[10px] tablet:w-[30%]' src={trendingMedia.tpathTrending} />
            <div className='w-full flex flex-col gap-[8px]'>
                <div className='flex gap-[8px] items-baseline tablet:gap-[16px]'>
                    <p className='text-[20px] font-[600] tablet:text-[24px] tablet:font-[500]'>{trendingMedia.title}</p>
                    <p>{trendingMedia.year}</p>
                </div>
                <p className='text-[12px] tablet:text-[16px]'>{"Rated: " + trendingMedia.rating}</p>
                <div className='flex gap-[8px]'>
                    {trendingMedia.genre.map((genre, index) => {
                        return (
                            <div key={index} className='bg-ma-blue rounded-[10px] px-[8px] py-[4px] tablet:px-[16px] tablet:py-[8px]'>
                                <p className='tablet:text-[20px]'>{genre}</p>
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