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
            <nav className="bg-ma-blue flex lg:inline-flex flex-row lg:flex-col justify-between items-center md:rounded-2x1 lg:rounded-3xl w-screen lg:w-fit" >

                <div className='ml-4 md:ml-16 lg:ml-0 lg:mt-16'>
                    <img src="../../assets/logo.svg" alt="App-Icon" />
                </div>

                <div className='flex justify-between lg:flex-col p-14 space-x-7 md:space-x-20 lg:space-x-0 lg:space-y-10'>
                    <Link to="/" onClick={() => handleCategory("Home")}>
                        <img src={isActive("home")} alt="Home" className="h-6" />
                    </Link>
                    <Link to="/movies" onClick={() => handleCategory("Movie")} >
                        <img src={isActive("movies")} alt="Movies" className="h-6" />
                    </Link>
                    <Link to="/tv-series" onClick={() => handleCategory("TV Series")}>
                        <img src={isActive("tv-series")} alt="TV-Series" className="h-6" />
                    </Link>
                    <Link to="/bookmarked" onClick={() => handleCategory("Bookmarked")} >
                        <img src={isActive("bookmark")} alt="Bookmarked" className="h-6" />
                    </Link>
                </div>

                <img src="../../assets/image-avatar.png" alt="User-Profile-Icon" className='lg:mt-96 h-24 p-6 ' />
            </nav>
        </>
    )
}

export default Navbar