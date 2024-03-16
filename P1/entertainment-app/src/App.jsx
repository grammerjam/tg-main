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
import BookmarkContext from './components/BookmarkProvider.jsx';

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
            <div className='desktop:pl-[32px] desktop:pt-[32px] desktop:flex'>
              <NavBar />
            </div>
            <main className='w-full pt-[64px] tablet:pt-[16px] desktop:pt-0 desktop:pl-[108px] '>
              <SearchBar />
              <div className='pt-[64px] tablet:pt-[16px] desktop:pt-[98px]'>
                <BookmarkContext>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/tv-series' element={<TVSeries />} />
                    <Route path='/bookmark' element={<Bookmarks />} />
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </BookmarkContext>
              </div>
            </main>
          </div>
        </QueryClientProvider>
      </SignedIn>
    </div>
  )
}



export default App