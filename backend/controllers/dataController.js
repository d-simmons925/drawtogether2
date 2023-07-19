import expressAsyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import {
  createRoom,
  roomJoin,
  userLeave,
  checkRoom,
  getUserData,
} from '../util/data.js'

const hostRoom = expressAsyncHandler(async (req, res) => {
  const { name, roomName } = req.body
  if (checkRoom(roomName)) {
    res.status(400).json({ message: 'Room already exists' })
  } else {
    const userId = uuidv4()
    const { user, room } = createRoom(userId, name, roomName)
    res.status(200).json({ user, room })
  }
})

const joinRoom = expressAsyncHandler(async (req, res) => {
  const { name, roomName } = req.body
  if (checkRoom(roomName)) {
    const userId = uuidv4()
    const { user, room } = roomJoin(userId, name, roomName)
    res.status(200).json({ user, room })
  } else {
    res.status(400).json({ message: 'Room does not exist' })
  }
})

const leaveRoom = expressAsyncHandler(async (req, res) => {
  const { userId, roomName } = req.body
  if (checkRoom(roomName)) {
    userLeave(userId, roomName)
    res.status(200).json({message: 'left room' })
  } else {
    res.status(400).json({ message: 'Invalid data' })
  }
})

const getData = expressAsyncHandler(async (req, res) => {
  const { userId, roomName } = req.body
  if (checkRoom(roomName)) {
    const {user, room} = getUserData(userId, roomName)
    res.status(200).json({ user, room })
  } else {
    res.status(400).json({ message: 'Invalid data' })
  }
})

const genRoom = expressAsyncHandler(async (req, res) => {
  let roomName = ''
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for(let i = 0; i < 8; i++) {
    roomName += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  if(checkRoom(roomName)) {
    genRoom()
  }

  res.status(200).json({ roomName })
})



export { hostRoom, joinRoom, leaveRoom, getData, genRoom }
