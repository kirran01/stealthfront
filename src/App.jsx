import { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav'
import Footer from './components/footer'
import Login from './pages/login'
import Responsepage from './pages/responsepage'
import Home from './pages/home'
import Ticketpage from './pages/ticketpage'
import './App.css'

function App() {
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/tickets/get-tickets`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        if (res) {
          setTickets(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getTickets()
  }, [])

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home tickets={tickets} setTickets={setTickets} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tickets' element={<Ticketpage tickets={tickets} setTickets={setTickets} />} />
        <Route path='/responses' element={<Responsepage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
