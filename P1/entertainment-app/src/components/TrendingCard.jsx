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

    const handleHoverBookmark = () => {
        setIsBookmarkHovered(true)
    }
    const handleHoverLeaveBookmark = () => {
        setIsBookmarkHovered(false)
    }

    const updateBookmarkMutation = useMutation({
        mutationFn: (dataToSend) => updateBookmark(dataToSend),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Bookmarked"]});
        },
    });

    const handleBookmarkMedia = async () => {
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
        <div className='mb-[1rem] tablet:mb-[1.5rem] desktop:mb-[2rem] min-w-fit relative'>
            <div className='w-full flex relative justify-end mb-[0.5rem]' >
                <div className={`absolute mr-[0.5rem] mt-[0.5rem] tablet:mr-[1rem] tablet:mt-[1rem] w-[2rem] h-[2rem] bg-ma-black hover:bg-ma-white rounded-full opacity-50 hover:opacity-100 hover:fill-ma-black flex justify-center items-center`}
                    onClick={handleBookmarkMedia}
                    onMouseEnter={(e) => { handleHoverBookmark(e) }}
                    onMouseLeave={(e) => { handleHoverLeaveBookmark(e) }}>
                    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" strokeWidth="1.5" fill="none" className={`${isBookmarkHovered && "stroke-[#5A698F]"} ${trendingMedia.isBookmarked && "fill-[#FFFFFF]"}`} /></svg>
                </div>
                <img className='w-full rounded-lg' src={trendingMedia.tpathTrending} />
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
                    <p className="font-light text-h-sm tablet:text-h-med"> {trendingMedia.title} </p>
                </div>
            </div>
        </div>
    )
}

TrendingCard.propTypes = {
    trendingMedia: PropTypes.object
}

export default TrendingCard