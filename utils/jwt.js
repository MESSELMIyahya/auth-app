import jwt from 'jsonwebtoken'


export function Generate_Access_Token(body){
    return jwt.sign(body,process.env.SECRET_KEY_ACC,{expiresIn:'6s'})
}

export function Generate_Refresh_Token(body){
    return jwt.sign(body,process.env.SECRET_KEY_REF,{expiresIn:'5m'})
}


export async function Verify_Access_Token (token){
   return await new Promise((resolve,reg)=>{
       jwt.verify(token,process.env.SECRET_KEY_ACC,async (err,user)=>{
           if(err){
               if(err.name == "JsonWebTokenError") reg(new Error('unauthenticated'))  ;
               else reg(err.message) ;
            }
            return resolve(user);
        });

    })
}

export async function Verify_Refresh_Token (token){
    return await new Promise((resolve,reg)=>{
        jwt.verify(token,process.env.SECRET_KEY_REF,(err,user)=>{
            if(err){
                if(err.name == "JsonWebTokenError") reg(new Error('unauthenticated'))  ;
                else reg(err.message) ;
             }
             return resolve(user);
         });
 
     })
 }