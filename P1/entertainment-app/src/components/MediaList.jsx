import PropTypes from 'prop-types';
import MediaCard from './MediaCard'


export default function MediaList({ results }) {
    
    return (
        <div className=''>
            {results.map((result) => {
                return (
                    <MediaCard key={result.title} media={result}/>
                )
            })}
        </div>
    )
}

MediaList.propTypes = {
    results: PropTypes.array,
}