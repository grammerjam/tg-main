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
        <div>
            VideoPage
            {videoId && <VideoPlayer videoId={videoId} />}
        </div>
    )
}

VideoPage.propTypes = {
    params: PropTypes.object,
}