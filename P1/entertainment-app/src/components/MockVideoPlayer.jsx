import { useEffect, useRef, useState } from "react"

export default function MockVideoPlayer() {
    const videoRef = useRef(null)
    const videoContainerRef = useRef(null)
    const [hover, setHover] = useState(false)
    const [playing, setPlaying] = useState(false)
    // const [volume, setVolume] = useState(100)
    const [show, setShow] = useState(false)
    const [playerMode, setPlayerMode] = useState("window")

    useEffect(() => {
        setShow(true)
        // Set a timeout to change the opacity to 0 after 1 second
        const timer = setTimeout(() => {
            setShow(false)
        }, 1000)

        // Clear the timeout if the component unmounts
        return () => clearTimeout(timer)
    }, [playing])

    useEffect(() => {
        const video = videoRef.current
        const handleMetadataLoaded = () => {
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

        return () => {
            video.removeEventListener('loadedmetadata', handleMetadataLoaded)
        }
    }, [playerMode])

    const toggleTheaterMode = (e) => {
        e.preventDefault()
        setPlayerMode("theater")
    }

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

    return (
        <div ref={videoContainerRef} className={`w-full rounded-[10px] relative bg-black ${playerMode === "theater" && "bg-black w-full max-h-[80vh]"}`}>
            <div>
                <div>
                    <div className={`top-1/2 left-1/2 absolute bg-ma-black rounded-full p-[16px] transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-in-out ${show ? 'opacity-75' : 'opacity-0'}`}>
                        {playing ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-white " height="24" viewBox="0 -960 960 960" width="24"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" className="fill-white transition-opacity" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" /></svg>
                        }
                    </div>
                    <div
                        className={`
                    absolute bottom-0 left-0 right-0 z-[100] transition-opacity focus-within:opacity-100   text-[16px] video-controls-container flex items-center justify-between hover:opacity-100 ${hover || !playing ? "opacity-100" : "opacity-0"}
                    `}>
                        <div className="flex items-center gap-[16px] py-[16px] px-[24px]">
                            <button onClick={(e) => togglePlayPause(e)}>
                                {playing ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-white opacity-75 hover:opacity-100" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" /></svg>
                                    :
                                    <div onClick={(e) => togglePlayPause(e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-white opacity-75 hover:opacity-100" height="24" viewBox="0 -960 960 960" width="24"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg>
                                    </div>
                                }
                            </button>
                            <button>
                                <svg className="fill-white opacity-75 hover:opacity-100" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" /></svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-end gap-[16px] py-[16px] px-[24px]">
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