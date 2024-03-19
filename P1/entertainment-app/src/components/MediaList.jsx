import PropTypes from 'prop-types';
import MediaCard from './MediaCard'


export default function MediaList({ results, loading }) {
    
    return (
        <div className={`w-full flex flex-wrap justify-between tablet:justify-stretch gap-x-[15px] tablet:gap-x-[30px] desktop:gap-x-[2.5rem]`} role="list" aria-label="Media List">
            {results.map((result) => {
                return (
                    <MediaCard key={result.id} media={result} loading={loading}/>
                )
            })}
        </div>
    )
}

MediaList.propTypes = {
    results: PropTypes.array,
    loading: PropTypes.bool,
}