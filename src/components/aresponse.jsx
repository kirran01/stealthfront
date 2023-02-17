import React from 'react';

const AResponse = ({response,responses,setResponses}) => {
    return (
        <div className='m-2 p-5 bg-white text-center w-md rounded-lg shadow-md border-slate-100 border-2'>
            <div className='flex flex-start'>
            <button className='p-1 bg-red-400 hover:bg-red-500 text-white rounded-md text-sm'>delete</button>
            </div>
            <p className='text-lg m-5'>Email</p>
            <div className='bg-slate-50 rounded-lg  border-2 p-2 max-w-md'>
                <p>franzen migas artisan poke roof party plaid gatekeep. Cliche ennui taxidermy put a bird on it. </p>
            </div>
        </div>
    );
}

export default AResponse;
