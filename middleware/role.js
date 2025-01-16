import jwt from "jsonwebtoken";

const admin=(req,res,next)=>{
    const authHeader=req.header('Authorization')

    const tokenSplit=authHeader.split(' ')
    const token=tokenSplit[0]==='Bearer' && tokenSplit[1]



        const role=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
    if (role.role!=='admin'){
        return res.status(401).send("Sizni kirishingizga huquqingiz yo'q")
    }
    next()



}

export {admin}