import React from 'react';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import TvSeries from './TvSeries';
import Home from '../pages/Home';
import logo from '../../assets/logo.svg';
import iconNavHome from '../../assets/icon-nav-home.svg';
import iconNavMovies from '../../assets/icon-nav-movies.svg';
import iconNavTvSeries from '../../assets/icon-nav-tv-series.svg';
import iconNavBookmark from '../../assets/icon-nav-bookmark.svg';



const SideNav = () => {
  return (
    <div className='flex'>
      <Sidebar className='bg-black'>
        <Menu>
          <MenuItem as={Link} to='/'>
            <img src={logo}/>
          </MenuItem>
          <MenuItem as={Link} to='/Home'>
            <img src={iconNavHome}/>
          </MenuItem>
          <MenuItem as={Link} to='/movies'>
            <img src={iconNavMovies}/>
          </MenuItem>
          <MenuItem as={Link} to='/tvseries'>
            <img src={iconNavTvSeries}/>
          </MenuItem>
          <MenuItem as={Link} to='/bookmark'>
            <img src={iconNavBookmark}/>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideNav;

