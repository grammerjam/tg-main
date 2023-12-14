import React from 'react';
import { Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import SideNav from '../src/components/SideNav';


// https://medium.com/@galohernandez/vite-react-react-router-dom-the-latest-way-312ee887197e

const router = createBrowserRouter(
   createRoutesFromElements(
     <Route>
      <Route index element={<SideNav />} />
     </Route>
   )
 )

function App({ routes }) {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
