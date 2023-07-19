import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import RoomPage from './Pages/RoomPage.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    text: {
      primary: '#fff',
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path="/" element={<HomePage />} />
      <Route path='/:roomName' element={<RoomPage/>}/>
    </Route>
  )
)

root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       <RouterProvider router={router}/>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>
)
