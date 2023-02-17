import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const AResponse = ({ key, response, responses, setResponses }) => {
    const [successMessage, setSuccessMessage] = useState('')
    console.log(response, 'response')
    const deleteResponse = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`http://localhost:3000/response/delete-response/${response._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                console.log(res.data, 'rd')
                setSuccessMessage('Deleted')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='m-2 p-5 bg-white text-center w-md rounded-lg shadow-md border-slate-100 border-2'>
            <div className='flex flex-start'>
                <button className='p-1 bg-red-400 hover:bg-red-500 text-white rounded-md text-sm' onClick={deleteResponse}>delete</button>
            </div>
            <p className='text-lg m-5'>{response.email}</p>
            <div className='bg-slate-50 rounded-lg  border-2 p-2 w-80 text-left'>
                <p>{response.response}</p>
            </div>
        </div>
    );
}

export default AResponse;
