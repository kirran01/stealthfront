import React from 'react';
import Ticket from '../components/ticket';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Ticketpage = ({ tickets, setTickets }) => {
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <p className='text-center text-2xl m-5'>Tickets</p>
            <div>
                <button className='m-2 p-2 bg-slate-50 rounded-md'>New</button>
                <button className='m-2 p-2 bg-slate-50 rounded-md'>Pending</button>
                <button className='m-2 p-2 bg-slate-50 rounded-md'>Resolved</button>
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
