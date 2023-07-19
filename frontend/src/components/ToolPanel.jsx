import { Box, Slider, IconButton} from '@mui/material'
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

const ToolPanel = () => {
  
  return (
    <Box className='bg-slate-900 fixed p-5 w-60 flex flex-col z-10 top-10 right-10 rounded-lg'>
      <h3 className='w-96 justify-center'>Tools</h3>
      
      <div className='flex bg-slate-700 rounded-lg my-2 p-2 w-46'>
      <Slider
        min={1}
        max={300}
        className='mx-auto w-24'
      />
      <BiSolidCircle className='text-black mx-auto my-auto'/>
      </div>
      <MuiColorInput color='primary' 
                      sx={colorSX} 
                      variant='standard' 
                      // value={color} 
                      onChange={e => setColor(e)} 
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
export default ToolPanel