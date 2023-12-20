const http = require('http');
const express = require('express');
const cors = require('cors');
const socket = require('socket.io');

const app = express();
const port = 4500 || process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Working');
})

const server = http.createServer(app);

const io = socket(server);

io.on("connection", () => {
    console.log('io connection');
})

server.listen(port, () => {
    console.log(`server is working on ${port}`);
})

