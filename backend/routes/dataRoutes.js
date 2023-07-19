import express from 'express'
const router = express.Router()
import {
  hostRoom,
  joinRoom,
  leaveRoom,
  getData,
  genRoom,
} from '../controllers/dataController.js'

router.route('/roomname').get(genRoom)
router.route('/host').post(hostRoom)
router.route('/join').post(joinRoom)
router.route('/leave').post(leaveRoom)
router.route('/getdata').post(getData)

export default router
