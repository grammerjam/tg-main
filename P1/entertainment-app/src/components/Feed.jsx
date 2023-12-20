
const Feed = ({ selectedFilter, trendingItems }) =>
{

    const moviesData = [];
    const tvSeriesData = [];
    const bookmarkedMoviesData = [];
    const bookmarkedTvSeriesData = [];



    const renderContentByFilter = () =>
    {
        switch (selectedFilter)
        {
            case "Movies":
                return renderContent("Movies", moviesData);

            case "TV Series":
                return renderContent("TV Series", tvSeriesData);

            case "Bookmarked":
                return (
                    <>
                        {renderContent("Bookmarked Movies", bookmarkedMoviesData)}
                        {renderContent("Bookmarked TV Series", bookmarkedTvSeriesData)}
                    </>
                );
            default:
                return (
                    <>
                        {renderContent("Trending", trendingItems)}
                        {renderContent("Recommended", null)}
                    </>
                );
        }
    };

    const renderContent = (title, data) =>
    {
        return (
            <div key={title}>
                <h2>{title}</h2>
                {data ? renderItems(data) : <div>{`${title} Content`} </div>}
            </div>
        )
    };

    const renderItems = (data) =>
    {
        return data.map((item, index) => <div key={index}>  
            {item.name}
        </div> )
    }

    return (
        <div> {renderContentByFilter()} </div>

    )
}

export default Feed