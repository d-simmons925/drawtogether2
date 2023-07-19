import express from 'express'
import path from 'path'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
import { Server } from 'socket.io'
import { socketHandler } from './util/socketHandler.js'
import dataRoutes from './routes/dataRoutes.js'

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', dataRoutes)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'frontend/dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send('Server is ready'))
}

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const onConnection = (socket) => {
  socketHandler(io, socket)
}

io.on('connection', onConnection)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
