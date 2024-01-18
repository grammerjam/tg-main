import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

import home from '/assets/icon-nav-home.svg';
import homeActive from '/assets/icon-nav-home-active.svg';
import movies from '/assets/icon-nav-movies.svg';
import moviesActive from '/assets/icon-nav-movies-active.svg';
import tv from '/assets/icon-nav-tv.svg';
import tvActive from '/assets/icon-nav-tv-active.svg';
import bookmarked from '/assets/icon-nav-bookmarked.svg';
import bookmarkedActive from '/assets/icon-nav-bookmarked-active.svg';

const Navbar = () => {
    const iconSet = {
        home: {
            active: homeActive,
            inactive: home
        },
        movies: {
            active: moviesActive,
            inactive: movies
        },
        tv: {
            active: tvActive,
            inactive: tv
        },
        bookmarked: {
            active: bookmarkedActive,
            inactive: bookmarked
        }
    }
    // conditionally renders "active" nav image
    const isActive = (path) => {
        if (path === 'home') {
            return window.location.pathname === '/' ? iconSet[`${path}`].active : iconSet[`${path}`].inactive;
        }
        return window.location.pathname === `/${path}` ? iconSet[`${path}`].active : iconSet[`${path}`].inactive;
    };

    return (
        <div className='desktop:h-[100vh]'>
            <div className='tablet:p-[24px] desktop:p[32px] desktop:h-[100%]'>
                <nav className="bg-ma-blue flex flex-row justify-between items-center p-[16px] mb-[24px] tablet:p-[20px] tablet:rounded-[10px] tablet:m-0 desktop:flex-col desktop:p-[28px] desktop:w-[96px] desktop:h-[100%] desktop:gap-0 desktop:justify-start" >
                    <Link to="/" className='desktop:pb-[75px]'>
                        <img src="/assets/logo.svg" alt="App-Icon" className='w-[25px] tablet:w-[32px]' />
                    </Link>
                    <div className='flex gap-[16px] justify-between tablet:gap-[26px] desktop:flex-col'>
                        <Link to="/">
                            <img src={isActive("home")} alt="Home" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                        <Link to="/movies" >
                            <img src={isActive("movies")} alt="Movies" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                        <Link to="/tv">
                            <img src={isActive("tv")} alt="TV-Series" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                        <Link to="/bookmarked" >
                            <img src={isActive(`bookmarked`)} alt="Bookmarked" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                    </div>
                    {/* <img src="/assets/image-avatar.png" alt="User-Profile-Icon" className='w-[24px] rounded-full tablet:w-[32px] desktop:mt-auto' /> */}
                    <div className='desktop:mt-auto'>
                        <UserButton />
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar