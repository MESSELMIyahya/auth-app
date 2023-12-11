import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt'
import { Generate_Access_Token } from '../utils/jwt.js';

export async function RegisterAuth(req,res){
    const {username,name,password,email} = req.body ;
    if(!username||!name||!password||!email) return res.status(400).json("body wasn't provided");
    try{
        // if user exists in db 
        const oldUser = await userModel.findOne({email}) 

        if(oldUser) return res.status(409).json("email was token");
        const userUploaded = new userModel({email,username,password,name});
        await userUploaded.save();
        // const token = jwt.sign({email,username,id:userUploaded._id},process.env.SECRET_KEY);

        // res.cookie('au_id',token,{maxAge:90000,httpOnly:true});
        return res.json({auth:true,id:userUploaded._id})
    }catch{
        return res.status(500).json("Server Problem");
    }
}


export async function Login (req,res){
    const {password,email} = req.body ;
    if(!password||!email) return res.status(400).json("body wasn't provided");
    try{

        const user = await userModel.findOne({email}) 
        if(!user)  return res.status(401).json("No user with this email");

        const passCor = await bcrypt.compare(password,user.password);

        if(!passCor) return res.status(400).json("Password not correct")
        
        const token = Generate_Access_Token({email,username:user.username,id:user._id});
       return res.cookie('au_id',token,{httpOnly:true}).json({auth:true,token,id:user._id})

    }catch(err){
        console.log(err);
      return res.status(500).json("Server Problem");
    }


}



 