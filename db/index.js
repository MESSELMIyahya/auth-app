import { connect } from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export default async function connectDB(){
    try{
        await connect(process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true
        }
        );
        console.log('Database connected successfully');
    }catch(err){
        console.error('Something want wrong when connecting to the database');
    }
}