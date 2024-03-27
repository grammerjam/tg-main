import { useCallback, useEffect, useRef, useState } from "react"
import Overlay from "./VideoPage/Overlay"

export default function MockVideoPlayer() {
    const videoRef = useRef(null)
    const timelineContainerRef = useRef(null)
    const videoContainerRef = useRef(null)
    const [hover, setHover] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(100)
    const [show, setShow] = useState(false)
    const [playerMode, setPlayerMode] = useState("window")
    const [volumeHover, setVolumeHover] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [totalTime, setTotalTime] = useState(0)
    const [videoSpeed, setVideoSpeed] = useState(1)
    const [isScrubbing, setIsScrubbing] = useState(false)

    const toggleScrubbing = useCallback(function (e) {
        e.preventDefault();
        const timelineContainer = timelineContainerRef.current;
        const videoContainer = videoContainerRef.current;
        const video = videoRef.current;
        if (!timelineContainer || !videoContainer || !video) return

        const rect = timelineContainer.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
        let scrubbing = (e.buttons & 1) === 1;
        if (scrubbing) {
            setIsScrubbing(true);
            video.pause();
            setPlaying(false);
        } else {
            setIsScrubbing(false);
            video.currentTime = percent * video.duration;
            if (!playing) {
                video.play();
            }
            setPlaying(true);
        }
    }, [playing]);

    useEffect(() => {
        setShow(true)
        const timer = setTimeout(() => {
            setShow(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [playing])

    useEffect(() => {
        const timelineContainer = timelineContainerRef.current

        const handleTimelineUpdate = (e) => {
            e.preventDefault()
            const rect = timelineContainer.getBoundingClientRect()
            const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
            timelineContainer.style.setProperty("--preview-position", percent)

            if (isScrubbing) {
                e.preventDefault()
                timelineContainer.style.setProperty("--progress-position", percent)
            }
        }

        timelineContainer.addEventListener("mousemove", handleTimelineUpdate)
        timelineContainer.addEventListener("mousedown", toggleScrubbing)
        timelineContainer.addEventListener("mouseup", toggleScrubbing)

        return () => {
            timelineContainer.removeEventListener('mousemove', handleTimelineUpdate)
            timelineContainer.removeEventListener("mousedown", toggleScrubbing)
        }
    }, [isScrubbing, toggleScrubbing])

    useEffect(() => {
        const video = videoRef.current
        const timelineContainer = timelineContainerRef.current
        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            const percent = video.currentTime / video.duration
            timelineContainer.style.setProperty("--progress-position", percent)
        };

        const handleMetadataLoaded = () => {
            setTotalTime(video.duration)

            const aspectRatio = video.videoWidth / video.videoHeight
            const targetAspectRatio = 16 / 9

            if (aspectRatio !== targetAspectRatio) {
                if (aspectRatio < targetAspectRatio) {
                    video.style.maxWidth = `${video.offsetHeight * aspectRatio}px`
                    video.style.width = 'auto'
                    video.style.height = '100%'
                } else {
                    video.style.height = `${video.offsetWidth / aspectRatio}px`
                    video.style.width = '100%'
                    video.style.height = 'auto'
                }
            }
        }

        video.addEventListener('loadedmetadata', handleMetadataLoaded)
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleMetadataLoaded)
        }
    }, [playerMode])

    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })

    function formatTime(time) {
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60) % 60
        const hours = Math.floor(time / 3600)
        if (hours === 0) {
            return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${leadingZeroFormatter.format(
                minutes
            )}:${leadingZeroFormatter.format(seconds)}`
        }
    }

    // const toggleTheaterMode = (e) => {
    //     e.preventDefault()
    //     setPlayerMode("theater")
    // }

    const toggleFullScreenMode = (e) => {
        e.preventDefault()
        const videoContainer = videoContainerRef.current

        if (playerMode !== "fullScreen") {
            setPlayerMode("fullScreen")
            videoContainer.requestFullscreen()
        } else {
            setPlayerMode("window")
            document.exitFullscreen()
        }
    }

    const toggleMiniPlayerMode = async (e) => {
        e.preventDefault();
        const video = videoRef.current

        if (playerMode !== "miniPlayer") {
            setPlayerMode("miniPlayer")
            try {
                await video.requestPictureInPicture()
            } catch (error) {
                console.error("Error entering Picture-in-Picture mode:", error)
            }
        } else {
            setPlayerMode("window")
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture()
                }
            } catch (error) {
                console.error("Error exiting Picture-in-Picture mode:", error)
            }
        }
    };

    const handleHoverVideo = () => {
        setHover(true)
    }

    const handleHoverLeaveVideo = () => {
        setHover(false)
    }

    const togglePlayPause = (e) => {
        e.preventDefault()
        if (playing) {
            videoRef.current.pause()
            setPlaying(false)
        } else {
            videoRef.current.play()
            setPlaying(true)
        }
    }

    const handleVolumeSlider = (e) => {
        e.preventDefault()
        const video = videoRef.current
        let targetVolume = e.target.value
        if (targetVolume === 0) {
            video.muted = true
        } else {
            video.muted = false
            let refactoredVolume = targetVolume / 100
            video.volume = refactoredVolume
        }
        setVolume(targetVolume)
    }

    const toggleMute = (e) => {
        const video = videoRef.current
        e.preventDefault()
        if (volume !== 0) {
            setVolume(0)
            video.muted = true
        } else {
            setVolume(100)
            video.muted = false
            video.volume = 1
        }
    }

    const handleChangeVideoSpeed = (e) => {
        e.preventDefault()
        const video = videoRef.current
        if (videoSpeed === 1) {
            video.playbackRate = 1.5
            setVideoSpeed(1.5)
        }
        if (videoSpeed === 1.5) {
            video.playbackRate = 2
            setVideoSpeed(2)
        }
        if (videoSpeed === 2) {
            video.playbackRate = 1
            setVideoSpeed(1)
        }
    }

    return (
        <div ref={videoContainerRef} className={`w-full rounded-[10px] relative bg-black`}>
            <Overlay playing={playing} show={show} />
            <div className={`
                    absolute bottom-0 left-0 right-0 z-[100] transition-opacity focus-within:opacity-100  text-[16px] video-controls-container flex flex-col justify-start items-start hover:opacity-100 ${hover || !playing ? "opacity-100" : "opacity-0"} ${playing && "focus-within:opacity-0"}
                    `}>
                <div ref={timelineContainerRef} className="w-full px-[16px] h-[4px] hover:h-[8px] cursor-pointer timeline-container">
                    <div className="w-full bg-[#ffffff40] h-full relative timeline">
                        <div className="thumb-indicator"></div>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[16px] py-[16px] px-[24px] justify-start">
                        <button onClick={(e) => togglePlayPause(e)}>
                            {playing ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white opacity-75 hover:opacity-100" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" /></svg>
                                :
                                <div onClick={(e) => togglePlayPause(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-white opacity-75 hover:opacity-100" height="24" viewBox="0 -960 960 960" width="24"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg>
                                </div>
                            }
                        </button>
                        <div
                            onMouseEnter={() => setVolumeHover(true)}
                            onMouseLeave={() => setVolumeHover(false)}
                            className="flex items-center gap-[16px]"
                        >
                            <button onClick={(e) => toggleMute(e)}>
                                <svg className={`${volume >= 50 ? "block" : "hidden"}`} height={24} width={24} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                                </svg>
                                <svg className={`${volume < 50 && volume > 1 ? "block" : "hidden"}`} height={24} width={24} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                                </svg>
                                <svg className={`${volume <= 1 ? "block" : "hidden"}`} height={24} width={24} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                                </svg>
                            </button>
                            <input className={`${volumeHover ? "range w-full transition-width ease-in-out duration-[150ms]" : "transition-all w-0 ease-in duration-[150ms] scale-x-0 origin-left "}`} type="range" min="0" max="100" step="1" value={volume} onChange={(e) => handleVolumeSlider(e)} ></input>
                        </div>
                        <div className="duration-container flex items-center justify-start gap-[8px]">
                            <div>{formatTime(currentTime)}</div>
                            <p>/</p>
                            <div>{formatTime(totalTime)}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-[16px] py-[16px] px-[24px]">
                        <button onClick={(e) => handleChangeVideoSpeed(e)}>
                            {`${videoSpeed}x`}
                        </button>
                        <button onClick={(e) => toggleMiniPlayerMode(e)}>
                            <svg height={24} width={24} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
                            </svg>
                        </button>

                        <button >
                            <svg height={24} width={24} viewBox="0 0 24 24">
                                <path fill="white" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
                            </svg>
                        </button>
                        <button onClick={(e) => toggleFullScreenMode(e)}>
                            <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <video ref={videoRef}
                onMouseEnter={(e) => { handleHoverVideo(e) }}
                onMouseLeave={(e) => { handleHoverLeaveVideo(e) }}
                onClick={(e) => { togglePlayPause(e) }}
                className="w-full rounded-[10px] mx-auto"
                src='/rhcp-cantStop.mp4'
                type="video/mp4">
                Your browser does not support the video tag or mp4s
            </ video>
        </div>
    )
}