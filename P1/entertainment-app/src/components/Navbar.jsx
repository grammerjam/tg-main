const Navbar = ({ handleFilter }) =>
{

    // passes value(the filter) to the parent (Home Page)
    const handleCategory = (category) =>
    {
        handleFilter(category)
    }

    // Handle redirection to the user profile page
    const handlProfileClick = () =>
    {
    };

    return (
        <>
            <img src="../../assets/logo.svg" alt="App-Icon" />
            <nav className="navbar-container">
                <ul>
                    <li onClick={() => handleCategory("Home")}>
                        <img src="../../assets/icon-nav-home.svg" alt="Home" />
                    </li>
                    <li onClick={() => handleCategory("TV Series")}>
                        <img src="../../assets/icon-nav-tv-series.svg" alt="TV-Series" />
                    </li>
                    <li onClick={() => handleCategory("Movie")}>
                        <img src="../../assets/icon-nav-movies.svg" alt="Movies" />
                    </li>
                    <li onClick={() => handleCategory("Bookmarked")}>
                        <img src="../../assets/icon-nav-bookmark.svg" alt="Bookmarked" />
                    </li>
                </ul>
            </nav>
            <img src="../../assets/image-avatar.png" alt="User-Profile-Icon" />
        </>
    )


}

export default Navbar