import PropTypes from 'prop-types';
import TrendingCard from './TrendingCard';

// import { updateBookmark } from '../hooks/handleBookmark';
// import { useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

const WatchMoreCard = ({ trendingMedia }) => {
    // const { user } = useUser();
    // let userEmail = user.primaryEmailAddress.emailAddress

    // const queryClient = useQueryClient()
    // const [isBookmarkHovered, setIsBookmarkHovered] = useState(false)
    // const [isBookmarked, setIsBookmarked] = useState(trendingMedia.isBookmarked)

    // const handleHoverBookmark = () => {
    //     setIsBookmarkHovered(true)
    // }
    // const handleHoverLeaveBookmark = () => {
    //     setIsBookmarkHovered(false)
    // }

    // const updateBookmarkMutation = useMutation({
    //     mutationFn: (dataToSend) => {
    //         return updateBookmark(dataToSend)
    //     },
    //     onSettled: () => {
    //         queryClient.invalidateQueries({ queryKey: ["Bookmarked"] });
    //     },
    // });

    // const handleBookmarkMedia = async () => {
    //     setIsBookmarked((prev) => !prev)
    //     const dataToSend = {
    //         userEmail: userEmail,
    //         bookmarkId: trendingMedia.id
    //     }
    //     try {
    //         updateBookmarkMutation.mutate(dataToSend)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <div className='w-full flex flex-col gap-[4px] tablet:flex-row tablet:gap-[32px]'>
            <img className='w-full rounded-[10px] tablet:w-[30%]' src={trendingMedia.tpathTrending} />
            <div className='w-full flex flex-col gap-[8px]'>
                <div className='flex gap-[8px] items-baseline tablet:gap-[16px]'>
                    <p className='text-[20px] font-[600] tablet:text-[24px] tablet:font-[500]'>{trendingMedia.title}</p>
                    <p>{trendingMedia.year}</p>
                </div>
                <p className='text-[12px] tablet:text-[16px]'>{"Rated: " + trendingMedia.rating}</p>
                <div className='flex gap-[8px]'>
                    {trendingMedia.genre.map((genre, index) => {
                        return (
                            <div key={index} className='bg-ma-blue rounded-[10px] px-[8px] py-[4px] tablet:px-[16px] tablet:py-[8px]'>
                                <p className='tablet:text-[20px]'>{genre}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        // <div className='mb-[1rem] tablet:mb-[1.5rem] desktop:mb-[2rem] min-w-fit relative'>
        //     <div className='w-full flex relative justify-end mb-[0.5rem]' >
        //         <div className={`cursor-pointer absolute mr-[0.5rem] mt-[0.5rem] tablet:mr-[1rem] tablet:mt-[1rem] w-[2rem] h-[2rem] bg-ma-black rounded-full  flex justify-center items-center ${isBookmarked ? "bg-ma-white opacity-100" : "opacity-50"}`}
        //             onClick={handleBookmarkMedia}
        //             onMouseEnter={(e) => { handleHoverBookmark(e) }}
        //             onMouseLeave={(e) => { handleHoverLeaveBookmark(e) }}
        //         >
        //             <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" className={`${isBookmarkHovered ? "fill-[#FFFFFF]" : "fill-none"}  ${isBookmarked ? "stroke-ma-black" : "stroke-ma-white"}`}>
        //                 <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" strokeWidth="1.5" />
        //             </svg>
        //         </div>
        //         <img className='w-full rounded-lg' src={trendingMedia.tpathTrending} />
        //         <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
        //             <div className='flex items-center text-ma-white text-b-sm tablet:text-b-med mb-[0.25rem] tablet:mb-[0.30]'>
        //                 <p> {trendingMedia.year} </p>
        //                 <p className='mx-[0.5rem]'> {"•"} </p>
        //                 <img src={`${trendingMedia.category === 'Movie' ? '/assets/icon-category-movie.svg' : '/assets/icon-category-tv.svg'
        //                     }`} alt={trendingMedia.category} className='h-[0.75rem] w-[0.75rem] mr-[0.4rem]'></img>
        //                 <p> {trendingMedia.category} </p>
        //                 <p className='mx-[0.5rem]'> {"•"} </p>
        //                 <p> {trendingMedia.rating} </p>
        //             </div>
        //             <p className="font-light text-h-sm tablet:text-h-med"> {trendingMedia.title} </p>
        //         </div>
        //     </div>
        // </div>
    )
}

WatchMoreCard.propTypes = {
    trendingMedia: PropTypes.object
}

export default WatchMoreCard