import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Movies from './pages/Movies.jsx'
import NoResultsPage from './pages/NoResultsPage.jsx';

function App()
{
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/movies' element={<Movies />} />
        <Route path="/no-results-for-:searchQuery" component={NoResultsPage} />
      </Routes>
    </div>
  )
}

export default App