import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./style/globals.css"
import { ClerkProvider } from "@clerk/clerk-react"
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const msToMinute = 60000
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: msToMinute * 30 } }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
