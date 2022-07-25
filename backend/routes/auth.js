const express=require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router=express.Router();
// ----Importing Database models
const User=require('../models/User');
// -----importing Middlewares
const fetchuser = require('../middleware/fetchuser');


//Route 1: ----Creating a User using POST resquest  /api/auth/createuser   "No Login Required"
router.post('/createuser',[
 body('name').isLength({ min: 3 }).withMessage('must be at least 3 char ')
 ,body('email').isEmail().withMessage('Enter a valid email address ')
 ,body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long')]
 ,async(req, res) => {
     // Finds the validate errors 
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     } 

    //  --------------using try&catch in order on to be on safe side----------
    try{
     //Check wether the uer with this email exists already
     let success=true;
     let user= await User.findOne({email:req.body.email});
      if(user){
           success=false;
           return res.status(400).json({success,error:"Sorry a user with this email already exists"})
      }
      // --------------------Hashing using bcrypt------------------------
      const salt= await bcrypt.genSalt(10);                     //Generation of Salt using Async
      const secPass= await bcrypt.hash(req.body.password, salt) //Hashing pass and adding salt
     
      // ------------------Creating a User in Database
       user= await User.create({
          name: req.body.name,
          email:req.body.email,
          password: secPass,  
        })

      //-------------Using JWT(JSON web token) as access token to prevent unwanted access to a protected resource  
         const data={                                  //data to be use as Payload
             id:user.id
         }
         success=true;
        const authToken=jwt.sign(data,'JWT_Secret')   //asigining data and secret key
        res.json({success,authToken});                        //using ES6 feauture {authtoken:authtoken}

    } catch(error){
      res.status(500).send("Some error occurred")
    }

      })








//Route 2: ----Creating a Login using POST resquest  /api/auth/login   "No Login Required"

router.post('/login',[body('email').isEmail(),body('password').exists()],async (req,res)=>{

  // Finds the validate errors 
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const {email,password}=req.body;

  try {
    let success;
    let user=await User.findOne({email})            //"{email:email}"
    if(!user){
      success=false;
      return res.status(400).json({success,error:"Please enter correct credentials"})
    }

    const passwordCompare=bcrypt.compareSync(password,user.password);
    if(!passwordCompare){
    success=false;
      return res.status(400).json({success,error:"Please enter correct credentials"})
    }

    //-------------Using JWT(JSON web token)
    const data={
      id:user.id
    }
    success=true;
    const authToken=jwt.sign(data,'JWT_Secret')
    res.json({success,name:user.name,authToken});

  } catch (error) {
    res.status(500).send("Internal Server Error Occurred")
  }

})




//Route 3: Getloggined User details using Post /api/auth/getuser  "Login Required"

router.post('/getuser',fetchuser, async(req,res)=>{
  try {
    const userId=req.user
    let user =await User.findOne(userId).select('-password');
    res.json(user) 
  } catch (error) {
    res.status(500).send("Internal Server Error Occurred")
  }
})


module.exports=router;