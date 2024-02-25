import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { updateBookmark } from '../hooks/handleBookmark';
import { useUser } from '@clerk/clerk-react';

export default function MediaCard({ media, loading }) {
  const { user } = useUser();
  let userEmail = user.primaryEmailAddress.emailAddress
  const queryClient = useQueryClient()
  const [isBookmarked, setIsBookmarked] = useState(media.isBookmarked)
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false)
  const updateBookmarkMutation = useMutation({
    mutationFn: (dataToSend) => {
      const bookmarks = queryClient.getQueryData(["Bookmarked"])
      const getBookmarksIds = bookmarks.map((media) => {
        return media.id
      })
      updateBookmark(dataToSend, getBookmarksIds).then(() => {
        queryClient.invalidateQueries({ queryKey: ["Bookmarked"] });
      })
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["Bookmarked"] });
    // },
  });

  const handleBookmarkMedia = async () => {
    const dataToSend = {
      userEmail: userEmail,
      bookmarkId: media.id
    }
    try {
      updateBookmarkMutation.mutate(dataToSend)
      setIsBookmarked(prev => !prev)
    } catch (e) {
      console.log(e)
    }
  }

  const handleHoverBookmark = () => {
    setIsBookmarkHovered(true)
  }

  const handleHoverLeaveBookmark = () => {
    setIsBookmarkHovered(false)
  }

  return (
    <div className={`mb-[1rem] tablet:mb-[1.5rem] desktop:mb-[2rem] w-[calc((100%-15px)/2)] tablet:w-[calc((100%-60px)/3)] desktop:w-[calc((100%-120px)/4)] text-[11px] tablet:text-b-sm font-[300] text-[#FFFFFFBF] `}>
      <div className={`w-full flex relative justify-end mb-[0.5rem] rounded-lg ${loading && "skeleton"}`}>
        <div className={`absolute mr-[0.5rem] mt-[0.5rem] tablet:mr-[1rem] tablet:mt-[1rem] w-[2rem] h-[2rem] bg-ma-black hover:bg-ma-white rounded-full opacity-50 hover:opacity-100 hover:fill-ma-black flex justify-center items-center ${loading && "hidden"}`}
          onClick={handleBookmarkMedia}
          onMouseEnter={(e) => { handleHoverBookmark(e) }}
          onMouseLeave={(e) => { handleHoverLeaveBookmark(e) }}
        >
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" strokeWidth="1.5" fill="none" className={`${isBookmarkHovered && "stroke-[#5A698F]"} ${isBookmarked && "fill-[#FFFFFF]"}`} /></svg>
        </div>
        <img className={`w-full rounded-lg ${loading && "invisible"}`} src={media.tpath}></img>
      </div>
      <div className='flex items-center pb-[0.25rem] tablet:pb-[0.30] gap-[6px]'>
        <p>{media.year}</p>
        <p className=''>{"•"}</p>
        <div className='flex items-center gap-[4px]'>
          <img src={`${media.category === 'Movie' ? '/assets/icon-category-movie.svg' : '/assets/icon-category-tv.svg'
            }`} alt={media.category} className={`${media.category === "TvSeries" ? "h-[7px] w-[10px]" : ""} h-[10px] w-[10px]`} />
          <p>{media.category == "TvSeries" ? "TV Series" : media.category}</p>
        </div>
        <p className=''> {"•"} </p>
        <p> {media.rating} </p>
      </div>
      <p className='text-ma-white font-[500] tablet:text-h-xsm'> {media.title} </p>
    </div>
  )
}

MediaCard.propTypes = {
  media: PropTypes.object,
  loading: PropTypes.bool,
}

// MediaCardQuery.propTypes = {
//   media: PropTypes.object,
// }