import express from 'express'
const userRouter = express.Router()
import authenticateUser from '../Middleware/authenticateUser.js'
import { 
   deleteProfile, fetchProfile, updateLocation, updateProfile 
} from '../Controllers/userController.js'



userRouter.get('/profile', authenticateUser, fetchProfile)
userRouter.patch('/profile/update', authenticateUser, updateProfile)
userRouter.delete('/profile/delete', authenticateUser, deleteProfile)
userRouter.patch('/update/location', authenticateUser, updateLocation)




export default userRouter
