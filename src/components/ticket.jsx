import React from 'react';
import axios from 'axios';
import { useState } from 'react';
const Ticket = () => {
    return (
        <div className='flex flex-col items-center rounded-md shadow-sm max-w-md bg-white'>
            <div className='flex justify-between w-full'>
                <p className='m-2 flex items-center'>status</p>
                <button className='bg-slate-50 rounded-lg m-2 p-2'>delete</button>
            </div>
            <div className='flex justify-center items-center m-5'>
                <p className='text-xl'>email</p>
            </div>
            <div className='bg-slate-50 rounded-md max-w-md m-5'>
                <p>Intelligentsia tilde tumeric hot chicken freegan air plant subway tile typewriter bushwick tonx single-origin coffee scenester. Actually chia lumbersexual copper mug put a bird on it snackwave mustache franzen migas artisan poke roof party plaid gatekeep. Cliche ennui taxidermy put a bird on it.</p>
            </div>
        </div>
    );
}

export default Ticket;
