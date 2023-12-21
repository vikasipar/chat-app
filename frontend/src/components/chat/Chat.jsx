import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import { user } from '../Join';
import Message from './Message';

const ENDPOINT = 'http://localhost:4500/';

let socket;

const Chat = () => {
  const[id, setId] = useState("");
  const[messages, setMessages] = useState([]);
  const[msgInput, setMsgInput] = useState("");

  const send = () => {
    if(msgInput.trim() !== ""){
      socket.emit('message', { message: msgInput, id});
      setMsgInput("");
    }
  }

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket']});

    socket.on('connect', () => {
      // alert("socket connected");
      setId(socket.id);
    })

    socket.emit('joined', {user});  

    // socket.on('welcome',(data) => {
    //   setMessages((preMsg) => [...preMsg, data]);
    // })

    socket.on('userJoined', (data) => {
      setMessages((preMsg) => [...preMsg, data]);
    })

    socket.on('leave', (data) => {
      setMessages((preMsg) => [...preMsg, data]);
    })

    return () => {
      socket.off();
    }
}, []);

useEffect(() => {
  socket.on('sendMessage', (data) => {
    setMessages((preMsg) => [...preMsg, data]);
  })
  return () => {
    socket.off('sendMessage');
  }
},[messages])
  
  return (
    <div className='flex h-screen bg-[#c4c1c1ef]'>
      <div className='w-full sm:w-[90%] md:w-[45%] h-full sm:h-[90vh] m-auto border-8 border-[#0c7c6f] bg-[#d6d6d6] rounded shadow-lg drop-shadow-lg'  style={{backgroundImage:'url("https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png")', backgroundSize:'contain'}}>
        <div className='w-full bg-[#0c7c6f] text-white text-xl font-semibold p-2'>Chat Room</div>
        <ReactScrollToBottom className='h-[85vh] sm:h-[75vh] overflow-y-hidden'>
          {
            messages.map((msg, i) => <Message key={i} user={msg.id === id ? '': msg.user} message={msg.message} />)
          }
        </ReactScrollToBottom>

        <div className='bottom-0 w-full text-lg font-semibold mx-0'>
          <input type='text' className='border-2 border-[#0c7c6f] p-1 w-[83%] sm:w-[83%] mx-auto' value={msgInput} onChange={(e) => setMsgInput(e.target.value)} onKeyPress={(e) => { if(e.key === 'Enter'){ send(); }}} />
          <button onClick={send} className='border-2 border-[#075e54] bg-[#0c7c6f] text-white p-1'>send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat;