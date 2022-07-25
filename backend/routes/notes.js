const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/User');


// Route:1  Get all the notes using Get "/api/auth/fetchallnotes" Login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes= await Notes.find({user:req.user.id});
        res.json(notes)     
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


// Route:2  Add a new Note using POST "/api/auth/addnote" Login required
router.post('/addnote',fetchuser,[
    body('title').isLength({ min: 3 }).withMessage('Enter a valid Title')
    ,body('description').isLength({min: 5}).withMessage('Description must be atleast 5 char')]
    ,async (req,res)=>{
        const {title,description,tag}=req.body
    try{
    // Finds the validate errors 
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     
     let notes= await Notes.create({title,description,tag,user:req.user.id});
    res.json(notes)
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
})


// Route:3  update an existing Note "/api/auth/updatenote" Login required
router.put('/updatenote:id',fetchuser,async(req,res)=>{
    const{title,description,tag}=req.body
  try {
    //Creating newNote object
    const newNote={}
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag}; 
    
    //Find the note to be updated and update
    let notes= await Notes.findById(req.params.id)
    if(!notes){return res.status(404).send("Not found")}
    if(notes.user.toString()!==req.user.id){
       return res.status(401).send('Not allowed')
    }
    
    notes= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(notes)
   }catch(error){
    res.status(500).send("Internal Server Error")
   }
})


// Route 4: Delete an exisiting note "api/notes/deletenote"  Login required
 router.delete('/deletenote:id',fetchuser,async (req,res)=>{
    try{
    let notes= await Notes.findById(req.params.id);
    if(!notes){return res.status(404).send('Not found')}

    //user in database doesnot match with jwt token user
    if(notes.user.toString()!==req.user.id){return res.status(401).send('Not allowed')}

    //takes only filter id to be deleted
    notes= await Notes.findByIdAndDelete(req.params.id)
    res.json({success:"Note has been delete",title:notes.title})
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
 })

module.exports=router;