import { useEffect, useRef } from 'react'
import Paper from 'paper'
import { useDraw } from '../hooks/useDraw'

const Canvas = () => {
  const canvasRef = useRef(null)
  const {drawPaths} = useDraw()
  
  useEffect(() => {
    const canvas = canvasRef.current
    Paper.setup(canvas)
    drawPaths()
  }, [])
  
  return (
    <div className="">
      <canvas ref={canvasRef} width='3840' height='2160' className='absolute overflow-hidden hover:cursor-none'/>
    </div>
  )
}

export default Canvas