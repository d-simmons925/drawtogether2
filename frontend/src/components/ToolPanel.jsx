import { Box, Slider, IconButton} from '@mui/material'
import {useDispatch, connect} from 'react-redux'
import {setColor, setSize, setTool} from '../slices/toolSlice'
import {useDraw} from '../hooks/useDraw'
import { MuiColorInput } from 'mui-color-input'
import {ImUndo, ImRedo} from 'react-icons/im'
import {BiSolidCircle, BiSolidPencil, BiSolidEraser, BiMove} from 'react-icons/bi'
import {BsBrushFill} from 'react-icons/bs'

const colorSX = {
  '& .MuiInputBase-root:before': {
    borderBottom: '1px solid white',
  },
  '& .MuiInputBase-root:hover': {
    '&:before': {
      borderBottom: '2px solid white',
    },
  },
  input: {
    color: '#fff'
  },
  label: {
    color: '#fff'
  }
}

const ToolPanel = (props) => {
  const {pickedColor, pickedSize, toolType} = props
  const dispatch = useDispatch()
  const {setDrawColor, setDrawSize, setDrawTool} = useDraw()

  const handleColorChange = (e) => {
    setDrawColor(e)
    dispatch(setColor(e))
  }

  const handleSizeChange = (e) => {
    setDrawSize(e)
    dispatch(setSize(e))
  }
  
  return (
    <Box className='bg-slate-900 fixed p-5 w-60 flex flex-col z-10 top-10 right-10 rounded-lg'>
      <h3 className='w-96 justify-center'>Tools</h3>
      
      <div className='flex bg-slate-700 rounded-lg my-2 p-2 w-46'>
      <Slider
        min={1}
        max={100}
        value={pickedSize}
        onChange={(e) => handleSizeChange(e.target.value)}
        className='mx-auto w-24'
      />
      <BiSolidCircle className='text-black mx-auto my-auto'/>
      </div>
      <MuiColorInput color='primary' 
                      sx={colorSX} 
                      variant='standard' 
                      value={pickedColor} 
                      onChange={e => handleColorChange(e)} 
                      className='bg-slate-700 p-2 w-46 rounded-lg my-1 mx-auto'/>
      <div className='flex'>
      <IconButton className='bg-slate-500 hover:bg-slate-600 m-1 w-10 rounded-md'>
        <BiSolidPencil className='text-white'/>
      </IconButton>
      <IconButton className='bg-slate-500 hover:bg-slate-600 m-1 w-10 rounded-md'>
        <BsBrushFill className='text-white'/>
      </IconButton>
      <IconButton className='bg-slate-500 hover:bg-slate-600 m-1 w-10 rounded-md'>
        <BiMove className='text-white'/>
      </IconButton>
      <IconButton className='bg-slate-500 hover:bg-slate-600 m-1 w-10 rounded-md'>
        <BiSolidEraser className='text-white'/>
      </IconButton>
      </div>
      <div className='flex'>
      <IconButton className='bg-slate-500 hover:bg-slate-600 m-1 w-10 rounded-md'>
        <ImUndo className='text-white'/>
      </IconButton>
      <IconButton className='bg-slate-500 hover:bg-slate-600 m-1 w-10 rounded-md'>
        <ImRedo className='text-white'/>
      </IconButton>
      </div>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    pickedColor: state.tool.pickedColor,
    pickedSize: state.tool.pickedSize,
    pickedTool: state.tool.pickedTool
  }
}

export default connect(mapStateToProps)(ToolPanel)