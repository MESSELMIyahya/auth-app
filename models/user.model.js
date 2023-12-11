import m from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new m.Schema({
    username:String,
    name:{
        type:String,
        required:true,
    },
    password:String,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
})

UserSchema.pre('save', async function (next){
    try{
        this.password = await bcrypt.hash(this.password,10);
        next();
    }catch{
        next();
    }
})



const userModel = m.models.Users || m.model('Users',UserSchema);
export default userModel

