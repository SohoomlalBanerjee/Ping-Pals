const express=require('express');
const app=express();
const userRoutes=require ('./routes/userRoutes.js')
const User = require('./modules/User.js');
const Message = require('./modules/Message.js')

const rooms=['general','tech','finance','crypto','coding']

const cors=require('cors')

app.use(express.urlencoded({extended:true}))

app.use(express.json());

app.use(cors());

app.use('/users',userRoutes)

require('./connection.js')

const server=require('http').createServer(app);

const PORT=3000;
const io=require('socket.io')(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET','POST'],
    }
})

async function getLastMessagesFromRoom(room){
    let roomMessages = await Message.aggregate([
      {$match: {to: room}},
      {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
    ])
    return roomMessages;
  }
  

  function sortRoomMessagesByDate(messages){
    return messages.sort(function(a, b){
        
        if (a._id && b._id) {
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');
  
        date1 = date1[2] + date1[0] + date1[1];
        date2 = date2[2] + date2[0] + date2[1];
  
        return date1 < date2 ? -1 : 1;
      } else 
      {
        return 0;
      }
  })}

app.get('/rooms', (req, res)=> {
    res.json(rooms)
  })

io.on('connection',(socket)=>{

    socket.on('new-user',async()=>{
        const members=await User.find();
        io.emit('new-user',members);
    } )

    // socket.on('join-room',async(room)=>{
    //     socket.join(room);
    //     let RoomMessages=await getLastMessagesFromRoom(room);
    //      RoomMessages=await sortRoomMessagesByDate(RoomMessages);
    //      socket.emit('room-messages', RoomMessages);
    // });

    // socket.on('message-room',async(room,content,sender,time,date)=>{
    //     console.log(content);
    //     const newMessage=await Message.create({content,from:sender,time,date,to:room});
    //     let roomMessages=await getLastMessagesFromRoom(room);
    //     roomMessages=await sortRoomMessagesByDate(roomMessages);
    //     io.to(room).emit('room-messages');

    //     socket.broadcast.emit('notifications',room);
    // })
    socket.on('join-room', async(newRoom, previousRoom)=> {
        socket.join(newRoom);
        // socket.leave(previousRoom);
        let roomMessages = await getLastMessagesFromRoom(newRoom);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        socket.emit('room-messages', roomMessages)
      })
    
      socket.on('message-room', async(room, content, sender, time, date) => {
        const newMessage = await Message.create({content, from: sender, time, date, to: room});
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        // sending message to room
        io.to(room).emit('room-messages', roomMessages);
        socket.broadcast.emit('notifications', room)
      })
    

    app.delete('/logout',async(req,res)=>{
        try{
            const {_id,newMessages}=req.body;
            const user=await User.findById(_id)
            user.status='offline';
            user.newMessages=newMessages
            await user.save();
            const members=await User.find();
            socket.broadcast.emit('new-user',members)
            res.status(200).send();
        }
        catch(err)
        {
            console.log(e);
            res.status(400).send();
        }
    })

})
  
server.listen(PORT,()=>{
    console.log('Server running on port',PORT);
})