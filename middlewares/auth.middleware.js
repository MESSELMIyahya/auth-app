import userModel from '../models/user.model.js';
import jwt from "jsonwebtoken";



export default async function IsAuthenticated(req,res,next){
    try{
        const token = req.cookies.au_id;
        if(!token) return res.status(401).send('User is not authenticated');

        const user = jwt.verify(token,process.env.SECRET_KEY);
        if(!user) return res.status(401).send('User is not authenticated');

        const userData = await userModel.findOne({email:user.email})
        if(!userData) return res.status(401).send("User doesn't exist");

        req.user = user ;
        next();
    }catch(err){
        return res.status(401).send('User is not authenticated')
    }
}