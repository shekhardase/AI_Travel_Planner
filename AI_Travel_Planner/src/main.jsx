import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import TravelTitle from './Pages/TravelTitle'
import { Header } from './components/custom/Header'
import { Toaster } from './components/ui/sonner'

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />
  },
  {
    path: '/Title',
    element: <TravelTitle />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Toaster />
    <RouterProvider router={router} />

  </StrictMode>,
)
