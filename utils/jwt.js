import jwt from 'jsonwebtoken'


export function Generate_Access_Token(body){
    return jwt.sign(body,process.env.SECRET_KEY_ACC,{expiresIn:'5s'})
}


export function Generate_Refresh_Token(body){
    return jwt.sign(body,process.env.SECRET_KEY_REF,{expiresIn:'5s'})
}