import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
// import { useEffect, useState } from "react";


import TrendingList from "./TrendingList";

const TrendingContainer = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user } = useUser();

    const userEmail = user.primaryEmailAddress.emailAddress;

    // const [trendingMedia, setTrendingMedia] = useState([]);
    const { isLoading, data, error } = useQuery({
        queryKey: ["Trending"],
        queryFn: () => {
            const trending = fetch(backendUrl + "api/" + `trending/?email=${userEmail}`).then((res) =>
                res.json(),
            )
            return trending
        },
        keepPreviousData: true,
    })

    // useEffect(() => {
    //     if (!isLoading && data) {
    //         setTrendingMedia(data)
    //     }
    // }, [isSuccess, isLoading, data]);

    if (isLoading || data == undefined) {
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
                <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> Recommended </h1>
                <TrendingList trendingResults={loadingCards} />
            </div>
        )
    }

    if (error) {
        return 'An error has occurred: ' + error.message
    }
    
    const allTrending = data.filter((item) => item.score >= 0)

    if (allTrending.length < 2){
        return (<></>)
    }

    return (
        <div className='flex flex-col '>
            <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> Recommended </h1>
            <TrendingList trendingResults={allTrending} />
        </div>
    )
}

export default TrendingContainer