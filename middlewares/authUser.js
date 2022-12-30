const jwt = require('jsonwebtoken');

const authUser = (req,res,next)=>{
    try{
        const token = req.header('token');


        if(!token)
            throw new Error("Not authorized");

        const user = jwt.verify(token, process.env.JWT_SECRET);


        req.user = user;

        next()

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports = authUser