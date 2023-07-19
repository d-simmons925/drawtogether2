import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Canvas from '../components/Canvas'
import ToolPanel from '../components/ToolPanel'
import InfoPanel from '../components/InfoPanel'

const RoomPage = () => {
  const navigate = useNavigate()
  const { roomInfo } = useSelector(state => state.room)

  useEffect(() => {
    if (!roomInfo) {
      navigate('/')
    }
  }, [navigate, roomInfo])

  return (
    <div className="room-container">
      {roomInfo && 
      <>
        <Canvas />
        <ToolPanel />
        <InfoPanel />
      </>
      }
    </div>
  )
}
export default RoomPage
