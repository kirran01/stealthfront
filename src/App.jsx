import { useState, useEffect, useContext } from 'react'
import { AuthContext } from './context/auth.context';
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
  const { user, isLoggedIn, logOut } = useContext(AuthContext);
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    if (user) {
      const getTickets = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/get-tickets`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          })
          if (res) {
            const reversedTickets = res.data.reverse();
            setTickets(reversedTickets)
          }
        } catch (err) {
          console.log(err)
        }
      }
      getTickets()
    }
  }, [user])

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
