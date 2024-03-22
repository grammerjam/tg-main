import { useUser } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useState } from "react";
import WatchMoreCard from "./WatchMoreCard";
import PropTypes from 'prop-types';

export default function WatchMore({ videoId }) {
    const queryClient = useQueryClient()
    const queryKey = useMemo(() => ["WatchMore", videoId], [videoId]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { user } = useUser();
    const userEmail = user.primaryEmailAddress.emailAddress;
    const [watchMoreVideosArray, setWatchMoreVideosArray] = useState([])
    let queryFn = useCallback(async () => {
        const trending = fetch(backendUrl + "api/" + `watchMore/?email=${userEmail}&videoId=${videoId}`).then((res) =>
            res.json(),
        )
        return trending
    }, [backendUrl, userEmail, videoId])

    const getWatchMoreData = useCallback(async () => {
        const watchMoreData = await queryClient.ensureQueryData({ queryKey, queryFn })
        return watchMoreData
    }, [queryClient, queryFn, queryKey])

    // const watchMoreData = queryClient.getQueryData(["Trending"])
    useEffect(() => {
        getWatchMoreData().then(recommendedVideos => {
            setWatchMoreVideosArray(recommendedVideos)
        }).catch(err => {
            console.error(err);
        });
    }, [queryClient, queryFn, queryKey, getWatchMoreData])

    return (
        <div className='w-full flex flex-col gap-[16px] desktop:w-[35%]'>
            {watchMoreVideosArray.map((videoObj) => {
                return (
                    <WatchMoreCard key={videoObj.id} trendingMedia={videoObj} />
                )
            })}
        </div>
    )
}

WatchMore.propTypes = {
    videoId: PropTypes.string,
}