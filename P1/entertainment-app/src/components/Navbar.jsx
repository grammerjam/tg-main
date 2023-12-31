

const Navbar = ({ handleFilter }) =>

{

    const handleCategory = (category) =>
    {
        handleFilter(category)
    }


    return (
        <nav>
            <ul>
                <li onClick={()=> handleCategory("Home")}>H</li>
                <li onClick={() => handleCategory("TV Series")}>TV</li>
                <li onClick={() => handleCategory("Movies")}>M</li>
                <li onClick={() => handleCategory("Bookmarked")}>B</li>
            </ul>    
        </nav>
    )


}

export default Navbar