import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () =>
{

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

    return (
        <nav className='fixed z-10 w-full desktop:w-auto desktop:h-[100vh]'>
            <div className='tablet:p-[24px] desktop:p[32px] desktop:h-[100%]'>
                <div className="bg-ma-blue flex flex-row justify-between items-center p-[16px]  tablet:p-[20px] tablet:rounded-[10px] desktop:flex-col desktop:p-[28px] desktop:w-[96px] desktop:h-[100%] desktop:gap-0 desktop:justify-start" >
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
                        <Link to="/tv-series">
                            <img src={isActive("tv-series")} alt="TV-Series" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                        <Link to="/bookmark" >
                            <img src={isActive("bookmark")} alt="bookmark" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                    </div>
                    <div className='desktop:mt-auto'>
                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar