import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav'
import Footer from './components/footer'
import Login from './pages/login'
import Home from './pages/home'
import Ticketpage from './pages/ticketpage'
import './App.css'

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/tickets' element={<Ticketpage/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
