import PropTypes from 'prop-types';

export default function MediaCard({ media }) {
  console.log(media.thumbnail.regular.small)

  return (
    <div className='mb-[1.5rem]'>
      <div
        style={{ '--small-img': `url( ${media.thumbnail.regular.small})`, '--medium-img': `url( ${media.thumbnail.regular.medium})`, '--large-img': `url( ${media.thumbnail.regular.large})` }}
        className={`
    w-[10.25rem] h-[6.875rem] bg-[image:var(--small-img)] 
    tablet:w-[13.75rem] tablet:h-[8.75rem] tablet:bg-[image:var(--medium-img)]
    laptop:w-[17.5rem] laptop:h-[10.875rem] laptop:bg-[image:var(--large-img)]
    bg-cover`
        }>
      </div>
      <div className='flex items-center text-ma-gray text-b-sm mb-[0.3rem]'>
        <p> {media.year} </p>
        <p className='mx-[0.5rem]'> {"•"} </p>
        <img src='../../public/assets/icon-nav-movies.svg' className='h-[0.75rem] w-[0.75rem] mr-[0.4rem]'></img>
        <p> {media.category} </p>
        <p className='mx-[0.5rem]'> {"•"} </p>
        <p> {media.rating} </p>
      </div>
      <p1> {media.title} </p1>
    </div>

  )
}

MediaCard.propTypes = {
  media: PropTypes.object,
}