import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Profile from '../pages/profile'
import Listing from '../pages/Listing'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/listing' element={<Listing />}/>
      </Routes>
    </BrowserRouter>   
  )
}

export default App
