import { useQuery } from "@tanstack/react-query";
import TrendingList from "./TrendingList";
import { useUser } from "@clerk/clerk-react";

const TrendingContainer = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user } = useUser();
    const userEmail = user.primaryEmailAddress.emailAddress;


    const { isLoading, data: trending, error} = useQuery({
        queryKey: ["Trending"],
        queryFn: () =>{
            const trending = fetch(backendUrl + "api/" + `trending/?email=${userEmail}`).then((res) =>
                res.json(),
            )
            console.log(trending)
            return trending
        },
        keepPreviousData: true,
    })

    if (isLoading|| trending == undefined) {
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

    if (error) {
        return 'An error has occurred: ' + error.message
    }

    return (
        <div className='flex flex-col '>
            <h1 className='text-[20px] tablet:text-[32px] mb-[1.5rem] font-[300] desktop:mb-[2rem]'> Trending </h1>
            <TrendingList trendingResults={trending} />
        </div>
    )
}

export default TrendingContainer