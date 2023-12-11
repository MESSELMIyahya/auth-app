import m from "mongoose";


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
        lowercase:true,
    },
})


const userModel = m.models.Users || m.model('Users',UserSchema);
export default userModel

