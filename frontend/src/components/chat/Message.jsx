import React from 'react';

const Message = ({ user, message}) => {
    if(user){
        return(
            <div className='block text-lg border-2 bg-[#fff]/90 text-stone-950 py-1 px-5 w-[56%] float-left m-1 rounded-xl shadow-lg rounded-bl-none drop-shadow-md'>{`${user}: ${message}`}</div>
        )
    }
    else{
        return(
            <div className='block border-2 bg-[#2ce971]/90 text-stone-950 text-lg py-1 px-5  w-[56%]  float-right m-1 shadow-lg rounded-xl rounded-br-none drop-shadow-md'>{`You: ${message}`}</div>

        )
    }
}

export default Message;