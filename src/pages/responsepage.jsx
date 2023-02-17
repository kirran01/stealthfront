import React from 'react';
import Response from '../components/aresponse';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AResponse from '../components/aresponse';


const Responsepage = () => {
    const [responses, setResponses] = useState([])
    useEffect(() => {
        const getResponses = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/response/get-responses`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                if (res) {
                    setResponses(res.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getResponses()
    }, [])
    return (
        <div className='flex flex-col items-center bg-cyan-50 p-3'>
            <p className='text-2xl m-5'>Responses</p>
            <div>
                {
                    responses.map(response => {
                        return (
                            <AResponse key={response._id} response={responses} responses={responses} setResponses={setResponses}/>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Responsepage;
