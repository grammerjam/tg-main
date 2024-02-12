import PropTypes from 'prop-types';
import MediaCard from './MediaCard'


export default function MediaList({ results }) {
    
    return (
        <div className={`w-full flex flex-wrap justify-between tablet:justify-stretch gap-x-[15px] tablet:gap-x-[30px] desktop:gap-x-[2.5rem]`}>
            {results.map((result) => {
                return (
                    <MediaCard key={result.id} media={result}/>
                )
            })}
        </div>
    )
}

MediaList.propTypes = {
    results: PropTypes.array,
}