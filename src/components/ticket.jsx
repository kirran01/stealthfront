import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
const Ticket = ({ ticket, tickets, setTickets }) => {
    const [statusInput, setStatusInput] = useState('')
    const [openEdit, setOpenEdit] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [responseInput, setResponseInput] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const customStyles = {
        content: {
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const respondToTicket = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:3000/response/create-response`, {
                response: responseInput,
                email: ticket.email
            },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
            if (res) {
                console.log(res.data, 'rd')
                closeModal()
                setResponseInput('')
            }
        } catch (err) {
            console.log(err)
        }
    }
    const changeTicketStatus = async (ticketStatus, e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:3000/tickets/edit-ticket/${ticket._id}`, {
                status: ticketStatus
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                setOpenEdit(false)
                const editedTicket = tickets.map((t) => {
                    if (t._id === ticket._id) {
                        return { ...t, status: ticketStatus };
                    }
                    return t;
                });
                setTickets(editedTicket);
            }
        } catch (err) {
            console.log(err)
        }
    }
    const deleteTicket = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`http://localhost:3000/tickets/delete-ticket/${ticket._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                let ticketsAfterDelete = tickets.filter((t) => t._id !== ticket._id)
                setTickets(ticketsAfterDelete)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex flex-col items-center rounded-md shadow-md max-w-md bg-white my-5 p-2 relative'>
            <div className='flex justify-between w-full'>
                <button className={`m-2 p-2 text-sm w-22 flex items-center rounded-md ${ticket.status === 'resolved' ? 'bg-green-500 hover:bg-green-600' : ticket.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-slate-50 hover:bg-slate-100'} hover:bg-slate-100`} onClick={() => { setOpenEdit(true) }}>{ticket.status}</button>
                {openEdit && <div className='flex flex-col items-center bg-white rounded-md shadow-md absolute z-10'>
                    <button className='p-2 bg-slate-100 hover:bg-slate-200 rounded-md m-2 w-28' onClick={(e) => changeTicketStatus('pending', e)}>pending</button>
                    <button className='p-2 bg-slate-100 hover:bg-slate-200 rounded-md m-2 w-28' onClick={(e) => changeTicketStatus('resolved', e)}>resolved</button>
                    <button className='p-2 bg-slate-100 hover:bg-slate-200 rounded-md m-2 w-28' onClick={(e) => changeTicketStatus('new', e)}>new</button>
                    <button className='p-2 bg-slate-100 hover:bg-slate-200 rounded-md m-2 w-28' onClick={() => { setOpenEdit(false) }}>cancel</button>
                </div>}
                <button className='bg-red-300 hover:bg-red-400 text-white rounded-lg m-2 p-2 text-sm' onClick={deleteTicket}>delete</button>
            </div>
            <div className='flex justify-center items-center m-5'>
                <p className='text-xl'>{ticket.email}</p>
            </div>
            <div className='bg-slate-50 rounded-md w-full p-2 m-5 border-slate-100 border-2'>
                <p>{ticket.problem}</p>
            </div>
            <button className='bg-slate-100 hover:bg-slate-200 rounded-lg p-2 mb-4' onClick={openModal}>Respond</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className='flex flex-col items-center'>
                    <p className='text-lg'>Respond to {ticket.email}'s ticket</p>
                    <form className='flex flex-col items-center' onSubmit={respondToTicket}>
                        <label className='m-2'>Response:</label>
                        <input className='border-gray border-2 rounded-md m-2' type="text" placeholder='enter your response' onChange={(e) => setResponseInput(e.target.value)} value={responseInput} />
                        <button className='bg-cyan-200 hover:bg-cyan-300 p-2 rounded-lg m-2'>Submit</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default Ticket;
