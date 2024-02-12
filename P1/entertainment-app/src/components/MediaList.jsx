import PropTypes from 'prop-types';
import MediaCard from './MediaCard'


export default function MediaList({ results }) {
    
    return (
        <div className={`w-full flex flex-wrap justify-between tablet:justify-stretch gap-x-[0.94rem] tablet:gap-x-[1.88rem] desktop:gap-x-[2.5rem]`}>
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