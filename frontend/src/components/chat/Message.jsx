import React from 'react'

const Message = ({ user, message, classs}) => {
    if(user){
        return(
            <div className='border-[1px] bg-stone-300 text-black border-stone-40 py-1 w-[60%] mr-[40%]'>{`${user}: ${message}`}</div>
        )
    }
    else{
        return(
            <div className='border-[1px] bg-stone-300 text-black border-stone-40 py-1 w-[60%] ml-[40%]'>{`You: ${message}`}</div>

        )
    }
}

export default Message