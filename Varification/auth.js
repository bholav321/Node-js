import jwt from "jsonwebtoken"
 export const verifyToken = async (req,res,next)=>{
    try{
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        jwt.verify(token,'asadlqwerqh');
        next();
    }
    catch{
        return res.status(501).json({message:"Unathorization access..."})
    }
}
