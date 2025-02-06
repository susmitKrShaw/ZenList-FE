import { useRef, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom"
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
