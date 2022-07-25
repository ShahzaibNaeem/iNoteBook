const jwt=require('jsonwebtoken')


const fetchuser=(req,res,next)=>{
    //get the user from jwt token 
   const token=req.header('auth-token');
   if(!token){
    res.status(401).send('Please authenticate using a valid token')
   }
   try {
    const string=jwt.verify(token,'JWT_Secret');     //returns the payload data
    req.user=string                                 //stroing payload data in request object
    next()   
   } catch (error) {
    res.status(400).send('Bad request')
   }
}

module.exports=fetchuser