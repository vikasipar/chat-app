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

  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', {message, id});
    document.getElementById('chatInput').value = "";
  }

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket']});

    socket.on('connect', () => {
      alert("socket connected");
      setId(socket.id);
    })

    socket.emit('joined', {user});  // sending to backend

    socket.on('welcome',(data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    socket.on('leave', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    return () => {
      socket.emit('disconnected');
      socket.off();
    }
}, []);

useEffect(() => {
  socket.on('sendMessage', (data) => {
    setMessages([...messages, data]);
    console.log(data.user, data.message, data.id);
  })
  return () => {
    socket.off();
  }
},[messages])
  
  return (
    <>
      <div>Hii {user}!</div>
      <div className='w-[50%] h-screen mx-auto border-2 border-stone-500'>
        <ReactScrollToBottom className='h-[90vh] space-y-1 overflow-y-scroll'>
          {
            messages.map((msg, i) => <Message user={msg.id === id ? '': msg.user} message={msg.message} classs={msg.id === id ? 'right' : 'left'} />)
          }
        </ReactScrollToBottom>
        <div className='bottom-0 w-[90%] mx-auto'>
          <input type='text' id='chatInput' className='border-[1px] border-black p-1 w-[83%]' />
          <button onClick={send} className='border-[1px] border-black bg-black text-white p-1'>send</button>
        </div>
      </div>
    </>
  )
}

export default Chat;