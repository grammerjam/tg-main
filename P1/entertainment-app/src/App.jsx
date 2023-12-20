import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import SideNav from '../src/components/SideNav';
import Home from "./pages/Home"
import TvSeries from './components/TvSeries';


function App() {
  return (
    <BrowserRouter>
      <SideNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tvseries" element={<TvSeries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
