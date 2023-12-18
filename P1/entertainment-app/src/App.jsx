import React from 'react';
// import { Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import SideNav from '../src/components/SideNav';
import TvSeries from './components/TvSeries';
import Home from './components/Home';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


// https://medium.com/@galohernandez/vite-react-react-router-dom-the-latest-way-312ee887197e

// const router = createBrowserRouter(
//    createRoutesFromElements(
//      <Route>
//       <Route index element={<SideNav />} />
//      </Route>
//    )
//  )

// function App({ routes }) {

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <SideNav /> */}
        <Route path="/" element={<Home />} />
        <Route path="/tvseries" element={<TvSeries />} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
