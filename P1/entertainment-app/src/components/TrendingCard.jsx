import PropTypes from 'prop-types';
import bookmark from '/assets/icon-bookmark-empty.svg'
import bookmarkHover from '/assets/icon-bookmark-empty-hover.svg'
import bookmarkFilled from '/assets/icon-bookmark-full.svg'

const TrendingCard = ({ trendingResults }) => {
    return (
        <div className={`mb-[1rem] tablet:mb-[1.5rem] desktop:mb-[2rem] min-w-fit relative flex justify-end`}>
                <div className={`absolute top-[1rem] right-[1rem] tablet:top-[1.3rem] tablet:right-[1.5rem] w-[2rem] h-[2rem] bg-ma-black hover:bg-ma-white rounded-full opacity-50 hover:opacity-100 hover:fill-ma-black flex justify-center items-center`}
                    onMouseEnter={(e) => { e.stopPropagation(); e.target.childNodes[0].src = bookmarkHover }}
                    onMouseLeave={(e) => { e.stopPropagation(); e.target.childNodes[0].src = trendingResults.isBookmarked ? bookmarkFilled : bookmark; }}>
                    <img src={trendingResults.isBookmarked ? bookmarkFilled : bookmark} onMouseEnter={(e) => e.stopPropagation()} onMouseLeave={(e) => e.stopPropagation()} />
                </div>

                <div className='absolute bottom-0 left-0 right-0 p-5'>
                    <div className='flex items-center text-ma-white text-b-sm tablet:text-b-med mb-[0.25rem] tablet:mb-[0.30]'>
                        <p> {trendingResults.year} </p>
                        <p className='mx-[0.5rem]'> {"•"} </p>
                        <img src={`${trendingResults.category === 'Movie' ? '/assets/icon-category-movie.svg' : '/assets/icon-category-tv.svg'
                            }`} alt={trendingResults.category} className='h-[0.75rem] w-[0.75rem] mr-[0.4rem]'></img>
                        <p> {trendingResults.category} </p>
                        <p className='mx-[0.5rem]'> {"•"} </p>
                        <p> {trendingResults.rating} </p>
                    </div>
                    <p className="font-light text-h-sm tablet:text-h-med"> {trendingResults.title} </p>
                </div>

                <img className='
                min-w-[320px] 
                w-[60vw] tablet:w-[50vw] desktop:w-[30vw]
                max-w-[480px] tablet:max-w-[720px] desktop:max-w-[1080px]
                object-cover aspect-[2/1] rounded-lg
                ' 
                src={trendingResults.thumbnail.regular.large} />
        </div>
    )
}

TrendingCard.propTypes = {
    trendingResults: PropTypes.object
}

export default TrendingCard