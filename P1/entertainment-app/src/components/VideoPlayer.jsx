import { useRef, useEffect, useState, useCallback } from "react"
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';

export default function VideoPlayer() {
    const { id } = useParams()
    const [videoId, setVideoId] = useState(null)
    const videoRef = useRef(null)
    const [validVideo, setValidVideo] = useState(false)

    const backendRootUrl = import.meta.env.VITE_BACKEND_URL

    const getVideoStatus = useCallback(async () => {
        try {
            let res = await fetch(`${backendRootUrl}videos/${videoId}`)
            // console.log(res.status)
            if (res.status === 404) {
                return false
            } else {
                return true
            }
        } catch (e) {
            console.log(e)
        }
    }, [videoId])

    const checkVideoStatus = useCallback(async () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.removeAttribute('src');
            videoRef.current.load();
        }
        let result = await getVideoStatus(); // Use await here to wait for the promise to resolve
        // console.log(result);
        setValidVideo(result); // This will now correctly set the state based on the boolean value
    }, [getVideoStatus])

    // checkVideoStatus();

    useEffect(() => {
        if (id) {
            setVideoId(id)
        } else {
            setVideoId(null)
        }
        if (videoId) {
            checkVideoStatus();
        }
    }, [id, videoId, checkVideoStatus])


    // useEffect(() => {

    // }, [getVideoStatus])
    return (
        <div className="w-full rounded-[10px]">
            {
                validVideo ?
                    <video ref={videoRef} className="w-full rounded-[10px]" controls autoPlay>
                        <source src={`http://localhost:10000/videos/${videoId}`} type="video/mp4"></source>
                        Your browser does not support the video tag or mp4s
                    </ video>
                    :
                    <p>
                        This is not a valid video
                    </p>
            }
        </div>


    )
}

VideoPlayer.propTypes = {
    videoId: PropTypes.string,
}