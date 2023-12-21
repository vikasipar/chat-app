const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const port = 4500 || process.env.PORT;

const users = [{}];

app.use(cors());

app.get('/', (req, res) => {
    res.send('Working');
})

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
    console.log('io connection');

    socket.on('joined', ({user}) => {
        users[socket.id] = user;
        console.log(`${user} has joined`);

        socket.emit('sendMessage', {user:'Admin', message:`Welcome to the chat ${users[socket.id]}`});
        
        socket.broadcast.emit('userJoined', {user:'Admin', message:`${users[socket.id]} has joined`});
    });

    socket.on('message', ({message, id}) => {
        io.emit('sendMessage', {user:users[id], message,id})
    });

    socket.on('disconnect', () => {
        if(users[socket.id]){
            socket.broadcast.emit('leave', {user:'Admin', message:`${users[socket.id]} has left`});
            console.log('user left');
            delete users[socket.id];
        }
    });

});

server.listen(port, () => {
    console.log(`server is working on ${port}`);
})

