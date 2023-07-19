let users = []
let rooms = []

//host room
function createRoom(userId, username, roomName) {
  const newUser = new User(userId, username, roomName)
  const newRoom = new Room(roomName, userId)
  //push new user and room to arrays
  users.push(newUser)
  rooms.push(newRoom)

  addUser(userId, username, roomName)
  return { user: newUser, room: newRoom }
}

//join room
function roomJoin(userId, username, roomName) {
  const newUser = new User(userId, username, roomName)
  //push new user to array
  users.push(newUser)
  //get room index
  const roomIndex = rooms.findIndex(room => room.name === roomName)

  addUser(userId, username, roomName)
  return { user: newUser, room: rooms[roomIndex] }
}

//handle users leaving room
function userLeave(userId, roomName) {
  //get room index
  const roomIndex = rooms.findIndex(room => room.name === roomName)
  //set user active to false
  const userRoomIndex = rooms[roomIndex].users.findIndex(user => user.id === userId)
  rooms[roomIndex].users[userRoomIndex].active = false
}

function closeRoom(roomName) {
  //delete users in room
  users.forEach(user =>{
    if(user.room === roomName){
      const userIndex = users.findIndex(user => user.id === userId)
      users.splice(userIndex, 1)
    }
  })
  //delete room
  const roomIndex = rooms.findIndex(room => room.name === roomName)
  rooms.splice(roomIndex, 1)
}

//check if room exists
function checkRoom(roomName) {
  let roomExist = false
  rooms.forEach(room => {
    if (room.name === roomName) {
      roomExist = true
    }
  })

  return roomExist
}

//add user to room
function addUser(userId, username, roomName) {
  //get room index
  const roomIndex = rooms.findIndex(room => room.name === roomName)
  //add user to room and initialize paths array
  rooms[roomIndex].users.push({
    name: username,
    id: userId,
    paths: [],
    active: true,
  })
}

//push new path to user
function startNewPath(userId, roomName, pathData) {
  //get room index
  const roomIndex = rooms.findIndex(room => room.name === roomName)
  //get user index
  const userIndex = rooms[roomIndex].users.findIndex(user => user.id === userId)
  //push new path
  rooms[roomIndex].users[userIndex].paths.push(pathData)
}

function addToPath(userId, roomName, pointData) {
  //get room index
  const roomIndex = rooms.findIndex(room => room.name === roomName)
  //get user index
  const userRoomIndex = rooms[roomIndex].users.findIndex(user => user.id === userId)
  //get path index
  const pathIndex = rooms[roomIndex].users[userRoomIndex].paths.length - 1
  //push new point
  rooms[roomIndex].users[userRoomIndex].paths[pathIndex].points.push(pointData)
}

function getUserData(userId, roomName) {
  //get room index
  const roomIndex = rooms.findIndex(room => room.name === roomName)
  //get user index for users array
  const userIndex = users.findIndex(user => user.id === userId)
  //get user index for room array
  const userRoomIndex = rooms[roomIndex].users.findIndex(user => user.id === userId)
  //set user to active
  rooms[roomIndex].users[userRoomIndex].active = true

  const foundUser = users[userIndex]
  const foundRoom = rooms[roomIndex]

  return { user: foundUser, room: foundRoom }
}

function User(userId, name, roomName) {
  this.id = userId
  this.name = name
  this.room = roomName
}

function Room(roomName, userId) {
  this.name = roomName
  this.host = userId
  this.users = []
}

export {
  createRoom,
  roomJoin,
  userLeave,
  checkRoom,
  startNewPath,
  addToPath,
  getUserData,
  closeRoom,
}
