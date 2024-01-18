import React,{useState,useRef, useEffect} from 'react'
import { Form, Row, Col, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './MessageForm.css'
import { useSelector } from "react-redux";
import {AppContext} from '../context/appContext.js'
import { useContext } from 'react';

export default function MessageForm() {

  const [message,setMessage]=useState("");
  const user=useSelector((state)=>state.user);
  const {socket, currentRoom, setMessages, messages, privateMemberMsg}=useContext(AppContext);
  const messageEndRef=useRef(null)

  useEffect(()=>{
    scrollToBottom()
  },[messages])


  function scrollToBottom()
  {
    messageEndRef.current?.scrollIntoView({behaviour:'smooth'})
  }

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
}

  const todayDate=getFormattedDate();

  socket.off('room-messages').on('room-messages',(roomMessages)=>{
    console.log(roomMessages);
    setMessages(roomMessages);
  })

  function handleSend(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
}
  
console.log(messages)

  return (
    <div>
      <div className="messages-output">
        {
          !user &&
          (<div className='alert alert-danger'>
            <h2>Please login.</h2>
          </div>)
        }
        
          {user &&
            messages.map(({ _id: date, messagesByDate }, idx) => (
                <div key={idx}>
                    <p className="alert alert-info text-center message-date-indicator">{date}</p>
                    {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                        <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIdx}>
                            <div className="message-inner">
                                <div className="d-flex align-items-center mb-3">
                                    <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} />
                                    <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                                </div>
                                <p className="message-content">{content}</p>
                                <p className="message-timestamp-left">{time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div ref={messageEndRef}/> 
      </div>
        <Form onSubmit={handleSend}>
          <Row>
            <Col md={11}>
              <Form.Group>
                <Form.Control type="text" disabled={!user} placeholder="Your message" onChange={(e)=>setMessage(e.target.value)} value={message}/>;
              </Form.Group>
            </Col>
            <Col md={1}>
              <Button disabled={!user} variant="primary" type="submit" style={{ width: '100%', backgroundColor: "Blue" }}>
                <i className='fas fa-paper-plane'></i>
              </Button>
            </Col>
          </Row>
        </Form>
      
    </div>
  )
}
