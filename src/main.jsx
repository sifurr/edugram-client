import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router-dom";
import { router } from './routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div className='max-w-screen-2xl mx-auto'>
          <RouterProvider router={router} />
        </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>,
)
