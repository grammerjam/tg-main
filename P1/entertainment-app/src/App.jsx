// import Home from "./pages/Home"
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router-dom';

function App()
{

  return (
    <div>
    {/* <Home /> */}
    <Routes>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
    </Routes>
    </div>
  )
}

export default App
