import React, { useState } from "react";
import io from "socket.io-client";
import "./app.css"

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Join from "./components/Join";
 import Chat from "./components/Chat";

const socket = io.connect("https://minimal-react-chat.herokuapp.com/");

function App() {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "")
        {
            socket.emit("joinRoom", room);
            setShowChat(true);
        };
    };

    const HandleChange = (event) => {
        if (event.target.name === "name") {
            setUsername(event.target.value);
        }else {
            setRoom(event.target.value);
        }
    };

    return(
        <div>
            {!showChat ? (
            <div className="joinChatContainer">
                <div><input className="joinInput" name="name" type="text" placeholder="username" onChange={HandleChange}/></div>
                <div><input className="joinInput" name="room" type="text" placeholder="room" onChange={HandleChange}/></div>
                <div><button className="joinInput" type="submit" onClick={joinRoom}>enter room</button></div>
            </div>
            ) : (
            <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default App;