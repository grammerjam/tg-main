import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Movies from './pages/Movies.jsx'
import TVSeries from './pages/TVSeries.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

function App() {
  return (
    <div>
      <SignedOut>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </SignedOut>
      <SignedIn>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tv' element={<TVSeries />} />
          <Route path='/bookmarked' element={<Bookmarks />} />
          <Route path='*' element={<h1>No Component but signed in.</h1>} />
        </Routes>
      </SignedIn>
    </div>
  )
}

export default App