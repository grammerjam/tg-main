import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import VideoPlayer from "../components/VideoPlayer";
import WatchMore from '../components/WatchMore';

export default function VideoPage() {
    const { id } = useParams()

    return (
        <div className='px-[16px] flex flex-col justify-start items-start gap-[16px] tablet:px-[24px] desktop:pr-[36px] desktop:flex-row w-full desktop:gap-[36px] pb-[16px] tablet:pb-[24px]'>
            <div className='w-full desktop:w-[65%] flex flex-col gap-[8px] desktop:gap-[12px]'>
                <VideoPlayer />
                <div className='flex flex-col w-full gap-[16px]'>
                    <div className='flex flex-col justify-start items-start gap-[4px] tablet:flex-row tablet:items-baseline tablet:gap-[32px]'>
                        <h1 className='text-h-sm font-[600] tablet:text-h-med desktop:text-h-lg'>
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
            </div>
            <WatchMore />
        </div>
    )
}

VideoPage.propTypes = {
    params: PropTypes.object,
}