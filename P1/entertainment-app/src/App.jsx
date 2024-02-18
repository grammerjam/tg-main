import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Movies from './pages/Movies.jsx'
import NotFound from './pages/NotFound.jsx';
import TVSeries from './pages/TVSeries.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import {
  SignedIn,
  SignedOut
} from '@clerk/clerk-react';
import ForgotPassword from './pages/ForgotPassword.jsx';
import SSOCallback from './components/SSOCallback.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NavBar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';

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
          <div className='flex flex-col desktop:flex-row w-full relative'>
            <div className='hidden tablet:flex desktop:hidden'>
              <div className='fixed z-10 w-full h-auto tablet:flex-col p-[24px]'>
                <div className=' rounded-[10px] border-2 border-ma-gray'>
                  <NavBar />
                  <SearchBar />
                </div>
              </div>
            </div>
            <div className='desktop:pl-[32px] desktop:pt-[32px] tablet:hidden desktop:flex'>
              <NavBar />
            </div>
            <main className='w-full pt-[64px] desktop:pl-[108px] tablet:pt-[128px] desktop:pt-[0px]'>
              <div className='tablet:hidden desktop:flex'>
                <SearchBar />
              </div>
              <div className='pt-[64px] desktop:pt-[98px]'>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create-account" element={<CreateAccount />} />
                  <Route path='/movies' element={<Movies />} />
                  <Route path='/tv-series' element={<TVSeries />} />
                  <Route path='/bookmark' element={<Bookmarks />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </QueryClientProvider>
      </SignedIn>
    </div>
  )
}



export default App