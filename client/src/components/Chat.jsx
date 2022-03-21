import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom"

function Chat (props) {

    const [content, setContent] = useState("");
    const [messageList, setMessageList] = useState([]);

    const handleChange = (event) => {
        return (
            setContent(event.target.value)
        )
    }

    const sendMessage = async () => {
            if (content !== "") 
            {
                const messageData = {
                    room: props.room,
                    author: props.username,
                    message: content,
                    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
                }

                await props.socket.emit("sendMessage", messageData);
                setMessageList((prevData) => [...prevData, messageData]);
                setContent("");
            }
    }

    useEffect(() => {
        props.socket.on("receiveMessage", (data) => {
            setMessageList((prevData) => [...prevData, data]);
        })
    }, [props.socket]);

    return (
        <div className="chatContainer">
            <div className="chat-header">
                <h3>Connected to room {props.room}</h3>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="msg-container">
                    {messageList.map((currentMessage) => {
                        return <div> <div className={props.username === currentMessage.author ? "you msgBody" : "other msgBody"}>
                            <div className="text"><p>{currentMessage.message}</p></div>
                            <div className="meta">
                                <div>{currentMessage.author}</div>
                                <div>{currentMessage.time}</div>
                            </div>
                        </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input className="content" value={content} name="content" type="text" placeholder="type message here..." onKeyDown={(event) => {
                    event.key === "Enter" && sendMessage();}} onChange={handleChange} />
                <button className="sendButton" type="submit" onClick={sendMessage}> send </button>
            </div>
        </div>
    );
}

export default Chat