import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from '../../data.json';
import SearchBar from "../components/SearchBar.jsx";
import Navbar from "../components/Navbar.jsx";
import MediaContainer from "../components/MediaContainer.jsx";
import bookmark from '/assets/icon-bookmark-empty.svg'
import bookmarkHover from '/assets/icon-bookmark-empty-hover.svg'
import bookmarkFilled from '/assets/icon-bookmark-full.svg'
import playButton from "/assets/icon-play.svg"

const Home = () =>
{
    let [searchParams] = useSearchParams()
    const [trendingResults, setTrendingResults] = useState([]);

    useEffect(() =>
    {
        // filters data to show trending only 
        const trendingItems = data.filter(item => item.isTrending === true);
        setTrendingResults(trendingItems);

        // retrieves url parameter
        let searchString = searchParams.get('search')

        // if it's url search is empty return results
        if (searchString === null)
        {
            setTrendingResults(() =>
            {
                return trendingItems
            })

            // else filter the url to return the result's title that matches 
        } else
        {
            searchString = searchString.toLowerCase()
            let sortedTrendingResults = trendingItems.sort((a, b) =>
            {
                const scoreA = a.title.toLowerCase().includes(searchString) ? 1 : 0;
                const scoreB = b.title.toLowerCase().includes(searchString) ? 1 : 0;
                return scoreB - scoreA;
            })
            setTrendingResults(() => sortedTrendingResults)
        }

        //  run this useEffect when either the URL or the results change
    }, [searchParams, trendingResults])


    return (
        <div className="flex flex-col desktop:flex-row">
            <Navbar />
            <div className="px-[16px] tablet:px-[24px] desktop:pl-[12px] desktop:pr-[36px] w-full">
                <SearchBar filterType={"movies or TV series"} />
                <div className='flex flex-col'>
                    <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> Trending </h1>
                    <div className='w-full h-full flex tablet:flex-row justify-start gap-x-[0.94rem] tablet:gap-x-[1.88rem] desktop:gap-x-[0.5rem] overflow-x-auto'>
                        {trendingResults.map((trendingResults) =>
                        {
                            return (
                                <>
                                    <div className='mb-[1rem] tablet:mb-[1.5rem] desktop:mb-[2rem] w-[45%] tablet:w-[30%] desktop:w-[22%] relative'>
                                        <div className='w-full flex relative justify-end mb-[0.5rem]' >
                                            <div className={`absolute mr-[0.5rem] mt-[0.5rem] tablet:mr-[1rem] tablet:mt-[1rem] w-[2rem] h-[2rem] bg-ma-black hover:bg-ma-white rounded-full opacity-50 hover:opacity-100 hover:fill-ma-black flex justify-center items-center`}
                                                onMouseEnter={(e) => { e.stopPropagation(); e.target.childNodes[0].src = bookmarkHover }}
                                                onMouseLeave={(e) => { e.stopPropagation(); e.target.childNodes[0].src = trendingResults.isBookmarked ? bookmarkFilled : bookmark; }}>
                                                <img src={trendingResults.isBookmarked ? bookmarkFilled : bookmark} onMouseEnter={(e) => e.stopPropagation()} onMouseLeave={(e) => e.stopPropagation()} />
                                            </div>
                                            <img className='w-full rounded-lg' src={trendingResults.thumbnail.regular.large} />
                                            <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
                                                <div className='flex items-center text-ma-white text-b-sm tablet:text-b-med mb-[0.25rem] tablet:mb-[0.30]'>
                                                    <p> {trendingResults.year} </p>
                                                    <p className='mx-[0.5rem]'> {"•"} </p>
                                                    {trendingResults.category === "Movie " ? (
                                                        <img src='/assets/icon-category-movie.svg' className='h-[0.75rem] w-[0.75rem] mr-[0.4rem]' alt='Movie Icon' />
                                                    ) : (
                                                        <img src='/assets/icon-category-tv.svg' className='h-[0.75rem] w-[0.75rem] mr-[0.4rem]' alt='Movie Icon' />
                                                    )}
                                                    <p> {trendingResults.category} </p>
                                                    <p className='mx-[0.5rem]'> {"•"} </p>
                                                    <p> {trendingResults.rating} </p>
                                                </div>
                                                <p className="font-light text-b-med tablet:text-h-med"> {trendingResults.title} </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
                <MediaContainer pageTitle={"Recommended"} />
            </div>
        </div>
    )
}

export default Home