import React from 'react';
import Ticket from '../components/ticket';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context'
import axios from 'axios';

const Ticketpage = ({ tickets, setTickets }) => {
    const filterTickets = async (status, e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/get-tickets`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const filteredTickets = res.data.filter((t) => t.status === status);
            setTickets(filteredTickets);
        } catch (err) {
            console.log(err);
        }
    };
    const getAllTickets = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/get-tickets`, {
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

    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <p className='text-center text-2xl m-5'>Tickets</p>
            <div>
                <button className='m-2 p-2 bg-slate-50 rounded-md' onClick={getAllTickets}>All</button>
                <button className='m-2 p-2 bg-slate-50 rounded-md' onClick={(e) => filterTickets('new', e)}>New</button>
                <button className='m-2 p-2 bg-slate-50 rounded-md' onClick={(e) => filterTickets('pending', e)}>Pending</button>
                <button className='m-2 p-2 bg-slate-50 rounded-md' onClick={(e) => filterTickets('resolved', e)}>Resolved</button>
            </div>
            <div>
                {
                    tickets.map(ticket => {
                        return (
                            <Ticket key={ticket._id} ticket={ticket} tickets={tickets} setTickets={setTickets} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Ticketpage;
