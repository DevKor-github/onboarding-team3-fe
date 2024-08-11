import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/UseAuth'

function App() {
  return (
    <>
    <UserProvider>
      <Outlet />
      <ToastContainer />
    </UserProvider>
    </>
  )
}

export default App
