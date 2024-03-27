import PropTypes from 'prop-types';

export default function Overlay({ playing, show }) {
    return (
        <div className={`top-1/2 left-1/2 absolute bg-ma-black rounded-full p-[16px] transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-in-out ${show ? 'opacity-75' : 'opacity-0'}`}>
            {playing ?
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white " height="24" viewBox="0 -960 960 960" width="24"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" className="fill-white transition-opacity" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" /></svg>
            }
        </div>
    )
}

Overlay.propTypes = {
    playing: PropTypes.bool,
    show: PropTypes.bool,
}