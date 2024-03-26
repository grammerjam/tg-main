import PropTypes from 'prop-types';

// import VideoPlayer from "../components/VideoPlayer";
import WatchMore from '../components/WatchMore';
import VideoInfo from '../components/VideoInfo';
import { useParams } from 'react-router-dom';
import MockVideoPlayer from '../components/MockVideoPlayer';

export default function VideoPage() {
    const { id } = useParams()

    return (
        <div className=' flex flex-col justify-start items-start gap-[16px] desktop:flex-row w-full desktop:gap-[36px] pb-[16px] tablet:pb-[24px]'>
            <div className='w-full desktop:w-[65%] flex flex-col gap-[8px] desktop:gap-[12px] desktop:pl-[24px] pt-[16px]'>
                {/* <VideoPlayer /> */}
                <MockVideoPlayer />
                <VideoInfo />
            </div>
            <WatchMore videoId={id} />
        </div>
    )
}

VideoPage.propTypes = {
    params: PropTypes.object,
}