import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, } from "react-router-dom";
import { router } from './routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <div className='max-w-screen-2xl mx-auto'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>,
)
