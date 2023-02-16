import React from 'react';
import Ticket from '../components/ticket';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Ticketpage = () => {
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
                    console.log(res.data, 'rd')
                    setTickets(res.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getTickets()
    }, [])

    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <p className='text-center text-2xl'>Tickets</p>
            <div>
                <Ticket />
            </div>
        </div>
    );
}

export default Ticketpage;
