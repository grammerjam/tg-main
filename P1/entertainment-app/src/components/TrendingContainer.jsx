import { useQuery } from "@tanstack/react-query";
import { useUser, useAuth } from "@clerk/clerk-react";

import { joinArrays } from "../Utils";

import TrendingList from "./TrendingList";



const TrendingContainer = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user } = useUser();
    const { getToken } = useAuth();
    const userEmail = user.primaryEmailAddress.emailAddress;


    const { isLoading, data: trending, error} = useQuery({
        queryKey: ["Trending"],
        queryFn: () =>{
            const trending = fetch(backendUrl + "api/" + `trending/?email=${userEmail}`,
            {
                headers:{
                    Authorization: `Bearer ${getToken}`
                }
            }).then((res) =>
                res.json(),
            )
            return trending
        },
        keepPreviousData: true,
    })
    const { isLoading2, data: bookmarks, error2 } = useQuery({
        queryKey: [`Bookmarked`],
        queryFn: () => {
            const bookmarks = fetch(backendUrl + "api/" + `users/bookmarks/?email=${userEmail}`,
            {
                headers:{
                    Authorization: `Bearer ${getToken}`
                }
            })
            .then((res) =>
                res.json(),
            )
            return bookmarks
        },
        keepPreviousData: true,
    })



    if (isLoading|| trending == undefined || isLoading2 || bookmarks == undefined) {
        const loadingCards = []
        for (let i = 0; i < 10; i++) {
            const newEmptyCardObject = {
                score: -1,
                id: i,
                year: "YYYY",
                category: "Movie",
                title: "Loading",
                rating: "PG",
                tpathTrending: "/assets/grayBox.jpg"
            }
            loadingCards.push(newEmptyCardObject)
        }

        return (
            <div className='flex flex-col '>
                <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> Trending </h1>
                <TrendingList trendingResults={loadingCards} />
            </div>
        )
    }

    if (error || error2) {
        return 'An error has occurred: ' + error.message
    }

    const trendingData = joinArrays(bookmarks, trending, "id")

    return (
        <div className='flex flex-col '>
            <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> Trending </h1>
            <TrendingList trendingResults={trendingData} />
        </div>
    )
}

export default TrendingContainer