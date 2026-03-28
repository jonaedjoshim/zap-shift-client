import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 50,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)