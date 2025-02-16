import jwt from 'jsonwebtoken'

const auth=(req,res,next)=>{
    const authHeader=req.header('Authorization')
    if (!authHeader){
        return  res.status(401).send('Token bo\'lmaganligi uchun so\'rov raq etildi')
    }
    const tokenSplit=authHeader.split(' ')
    const token=tokenSplit[0]==='Bearer' && tokenSplit[1]

    if (!token){
        return  res.status(401).send('Token bo\'lmaganligi uchun so\'rov raq etildi')
    }

    try{
        req.user=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        next()
    }catch (err){
        console.error(err)
        res.status(400).send('Token yaroqli emas')
    }

}

export {auth}

