import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Movies from './pages/Movies.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv' element={<p> TvSeries  </p>} />
        <Route path='/bookmarked' element={<p> Bookmarked </p>} />
        <Route path='*' element={<h1>No Component.</h1>} />
      </Routes>
    </div>
  )
}

export default App