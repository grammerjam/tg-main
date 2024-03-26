import { useEffect, useRef, useState } from "react"

export default function MockVideoPlayer() {
    const videoRef = useRef(null)
    const [hover, setHover] = useState(false)
    const [playing, setPlaying] = useState(false)
    // const [volume, setVolume] = useState(100)
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        // Set a timeout to change the opacity to 0 after 1 second
        const timer = setTimeout(() => {
            setShow(false);
        }, 1000);

        // Clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [playing]); // Empty dependency array means this effect runs only once on mount

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
        <div className="w-full rounded-[10px] relative">
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
                    absolute bottom-0 left-0 right-0 z-[100] transition-opacity focus-within:opacity-100   text-[16px] video-controls-container ${hover || !playing ? "opacity-100" : "opacity-0"}
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
                    </div>
                </div>
            </div>
            <video ref={videoRef}
                onMouseEnter={(e) => { handleHoverVideo(e) }}
                onMouseLeave={(e) => { handleHoverLeaveVideo(e) }}
                onClick={(e) => { togglePlayPause(e) }}
                className="w-full rounded-[10px]" src='/rhcp-cantStop.mp4' type="video/mp4">
                Your browser does not support the video tag or mp4s
            </ video>
        </div>
    )
}