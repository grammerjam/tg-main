import Home from './pages/Home'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  )
}

export default App
