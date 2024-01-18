import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext.js';
import {addNotifications,resetNotifications} from '../features/userSlice.js'
import { useDispatch } from 'react-redux';
import {Row,Col} from 'react-bootstrap'
import './Sidebar.css'

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);
  const dispatch=useDispatch();

  useEffect(() => {
    const handleNewUser = (payload) => {
      setMembers(payload);
    };

    socket.on('new-user', handleNewUser);

    // Cleanup the event listener when the component unmounts
    // return () => {
    //   socket.off('new-user', handleNewUser);
    // };
  }, [socket,setMembers]); 

  useEffect(()=>{
    if(user){
        setCurrentRoom('general');
        getRooms();
        socket.emit('join-room','general');
        socket.emit('new-user');
    }
  },[])
 
  function getRooms(){
    fetch('http://localhost:3000/rooms')
    .then(res=>res.json()).then(data=>setRooms(data))
  }

  function joinRoom(room,isPublic=true)
  {
    if(!user)
    {
      return alert('please login');
    }
    socket.emit('join-room',room);
    setCurrentRoom(room);

    if(isPublic)
    {
      setPrivateMemberMsg(null)
    }
    dispatch(resetNotifications(room));
    
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
});

  function orderIds(id1,id2)
  {
    if(id1>id2)
    {
      return id1+"-"+id2;
    }
    else
    {
      return id2+"-"+id1;
    }
  }

  function handlePrivateMemberMsg(member)
  {
      setPrivateMemberMsg(member);
      const roomId=orderIds(user._id,member._id);
      joinRoom(roomId,false)
  }




  if (!user) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h2>Available rooms:</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroup.Item key={index} onClick={()=>joinRoom(room)} active={room==currentRoom} style={{cursor:"pointer",display:'flex',justifyContent:'space-between'}} >
            {room}{currentRoom!=room &&  <span className="badge rounded-pill bg-primary">{user.newMessages[room]}</span>}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ListGroup>
        <h2>Members:</h2>
        {members.map((member) => (
          <ListGroup.Item key={member._id} style={{ cursor: "pointer" }} active={privateMemberMsg?._id == member?._id} onClick={() => handlePrivateMemberMsg(member)} disabled={member._id === user._id}>
            {/* {member.name} */}
            <Row>
              <Col xs={2} className="member-status">
                <img src={member.picture} className='member-status-img' />
                {member.status=="online"?<i className='fas fas-circle sidebar-online-status'></i>:<i className='fas fa-circo sidebar-offline-status'></i>}
              </Col>
              <Col xs={9}>
              {member.name}
                            {member._id === user?._id && " (You)"}
                            {member.status == "offline" && " (Offline)"}
              </Col>
              <Col xs={1}>
                            <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
                        </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
