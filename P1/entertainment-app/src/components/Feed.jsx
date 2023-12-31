
const Feed = ({ media  }) =>
{
    
    console.log(media)
    const renderContentByFilter = () =>
    {
        switch (media)
        {
            case "Movies":
                return renderContent("Movies", media.filter(item => item.category === "Movie"));
            default:
                return (
                    <>
                        {renderContent("Trending", null)}
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