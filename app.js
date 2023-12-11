import Express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import IsAuthenticated from './middlewares/auth.middleware.js';
import authRoute from './routes/auth.route.js'

// env
dotenv.config();
// express app 
const app = Express();

// config
app.use(Express.json());
app.use(Express.urlencoded());
app.use(cookieParser())


//            

app.get('/',IsAuthenticated,(_,res)=>res.send("Server is running.."));


// connect to database 

connectDB();


// auth route
app.use(authRoute)


// listen to server 
app.listen(4000,()=>{
    console.log('Server running on http://localhost:4000');
})