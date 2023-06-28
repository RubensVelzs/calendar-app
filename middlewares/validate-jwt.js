
const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT=(req, res=response, next)=>{
    //Leer token en os headers
    const token = req.header('x-token');

    //check if there is a token
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'There is not token'
        });
    }

    //the token is verify
    try {

        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        req.uid = uid,
        req.name = name
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Invalid token'
        })
    }
    next();
}


module.exports={
    validateJWT
}