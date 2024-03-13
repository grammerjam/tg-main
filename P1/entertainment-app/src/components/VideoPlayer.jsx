import { useRef, useEffect, useState, useCallback } from "react"
import PropTypes from 'prop-types'

export default function VideoPlayer({ videoId }) {
    const videoRef = useRef(null)
    const [validVideo, setValidVideo] = useState(false)
    const getVideoStatus = useCallback(async () => {
        try {
            let res = await fetch(`http://localhost:10000/videos/${videoId}`)
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

    useEffect(() => {
        const checkVideoStatus = async () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
            let result = await getVideoStatus(); // Use await here to wait for the promise to resolve
            // console.log(result);
            setValidVideo(result); // This will now correctly set the state based on the boolean value
        };

        checkVideoStatus();
    }, [getVideoStatus])
    return (
        <div>
            {
                validVideo ?
                    <video ref={videoRef} width={320} height={240} controls autoPlay>
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