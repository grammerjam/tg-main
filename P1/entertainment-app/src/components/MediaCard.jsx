import PropTypes from 'prop-types';
import bookmark from '/assets/icon-bookmark-empty.svg'
import bookmarkHover from '/assets/icon-bookmark-empty-hover.svg'
import bookmarkFilled from '/assets/icon-bookmark-full.svg'

export default function MediaCard({ media }) {
  
  return (
    <div className='mb-[1rem] tablet:mb-[1.5rem] desktop:mb-[2rem] w-[40%] tablet:w-[30%] desktop:w-[20%]'>
      <div className='w-full flex relative justify-end mb-[0.5rem]'>
        <div className={`absolute mr-[0.5rem] mt-[0.5rem] tablet:mr-[1rem] tablet:mt-[1rem] w-[2rem] h-[2rem] bg-ma-black hover:bg-ma-white rounded-full opacity-50 hover:opacity-100 hover:fill-ma-black flex justify-center items-center`} 
            onMouseEnter={(e) => {e.stopPropagation(); e.target.childNodes[0].src = bookmarkHover }}
            onMouseLeave={(e) => {e.stopPropagation(); e.target.childNodes[0].src = media.isBookmarked ? bookmarkFilled : bookmark;}}>
            <img src={media.isBookmarked ? bookmarkFilled : bookmark} onMouseEnter={(e) => e.stopPropagation()} onMouseLeave={ (e) => e.stopPropagation()}  />
        </div>
        <img className='w-full rounded-lg' src={media.thumbnail.regular.large}></img>
      </div>
      <div className='flex items-center text-ma-gray text-b-sm mb-[0.25rem] tablet:mb-[0.30]'>
        <p> {media.year} </p>
        <p className='mx-[0.5rem]'> {"•"} </p>
        <img src='../../public/assets/icon-nav-movies.svg' className='h-[0.75rem] w-[0.75rem] mr-[0.4rem]'></img>
        <p> {media.category} </p>
        <p className='mx-[0.5rem]'> {"•"} </p>
        <p> {media.rating} </p>
      </div>
      <p> {media.title} </p>
    </div>

  )
}

MediaCard.propTypes = {
  media: PropTypes.object,
}