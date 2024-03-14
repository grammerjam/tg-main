import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useParams } from 'react-router-dom';

export default function VideoPage() {
    const { id } = useParams()
    const [videoId, setVideoId] = useState(null)

    useEffect(() => {
        if (id) {
            setVideoId(id)
        } else {
            setVideoId(null)
        }
    }, [id])
    return (
        <div className='px-[16px] flex flex-col justify-start items-start gap-[16px] tablet:px-[24px]'>
            {videoId && <VideoPlayer videoId={videoId} />}
            <div>
                <h1 className='text-h-sm font-[600]'>
                    {id}
                </h1>
                <ul className='flex gap-[8px] justify-start items-start font-[300]'>
                    <li>{`2007`}</li>
                    <li>{"•"}</li>
                    <li>TV Series</li>
                    <li>{"•"}</li>
                    <li>E</li>
                </ul>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam, ducimus numquam dicta fuga ex inventore molestias quisquam voluptas laborum, iusto sunt recusandae debitis enim. Deserunt reprehenderit ducimus voluptatum dolorum?</p>
            <div className='w-full flex items-center justify-start gap-[8px]'>
                <p className='px-[8px] py-[4px] bg-ma-blue rounded-[10px]'>Nature</p>
                <p className='px-[8px] py-[4px] bg-ma-blue rounded-[10px]'>Meditation</p>
                <p className='px-[8px] py-[4px] bg-ma-blue rounded-[10px]'>Soothing</p>
            </div>
        </div>
    )
}

VideoPage.propTypes = {
    params: PropTypes.object,
}