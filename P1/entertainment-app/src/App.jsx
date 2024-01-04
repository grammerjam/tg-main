import Home from './pages/Home'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App