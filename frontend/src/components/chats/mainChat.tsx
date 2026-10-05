import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const socketurl = 'http://localhost:5000';

export default function MainChat() {
    const [myID, setMyId] = useState<string | null>("");
    const [message,setMessage] = useState<string>("");
    const [roomId,setRoomId] = useState<string>("");
    const [initiateConnection, setInitiateConnection] = useState<boolean>(false);
    const socketConnection = useRef<Socket|null>(null);
    useEffect(() => {
        if (myID) {
            
            socketConnection.current = io(socketurl, {
                auth: {
                    userid: myID
                }
            });

            const sock = socketConnection.current;

            sock.on('welcome', (data) => {
                console.log(data);
            });

            sock.on('message-received', (data)=>{
                console.log(data);
            });

        }
    }, [initiateConnection]);

    const sendMessage = ()=>{
        if(socketConnection.current){
            socketConnection.current.emit("send",{roomid:roomId, message});
        }
    }



    return (
        <>
            <div>
                <input type="text" value={myID ?? ""} onChange={(e) => setMyId(e.target.value)} placeholder="enter Your id" />
                <button type="button" onClick={() => setInitiateConnection(true)}>Connect</button>
            </div>

            <p>chat</p>
            <div>
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="enter message here" />
                <input type="text" value={roomId} onChange={(e)=>setRoomId(e.target.value)} placeholder="Enter Receiver Id" />
                <button type="button" onClick={sendMessage}>Send</button>
            </div> 
        </>
    )
}