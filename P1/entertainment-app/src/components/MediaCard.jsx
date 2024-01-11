import PropTypes from 'prop-types';
import bookmark from '/assets/icon-bookmark-empty.svg'
import bookmarkHover from '/assets/icon-bookmark-empty-hover.svg'
import bookmarkFilled from '/assets/icon-bookmark-full.svg'

export default function MediaCard({ media }) {


  return (
    <div className='mb-[1rem] tablet:mb-[1.5rem] desktop:mb-[2rem] w-[50%] tablet:w-[33.33%] desktop:w-[25%]'>
      <div
        style={{ '--small-img': `url( ${media.thumbnail.regular.small})`, '--medium-img': `url( ${media.thumbnail.regular.medium})`, '--large-img': `url( ${media.thumbnail.regular.large})` }}
        className={`
        w-[10.25rem] h-[6.875rem] bg-[image:var(--small-img)] 
        tablet:w-[13.75rem] tablet:h-[8.75rem] tablet:bg-[image:var(--medium-img)]
        laptop:w-[17.5rem] laptop:h-[10.875rem] laptop:bg-[image:var(--large-img)]
        bg-cover bg-no-repeat rounded-lg mb-[0.5rem] p-[1rem] flex justify-end` 
        }>
        <div className={`w-[2rem] h-[2rem] bg-ma-black hover:bg-ma-white rounded-full opacity-50 hover:opacity-100 hover:fill-ma-black flex justify-center items-center`} 
          onMouseOver={(e) => {e.stopPropagation(); e.target.childNodes[0].src = bookmarkHover }}
          onMouseLeave={(e) => {e.stopPropagation(); e.target.childNodes[0].src = media.isBookmarked ? bookmarkFilled : bookmark;}}>
          <img src={media.isBookmarked ? bookmarkFilled : bookmark} onMouseOver={(e) => e.stopPropagation()} onMouseLeave={ (e) => e.stopPropagation()}  />
        </div>
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