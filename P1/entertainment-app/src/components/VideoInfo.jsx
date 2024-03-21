import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VideoInfo() {
    const { id } = useParams()
    const [mediaInfo, setMediaInfo] = useState(null)
    const [folded, setFolded] = useState(true)

    const backendRootUrl = import.meta.env.VITE_BACKEND_URL

    const getMediaInfo = useCallback(async () => {
        let res = await fetch(`${backendRootUrl}api/media/${id}`)
        return res
    }, [backendRootUrl, id])

    useEffect(() => {
        getMediaInfo()
            .then(result => {
                result.json()
                    .then(data => {
                        console.log(data)
                        setMediaInfo(data)
                    })
            }).catch(err => {
                console.log(err);
            })
    }, [getMediaInfo, id]);

    const handleDescriptionClick = (e) => {
        e.preventDefault()
        setFolded((prev) => !prev)
    }

    return (
        <div className='flex flex-col w-full gap-[16px]'>
            <div className='flex flex-col justify-start items-start gap-[4px] tablet:flex-row tablet:items-baseline tablet:gap-[32px]'>
                <h1 className='text-h-sm font-[600] tablet:text-h-med desktop:text-h-lg'>
                    {mediaInfo?.title}
                </h1>
                <ul className='flex gap-[8px] justify-start items-start font-[300]'>
                    <li>{mediaInfo?.year}</li>
                    <li>{"•"}</li>
                    <li>{mediaInfo?.category}</li>
                    <li>{"•"}</li>
                    <li>{mediaInfo?.rating}</li>
                </ul>
            </div>
            <div
                onClick={(e) => handleDescriptionClick(e)}
                className={`${folded ? "max-h-[100px] overflow-hidden" : "max-h-none overflow-auto"} bg-ma-gray rounded-[12px] p-[12px] cursor-pointer`}>
                <p className={`${folded ? "max-h-[50px] overflow-hidden" : "max-h-none overflow-auto"} `}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam, ducimus numquam dicta fuga ex inventore molestias quisquam voluptas laborum, iusto sunt recusandae debitis enim. Deserunt reprehenderit ducimus voluptatum dolorum?</p>
                <button className={`${!folded && "pt-[16px]"}`}>{`${folded ? "...more" : "Show less"}`}</button>
            </div>
            <div className='w-full flex items-center justify-start gap-[8px]'>
                {mediaInfo?.genre.map((indvGenre, index) => {
                    return (
                        <p key={index} className='px-[8px] py-[4px] bg-ma-blue rounded-[10px]'>{indvGenre}</p>
                    )
                })}
            </div>
        </div>
    )
}