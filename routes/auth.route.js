import Express from 'express'
import { Login, RegisterAuth } from '../controllers/auth.controller.js'

const authRoute = Express.Router()



authRoute.post('/login',Login);
authRoute.post('/register',RegisterAuth);




export default authRoute;

