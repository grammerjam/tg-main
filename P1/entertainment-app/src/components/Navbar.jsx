import { UserButton } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () =>
{   
    const location = useLocation();
    
    // conditionally renders "active" nav image
    const isActive = (path) =>
    {
        const iconPath = `/assets/icon-nav-${path}.svg`;
        const activeIconPath = `/assets/icon-nav-${path}-active.svg`;
        if (path === 'home')
        {
            return window.location.pathname === '/' ? activeIconPath : iconPath;
        }

        return window.location.pathname === `/${path}` ? activeIconPath : iconPath;
    };

    const [homeIcon, setHomeIcon] = useState("");
    const [movieIcon, setMovieIcon] = useState("");
    const [tvSeriesIcon, setTvSeriesIcon] = useState("");
    const [bookmarkIcon, setBookmarkIcon] = useState("");

    useEffect(() =>
    {
        setHomeIcon(isActive("home"));
        setMovieIcon(isActive("movies"));
        setTvSeriesIcon(isActive("tv-series"));
        setBookmarkIcon(isActive("bookmark"));

    }, [location]);

    
    return (
        <nav className='fixed tablet:relative tablet:rounded-t-[10px] desktop:rounded-[10px] desktop:fixed z-10 tablet:z-0 desktop:z-10 w-full desktop:w-auto desktop:h-[92vh]' aria-label="Main Navigation">
            <div className=' desktop:p[32px] desktop:h-[100%]'>
                <div className="bg-ma-blue flex flex-row justify-between items-center p-[16px]  tablet:p-[20px] tablet:rounded-t-[10px] desktop:rounded-[10px] desktop:flex-col desktop:p-[28px] desktop:w-[96px] desktop:h-[100%] desktop:gap-0 desktop:justify-start" >
                    <Link to="/" className='desktop:pb-[75px]' >
                        <img src="/assets/logo.svg" alt="App-Icon" className='w-[25px] tablet:w-[32px]' aria-label="Home Page"/>
                    </Link>
                    <div className='flex gap-[24px] justify-between tablet:gap-[26px] desktop:flex-col' role="menu">
                        <Link to="/" role="menuitem">
                            <img src={homeIcon} alt="Home" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                        <Link to="/movies" role="menuitem">
                            <img src={movieIcon} alt="Movies" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                        <Link to="/tv-series" role="menuitem">
                            <img src={tvSeriesIcon} alt="TV-Series" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                        <Link to="/bookmark" role="menuitem">
                            <img src={bookmarkIcon} alt="Bookmark" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                    </div>
                    <div className='desktop:mt-auto' role="button">
                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar