import userModel from '../models/user.model.js';
import { Verify_Access_Token } from '../utils/jwt.js';



export default async function IsAuthenticated(req,res,next){
    try{
        const token = req.cookies.au_id;

        if(!token) return res.status(401).send('unauthenticated');

        const user = await Verify_Access_Token(token)

        const userData = await userModel.findOne({email:user.email})
        if(!userData) return res.status(401).send("User doesn't exist");

        req.user = {email:userData.email,name:userData.name,id:userData._id} ;
        
        next();
    }catch(err){
        return res.status(401).send(err);
    }
}