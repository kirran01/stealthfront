import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';
const Ticket = ({ ticket, tickets, setTickets }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [responseInput, setResponseInput] = useState('')
    const[successMessage,setSuccessMessage]=useState('')
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
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex flex-col items-center rounded-md shadow-md max-w-md bg-white my-5 p-2'>
            <div className='flex justify-between w-full'>
                <p className='m-2 text-sm flex items-center'>{ticket.status}</p>
                <button className='bg-red-300 hover:bg-red-400 text-white rounded-lg m-2 p-2 text-sm'>delete</button>
            </div>
            <div className='flex justify-center items-center m-5'>
                <p className='text-xl'>{ticket.email}</p>
            </div>
            <div className='bg-slate-50 rounded-md w-full p-2 m-5 border-slate-100 border-2'>
                <p>{ticket.problem}</p>
            </div>
            <button className='bg-cyan-200 hover:bg-cyan-300 rounded-lg p-2 mb-4' onClick={openModal}>Respond</button>
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
