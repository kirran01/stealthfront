import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { TurnedInNotSharp } from '@mui/icons-material';

const AResponse = ({ key, response, responses, setResponses }) => {
    const deleteResponse = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/response/delete-response/${response._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                const filteredForDelete = responses.filter(r => r._id !== response._id)
                setResponses(filteredForDelete)

            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='m-5 p-5 bg-white text-center w-md rounded-lg shadow-md border-slate-100 border-2'>
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
