import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Movies from './pages/Movies.jsx'
import NotFound from './pages/NotFound.jsx';
import TVSeries from './pages/TVSeries.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import ForgotPassword from './pages/ForgotPassword.jsx';

import NavBar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';

function App() {
  return (
    <div>
      <SignedOut>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </SignedOut>
      <SignedIn>
        {/* Routes Signed in, Route found. */}
        {/* make them both sticky */}
        <div className='flex flex-col desktop:flex-row'>
          <NavBar/>
          <main className='w-full'>
            <SearchBar/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path='/movies' element={<Movies/>} />
              <Route path='/tv-series' element={<TVSeries/>} />
              <Route path='/bookmark' element={<Bookmarks/>} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </main>
        </div>
      </SignedIn>
    </div>
  )
}

export default App