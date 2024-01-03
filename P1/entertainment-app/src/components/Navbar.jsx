import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ handleFilter }) =>
{

    // passes value(the filter) to the parent (Home Page)
    const handleCategory = (category) =>
    {
        handleFilter(category)
    }

    // Handle redirection to the user profile page
    const handleProfileClick = () =>
    {
    };

    Navbar.propTypes = {
        handleFilter: PropTypes.func.isRequired,
        // Add other prop validations if needed
    };

    return (
        <>
            <img src="../../assets/logo.svg" alt="App-Icon" />
            <nav className="navbar-container">
                <ul>

                    <li onClick={() => handleCategory("Home")}>
                        <Link to="/">
                            <img src="../../assets/icon-nav-home.svg" alt="Home" />
                        </Link>
                    </li>
                    <li onClick={() => handleCategory("TV Series")}>
                        <Link to="/tv-series">
                            <img src="../../assets/icon-nav-tv-series.svg" alt="TV-Series" />
                        </Link>
                    </li>
                    <li onClick={() => handleCategory("Movie")}>
                        <Link to="/movies">
                            <img src="../../assets/icon-nav-movies.svg" alt="Movies" />
                        </Link >
                    </li>
                    <li onClick={() => handleCategory("Bookmarked")}>
                        <Link to="/bookmarked">
                            <img src="../../assets/icon-nav-bookmark.svg" alt="Bookmarked" />
                        </Link>
                    </li>
                </ul>
            </nav>
            <img src="../../assets/image-avatar.png" alt="User-Profile-Icon" />
        </>
    )


}

export default Navbar