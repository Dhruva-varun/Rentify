import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Listing from './pages/Listing'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'



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
        <Route path='/create-listing' element={<CreateListing />}/>
        <Route path='/update-listing/:id' element={<UpdateListing />}/>
        </Route>
        <Route path='/listing' element={<Listing />}/>
      </Routes>
    </BrowserRouter>   
  )
}

export default App
