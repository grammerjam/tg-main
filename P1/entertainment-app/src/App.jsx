import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Movies from './pages/Movies.jsx'
import TVSeries from './pages/TVSeries.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import {
  SignedIn,
  SignedOut
} from '@clerk/clerk-react';
import ForgotPassword from './pages/ForgotPassword.jsx';
import NotFound from './pages/NotFound.jsx';
import SSOCallback from './components/SSOCallback.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const msToMinute = 60000
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: msToMinute * 30 } }
  })
  return (
    <div>
      <SignedOut>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<Login />} />
          <Route path="/sso-callback" element={<SSOCallback />} />
        </Routes>
      </SignedOut>
      <SignedIn>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/tv-series' element={<TVSeries />} />
            <Route path='/bookmark' element={<Bookmarks />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </SignedIn>
    </div>
  )
}



export default App