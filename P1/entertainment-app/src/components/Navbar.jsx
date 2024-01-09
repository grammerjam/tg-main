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
            <nav className="bg-ma-blue flex lg:inline-flex  flex-row lg:flex-col justify-between items-center md:rounded-2x1 lg:rounded-3xl lg:h-5/6 p-4">

                <div className="ml-4 sm:ml-0 sm:mr-auto">
                    <img src="../../assets/logo.svg" alt="App-Icon" />
                </div>

                <div className='flex justify-between lg:flex-col p-14'>
                    <Link to="/" onClick={() => handleCategory("Home")}>
                        <img src={isActive("home")} alt="Home" />
                    </Link>
                    <Link to="/tv-series" onClick={() => handleCategory("TV Series")}>
                        <img src={isActive("tv-series")} alt="TV-Series" className="h-18" />
                    </Link>
                    <Link to="/movies" onClick={() => handleCategory("Movie")} >
                        <img src={isActive("movies")} alt="Movies" className="h-6 sm:h-8" />
                    </Link>
                    <Link to="/bookmarked" onClick={() => handleCategory("Bookmarked")} >
                        <img src={isActive("bookmark")} alt="Bookmarked" className="h-6 sm:h-8" />
                    </Link>
                </div>

                <img src="../../assets/image-avatar.png" alt="User-Profile-Icon" className="h-8 sm:h-10 mr-4" />
            </nav>
        </>
    )
}

export default Navbar