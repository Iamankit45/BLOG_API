const getTokenFromHeaders =require('../utils/getTokenFromHeader')

const isLogin=(req,res,next) => {

const token = getTokenFromHeaders(req);

if (!token) {
    return res.json({ 

        message:"there is no token attached to the header"
    })
}
else{
    next();
}


}





module.exports=isLogin;