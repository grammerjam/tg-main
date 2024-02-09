import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Movies from './pages/Movies.jsx'
import TVSeries from './pages/TVSeries.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import ForgotPassword from './pages/ForgotPassword.jsx';
import NotFound from './pages/NotFound.jsx';

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
        <header>
          <SearchBar></SearchBar>
        </header>
        <nav>
          <NavBar></NavBar>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tv-series' element={<TVSeries />} />
          <Route path='/bookmark' element={<Bookmarks />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SignedIn>
    </div>
  )
}

export default App