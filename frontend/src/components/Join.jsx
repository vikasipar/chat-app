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
    <div className='flex justify-center items-center h-screen w-full'>
        <div className='h-[36vh] w-[40vw] text-center'>
            <h1 className='mt-9 mb-11 text-3xl'>ChatApp</h1>
            <div>
                <input type="text" placeholder='Enter Your Name' value={userinput} className='w-full border-2 border-black p-1 my-3' onChange={(e) => setUserinput(e.target.value)} required />
                <Link onClick={(e) => !user ? e.preventDefault() : null} to='/chat' > <button onClick={ sendUser } className='border-2 text-white border-black bg-black w-full py-1'>JOIN</button></Link>
            </div>
        </div>
    </div>
  )
}

export { user };
export default Join;