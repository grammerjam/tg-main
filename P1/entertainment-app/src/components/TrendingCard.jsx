import PropTypes from 'prop-types';
import { updateBookmark } from '../hooks/handleBookmark';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const TrendingCard = ({ trendingMedia }) => {
    const { user } = useUser();
    let userEmail = user.primaryEmailAddress.emailAddress

    const queryClient = useQueryClient()
    const [isBookmarkHovered, setIsBookmarkHovered] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(trendingMedia.isBookmarked)

    const handleHoverBookmark = () => {
        setIsBookmarkHovered(true)
    }
    const handleHoverLeaveBookmark = () => {
        setIsBookmarkHovered(false)
    }

    const updateBookmarkMutation = useMutation({
        mutationFn: (dataToSend) => {
            return updateBookmark(dataToSend)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["Bookmarked"] });
        },
    });

    const handleBookmarkMedia = async () => {
        setIsBookmarked((prev) => !prev)
        const dataToSend = {
            userEmail: userEmail,
            bookmarkId: trendingMedia.id
        }
        try {
            updateBookmarkMutation.mutate(dataToSend)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={`cursor-pointer hover:brightness-90 transition duration-300 ease-in-out drop-shadow-2x1 mb-[1rem] tablet:mb-[1.5rem] desktop:mb-[2rem] min-w-fit relative flex justify-end`}>
            <div className={` absolute top-[1rem] right-[1rem] tablet:top-[1.3rem] tablet:right-[1.5rem] w-[2rem] h-[2rem] bg-ma-black hover:bg-ma-white rounded-full opacity-50 hover:opacity-100 hover:fill-ma-black flex justify-center items-center hover:scale-110 transition-transform duration-200 hover:brightness-100`}
                onClick={handleBookmarkMedia}
                onMouseEnter={(e) => { handleHoverBookmark(e) }}
                onMouseLeave={(e) => { handleHoverLeaveBookmark(e) }}
                role="button" aria-pressed={trendingMedia.isBookmarked ? "true" : "false"} aria-label={trendingMedia.isBookmarked ? "Remove Bookmark" : "Add Bookmark"} tabIndex="0"
            >
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                    <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" strokeWidth="1.5" fill="none" className={`${isBookmarkHovered && "stroke-[#5A698F]"} ${isBookmarked && "fill-[#FFFFFF]"}`} />
                </svg>
            </div>
            <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
                <div className='flex items-center text-ma-white text-b-sm tablet:text-b-med mb-[0.25rem] tablet:mb-[0.30]'>
                    <p> {trendingMedia.year} </p>
                    <p className='mx-[0.5rem]'> {"•"} </p>
                    <img src={`${trendingMedia.category === 'Movie' ? '/assets/icon-category-movie.svg' : '/assets/icon-category-tv.svg'
                        }`} alt={trendingMedia.category} className='h-[0.75rem] w-[0.75rem] mr-[0.4rem]'></img>
                    <p> {trendingMedia.category} </p>
                    <p className='mx-[0.5rem]'> {"•"} </p>
                    <p> {trendingMedia.rating} </p>
                </div>
                <p className="font-light text-h-sm tablet:text-h-med" role="heading" aria-level="3"> {trendingMedia.title} </p>
            </div>

            <img className='
                min-w-[320px] 
                w-[60vw] tablet:w-[50vw] desktop:w-[30vw]
                max-w-[480px] tablet:max-w-[720px] desktop:max-w-[1080px]
                object-cover aspect-[2/1] rounded-lg
                '
                src={trendingMedia.tpathTrending} />
        </div>
    )
}

TrendingCard.propTypes = {
    trendingMedia: PropTypes.object
}

export default TrendingCard