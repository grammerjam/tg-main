import PropTypes from 'prop-types';

export default function MediaCard({ result }) {
  function changeThumbnailUrl(string) {
    let newUrl = '../../' + string
    return newUrl
  }
  
  return (
    <div className=''>
      <img src={changeThumbnailUrl(result.thumbnail.regular.small)} alt={result.title} />
      <p>{result.title}</p>
      <p>{result.year}</p>
      <p>{result.category}</p>
      <p>{result.rating}</p>
    </div>
  )
}

MediaCard.propTypes = {
  result: PropTypes.object,
}