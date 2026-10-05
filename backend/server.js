const port = 5000;
import express from "express";
const app = express();
import {createServer} from 'http';
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin:"*"
    }
});

io.on('connection', (socket)=>{
    socket.emit("Welcome to the jungle");
})


app.get('/', (req,res)=>{
    res.send("Hi")
});


server.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
});
 