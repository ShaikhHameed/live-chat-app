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

io.use((socket, next)=>{
    const userID = socket.handshake.auth.userid;
    if(!userID){
        return next(new Error("Invalid user"));
    }

    socket.userID = userID;
    next();
});

io.on('connection', (socket)=>{
    console.log(`${socket.userID} connected`);
    socket.join(socket.userID);
    socket.emit("welcome","Welcome to the jungle");

    socket.on('send', (data)=>{
        socket.to(data.roomid).emit("message-received", {sender:socket.userID, message:data.message});
    })
})


app.get('/', (req,res)=>{
    res.send("Hi")
});


server.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
});
 