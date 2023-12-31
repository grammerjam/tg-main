

const Navbar = ({ handleFilter }) =>

{

    const handleCategory = (category) =>
    {
        handleFilter(category)
    }


    return (
        <nav>
            <ul>
                <li onClick={()=> handleCategory("home")}>H</li>
                <li onClick={() => handleCategory("tv-series")}>TV</li>
                <li onClick={() => handleCategory("movies")}>M</li>
                <li onClick={() => handleCategory("bookmarked")}>B</li>
            </ul>    
        </nav>
    )


}

export default Navbar