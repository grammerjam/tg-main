import { Link } from 'react-router-dom';

const Navbar = () => {

    // conditionally renders "active" nav image
    const isActive = (path) => {
        const iconPath = `/assets/icon-nav-${path}.svg`;
        const activeIconPath = `/assets/icon-nav-${path}-active.svg`;
        if (path === 'home') {
            return window.location.pathname === '/' ? activeIconPath : iconPath;
        }
        return window.location.pathname === `/${path}` ? activeIconPath : iconPath;
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
                            <img src={isActive("tv-series")} alt="TV-Series" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                        <Link to="/bookmarked" >
                            <img src={isActive("bookmark")} alt="Bookmarked" className="h-[16px] tablet:h-[20px]" />
                        </Link>
                    </div>
                    <img src="/assets/image-avatar.png" alt="User-Profile-Icon" className='w-[24px] rounded-full tablet:w-[32px] desktop:mt-auto' />
                </nav>
            </div>
        </div>
    )
}

export default Navbar