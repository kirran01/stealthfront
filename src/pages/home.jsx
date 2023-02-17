import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Home = ({ tickets, setTickets }) => {
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [ticketInput, setTicketInput] = useState({
        ticketEmail: '',
        ticketProblem: ''
    })
    const handleTicketInput = (e) => {
        setTicketInput({ ...ticketInput, [e.target.name]: e.target.value })
    }
    const submitTicket = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/tickets/create-ticket`, {
                problem: ticketInput.ticketProblem,
                email: ticketInput.ticketEmail,
                status: 'new'
            })
            if (res) {
                console.log(res.data, 'rd')
                setSuccessMessage(`Your ticket has been submitted 🥳 !You will receive an email once your request has been resolved.`)
                setInterval(() => {
                    setSuccessMessage('')
                }, 5000);
                setTicketInput({
                    ticketEmail: '',
                    ticketProblem: ''
                })
                setTickets([...tickets, res.data]);
            }
        } catch (err) {
            setErrorMessage(`Uh oh, something went wrong 😖 please try again later`)
            console.log(err)
        }
    }
    return (
        <div className='h-screen flex flex-col justify-evenly content-center items-center bg-cyan-50'>
            {successMessage !== '' && <div>
                <p>{successMessage}</p>
            </div>
            }
            {errorMessage !== '' && <div>
                <p>{errorMessage}</p>
            </div>
            }
            <div className='bg-white flex flex-col items-center rounded-lg drop-shadow-lg'>
                <p className='m-5'>Create a help ticket</p>
                <form className='m-5 flex flex-col items-center' onSubmit={submitTicket}>
                    <label>Email</label>
                    <input className='border-gray border-2 rounded-md m-2' type="email" onChange={handleTicketInput} value={ticketInput.ticketEmail} name="ticketEmail" />
                    <label>Issue</label>
                    <input className='border-gray border-2 rounded-md m-2' type="text" onChange={handleTicketInput} value={ticketInput.ticketProblem} name="ticketProblem" />
                    <button className='bg-cyan-800 hover:bg-cyan-700 p-2 m-5 text-white rounded-md'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
