import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ handleFilter }) =>
{

    Navbar.propTypes = {
        handleFilter: PropTypes.func.isRequired,
    };


    // passes value(the filter) to the parent (Home Page)
    const handleCategory = (category) =>
    {
        handleFilter(category)
    }


    // conditionally renders "active" nav image
    const isActive = (path) =>
    {
        const iconPath = `../../assets/icon-nav-${path}.svg`;
        const activeIconPath = `../../assets/icon-nav-${path}-active.svg`;
        if (path === 'home')
        {
            return window.location.pathname === '/' ? activeIconPath : iconPath;
        }
        return window.location.pathname === `/${path}` ? activeIconPath : iconPath;
    };

    return (
        <>
            <img src="../../assets/logo.svg" alt="App-Icon" />
            <nav className="navbar-container">
                <Link to="/" onClick={() => handleCategory("Home")} className="nav-link">
                    <img src={isActive("home")} alt="Home" className="nav-icon" />
                </Link>
                <Link to="/tv-series" onClick={() => handleCategory("TV Series")} className="nav-link">
                    <img src={isActive("tv-series")} alt="TV-Series" className="nav-icon" />
                </Link>
                <Link to="/movies" onClick={() => handleCategory("Movie")} className="nav-link">
                    <img src={isActive("movies")} alt="Movies" className="nav-icon" />
                </Link>
                <Link to="/bookmarked" onClick={() => handleCategory("Bookmarked")} className="nav-link">
                    <img src={isActive("bookmark")} alt="Bookmarked" className="nav-icon" />
                </Link>
            </nav>
            <img src="../../assets/image-avatar.png" alt="User-Profile-Icon" />
        </>
    )
}

export default Navbar