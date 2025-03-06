import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Listing from './pages/Listing'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'



function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route element={<PrivateRoute/>} >
        <Route path='/profile' element={<Profile />}/>
        </Route>
        <Route path='/listing' element={<Listing />}/>
      </Routes>
    </BrowserRouter>   
  )
}

export default App
