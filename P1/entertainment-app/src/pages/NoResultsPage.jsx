import { useParams } from "react-router-dom"



const NoResultsPage = () =>
{

    const { searchQuery } = useParams();

    return (
        <div>
            <p>Sorry, no results for &quot;{searchQuery}&quot;</p>
        </div>)
}

export default NoResultsPage