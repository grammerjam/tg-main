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
            <nav className="bg-ma-blue flex desktop:inline-flex flex-row desktop:flex-col justify-between items-center tablet:rounded-2x1 desktop:rounded-3xl w-screen desktop:w-fit" >

                <div className='ml-4 tablet:ml-16 desktop:ml-0 desktop:mt-16'>
                    <img src="../../assets/logo.svg" alt="App-Icon" />
                </div>

                <div className='flex justify-between desktop:flex-col p-14 space-x-7 tablet:space-x-20 desktop:space-x-0 desktop:space-y-10'>
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

                <img src="../../assets/image-avatar.png" alt="User-Profile-Icon" className='desktop:mt-96 h-24 p-6 ' />
            </nav>
        </>
    )
}

export default Navbar