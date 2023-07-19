import { connect, useSelector, useDispatch} from "react-redux"
import { logout } from '../slices/userSlice'
import { leaveRoom } from '../slices/roomSlice'
import { useLeaveRoomMutation } from '../slices/apiSlice'
import { Box, Button } from "@mui/material"
import {io} from 'socket.io-client'
const socket = io('http://localhost:5000')

const InfoPanel = ({users, roomName}) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  const { roomInfo } = useSelector(state => state.room)
  const [leaveRoomMutation] = useLeaveRoomMutation()

  const handleLeave = async () => {
    try {
      const res = await leaveRoomMutation({
        userId: userInfo.id,
        roomName: roomInfo.name,
      }).unwrap()
      socket.emit('userLeave', {userId: userInfo.id, roomName: roomInfo.name})
      dispatch(logout())
      dispatch(leaveRoom())
    } catch (err) {
      console.log(err)
      dispatch(logout())
      dispatch(leaveRoom())
    }
  }

  const handleCloseRoom = async () =>{
    await socket.emit('hostCloseRoom', ({userId: userInfo.id, roomHost: roomInfo.host,roomName: roomInfo.name}))
    dispatch(logout())
    dispatch(leaveRoom())
  }

  return (
    <Box className="bg-slate-900 fixed p-5 w-60 flex flex-col z-10 top-10 left-10 rounded-lg">
      <h3>{roomName}</h3>
      {userInfo?.id === roomInfo?.host 
      ? <Button variant='contained' onClick={handleCloseRoom}>Close Room</Button>
      : <Button variant='contained' onClick={handleLeave}>Leave Room</Button>}
      {
        users?.map(user =>(
        user.active && <div key={user.id}>{user.name}</div>
      ))}
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.room.roomInfo?.users,
    roomName: state.room.roomInfo?.name
  }
}

export default connect(mapStateToProps, null)(InfoPanel)