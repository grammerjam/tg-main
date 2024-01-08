import PropTypes from 'prop-types';

export default function MediaCard({ media }) {
  console.log(media.thumbnail.regular.small)

  return (
    <div>
      <div
        style={{ '--small-img': `url( ${media.thumbnail.regular.small})`, '--medium-img': `url( ${media.thumbnail.regular.medium})`, '--large-img': `url( ${media.thumbnail.regular.large})` }}
        className={`
    w-[10.25rem] h-[6.875rem] bg-[image:var(--small-img)] 
    tablet:w-[13.75rem] tablet:h-[8.75rem] tablet:bg-[image:var(--medium-img)]
    laptop:w-[17.5rem] laptop:h-[10.875rem] laptop:bg-[image:var(--large-img)]
    bg-cover`
        }>
      </div>
      <div>
        <span> {media.year} </span>
        <span> {media.category} </span>
        <span> {media.rating} </span>
      </div>
      <p1> {media.title} </p1>
    </div>

  )
}

MediaCard.propTypes = {
  media: PropTypes.object,
}