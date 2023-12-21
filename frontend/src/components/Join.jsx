import React, { useState } from 'react';
import { Link } from 'react-router-dom';

let user;

function Join() {
    const [userinput, setUserinput] = useState("");

    const sendUser = () =>{
        user = userinput;
        setUserinput("");
    }

  return (
    <div className='flex justify-center items-center h-svh w-full'>
        <div className='h-[36vh] w-[80%] sm:w-[40%] md:w-[35%] text-center'>
            <h1 className='mt-9 mb-11 text-5xl font-semibold text-[#1c6e63]'>ChatApp</h1>
            <div className='text-2xl'>
                <input type="text" placeholder='Enter Your Name' value={userinput} className='w-full border-2 border-[#0c7c6f] text-[#167267] p-2 my-3' onChange={(e) => setUserinput(e.target.value)} required />
                <Link onClick={(e) => !user ? e.preventDefault() : null} to='/chat' > <button onClick={ sendUser } className='border-2 text-white border-[#167267] bg-[#167267] w-full py-2'>JOIN</button></Link>
            </div>
        </div>
    </div>
  )
}

export { user };
export default Join;