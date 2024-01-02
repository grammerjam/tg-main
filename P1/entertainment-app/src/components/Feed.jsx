
const Feed = ({ filteredMedia, selectedFilter  }) =>
{
    
    const renderContentByFilter = () =>
    {
        let content = null;

        switch (selectedFilter)
        {
            case "Movie":
                content = renderFilteredContent(filteredMedia.filter(item => item.category === "Movie"), "Movies");
                break;
            case "TV Series":
                content = renderFilteredContent(filteredMedia.filter(item => item.category === "TV Series"), "TV Series");
                break;
            case "Bookmarked":
                content = (
                    <>
                        {renderFilteredContent(filteredMedia.filter(item => item.category === "Movie" && item.isBookmarked), "Bookmarked Movies")}
                        {renderFilteredContent(filteredMedia.filter(item => item.category === "TV Series" && item.isBookmarked), "Bookmarked TV Series")}
                    </>
                );
                break;
            default: {
                const trending = filteredMedia.filter(item => item.isTrending);
                const recommended = filteredMedia.filter(item => !item.isTrending);
                content = (
                    <>
                        {renderFilteredContent(trending, "Trending")}
                        {renderFilteredContent(recommended, "Recommended for you")}
                    </>
                );
            }
                break;
            
        }
        return <div>{content}</div>;
    };



    const renderFilteredContent = (data, title) =>
    {
        return (
            <div key={title}>
                <h2>{title}</h2>
                {data.length > 0 ? renderItems(data) : <div>No {title} Content</div>}
            </div>
        );
    };

    const renderItems = (data) =>
    {
        return data.map((item, index) => (
            <div key={index}>
                
                <div className="thumbnail-container">
                    <div className="bookmark-icons">
                        {item.isBookmarked ? (
                            <img src="../../assets/icon-bookmark-full.svg" alt="Bookmarked" />
                        ) : (
                            <img src="../../assets/icon-bookmark-empty.svg" alt="Not Bookmarked" />
                        )}
                    </div>
                    <img src={item.thumbnail.regular.medium} alt="Thumbnail" className="thumbnail" />
                </div>
                <div className="details">
                    <p>{`Year: ${item.year} | Category: ${item.category} | Rating: ${item.rating}`}</p>
                </div>
                <h3>{item.title}</h3>
            </div>
        ));
    };

    return <div>{renderContentByFilter()}</div>;
};

export default Feed