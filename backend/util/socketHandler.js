import {
  startNewPath,
  addToPath,
  closeRoom
} from './data.js'

const socketHandler = (io, socket)=>{
  console.log('connected!')
  const joinRoom = (data) =>{
    const {room, user} = data
    //add user to socket.io room
    socket.join(room)
    //send to other users
    io.to(room).emit('userJoin', (user))
    //save room data to server
    // addUser(user.id, user.name, room)
  } 

  const startPath = (data) =>{
    const {size, color, userId, room} = data
    //send to other users
    socket.broadcast.to(room).emit('startPath', {size, color, userId})
    //save to server
    let pathData = {color, size, points: []}
    startNewPath(userId, room, pathData)
  }
  
  const continuePath = (data) =>{
    const {point, userId, room} = data
    //send to other users
    socket.broadcast.to(room).emit('continuePath', {point, userId})
    //save to server
    addToPath(userId, room, point)
  }

  const endPath = (data) =>{
    const {point, userId, room} = data
    //send to other users
    socket.broadcast.to(room).emit('endPath', {point, userId})
    //save to server
    addToPath(userId, room, point)
  }

  const hostCloseRoom = (data) =>{
    const {userId, roomHost, roomName} = data
    if(userId === roomHost){
      closeRoom(roomHost)
      socket.broadcast.to(roomName).emit('closeRoom')
    }
  }

  const userLeave = (data) =>{
    const {userId, roomName} = data
    socket.broadcast.to(roomName).emit('userLeaveRoom', {userId})
  }

  const disconnect = () =>{
    console.log('disconnected!')
  }

  socket.on('joinRoom', joinRoom)
  socket.on('startPath', startPath)
  socket.on('continuePath', continuePath)
  socket.on('endPath', endPath)
  socket.on('disconnect', disconnect)
  socket.on('hostCloseRoom', hostCloseRoom)
  socket.on('userLeave', userLeave)
}

export { socketHandler}