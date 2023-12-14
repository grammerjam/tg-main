import React from 'react';
import { Link } from "react-router-dom";
import Home from './Home';
import TvSeries from './TvSeries';


function SideNav() {
  return (
    <div className='text-yellow'>
      <nav>
        <ul>
          <li>
            <Link to="/">{Home}</Link>
          </li>
          <li>
            <Link to="/TvSeries">{TvSeries}</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideNav;

