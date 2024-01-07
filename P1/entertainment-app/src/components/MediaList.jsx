import PropTypes from 'prop-types';
// import { useEffect } from 'react';
import MediaCard from './MediaCard'
// import picture from '../../assets/thumbnails'

export default function MediaList({ results }) {
    
    return (
        <div className=''>
            {results.map((result) => {
                return (
                    <MediaCard key={result.title} result={result}/>
                )
            })}
        </div>
    )
}

MediaList.propTypes = {
    results: PropTypes.array,
}