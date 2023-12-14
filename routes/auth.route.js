import Express from 'express'
import { Login, RefreshToken, RegisterAuth } from '../controllers/auth.controller.js'

const authRoute = Express.Router()



authRoute.post('/login',Login);
authRoute.post('/register',RegisterAuth);
authRoute.post('/newaccess',RefreshToken);




export default authRoute;

