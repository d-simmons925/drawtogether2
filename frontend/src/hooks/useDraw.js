import { useEffect } from "react";
import Paper from 'paper'
import { useDispatch, useSelector } from "react-redux";
import { addUser, leaveRoom, userLeave } from "../slices/roomSlice";
import { logout } from "../slices/userSlice";
import {io} from 'socket.io-client'
const socket = io('http://localhost:5000')

let paths = {}

const startPath = (size, color, userId) =>{
  if(!paths[userId]){
    paths[userId] = []
  }
  paths[userId].push(new Paper.Path())
  paths[userId][paths[userId].length - 1].strokeColor = color
  paths[userId][paths[userId].length - 1].strokeWidth = size
  paths[userId][paths[userId].length - 1].strokeCap = 'round'
}

const continuePath = (point, userId) => {
  paths[userId][paths[userId].length - 1].add(point)
  paths[userId][paths[userId].length - 1].smooth()
}

const endPath = (point, userId) => {
  paths[userId][paths[userId].length - 1].add(point)
  paths[userId][paths[userId].length - 1].smooth()
}

//draw other users paths
socket.on('startPath', data => {
  startPath(data.size, data.color, data.userId)
})

socket.on('continuePath', data => {
  continuePath(data.point, data.userId)
})

socket.on('endPath', data => {
  endPath(data.point, data.userId)
})

export const useDraw = () =>{
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.user)
  const {roomInfo} = useSelector(state => state.room)

  useEffect(() => {

    setTimeout(() => {
      roomInfo.users.forEach(user => {
        user.paths.forEach(path => {
          startPath(path.size, path.color, user.id)
          path.points.forEach(point => {
            continuePath(new Paper.Point(point.x, point.y), user.id)
          })
        })
      })
    }, 1)

    //add user to server room
    const user = {id: userInfo.id, name: userInfo.name}
    socket.emit('joinRoom', ({room: roomInfo.name, user}))
  },[])

  const pickedSize = 10
  const pickedColor = 'black'
  
  //draw client paths
  const drawPaths = () =>{
    let cursor = new Paper.Shape.Circle(new Paper.Point(0,0), pickedSize/2)

    Paper.view.onMouseEnter = () =>{
      cursor.strokeColor = 'black'
    }

    Paper.view.onMouseMove = (e) =>{
      cursor.position = e.point
    }

    Paper.view.onMouseLeave = () =>{
      cursor.strokeColor = 'transparent'
    }

    Paper.view.onMouseDown = () =>{
      startPath(pickedSize, pickedColor, userInfo.id)
      socket.emit('startPath', ({size: pickedSize, color: pickedColor, userId: userInfo.id, room: roomInfo.name}))
    }

    Paper.view.onMouseDrag = (e) =>{
      cursor.position = e.point
      continuePath(e.point, userInfo.id)
      const pointData = {x: e.point.x, y: e.point.y}
      socket.emit('endPath', ({point: pointData, userId: userInfo.id, room: roomInfo.name}))
    }

    Paper.view.onMouseUp = (e) =>{
      endPath(e.point, userInfo.id)
      const pointData = {x: e.point.x, y: e.point.y}
      socket.emit('endPath', ({point: pointData, userId: userInfo.id, room: roomInfo.name}))
    }
  }

  const cursor = () =>{
    let cursor = null

    Paper.view.onMouseEnter = (e) =>{
      cursor = new Paper.Path.Circle(new Paper.Point(e.point), pickedSize)
      cursor.fillColor = pickedColor
    }
  }

  socket.on('userJoin', data => {
    const user = {id: data.id, name: data.name, paths: [], active: true}
    
    dispatch(addUser(user))
  })

  socket.on('userLeaveRoom', data => {
      const userId = data.userId
      dispatch(userLeave(userId))
  })

  socket.on('closeRoom', () =>{
    dispatch(leaveRoom())
    dispatch(logout())
  })

  return {drawPaths}
}