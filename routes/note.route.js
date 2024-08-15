const express = require("express")
const NoteModel  = require("../models/note.model")

const noteRouter = express.Router()


noteRouter.post("/create",async (req, res) => {
    console.log(req.body, req.user)
    const {title,content, status} = req.body;
    const userId = req.user._id;

    try {
        const note = new NoteModel ({
            title,
            content,
            status,
            userId
        })
        await note.save()
        res.status(201).json({msg: "Note created succsssfully"})
    } catch (error) {
        res.status(200).json({msg: "Error While Creating Error"})
    }

})

noteRouter.get("/",async (req, res) => {
    const userId = req.user._id;
    try {
        const notes = await NoteModel.find({userId})
        res.status(200).json({notes})
    } catch (error) {
        res.status(500).json({msg: "Error while fetching notes"})
        
    }
})

noteRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const noteId = req.params.id 
    const userId = req.user._id

      try {
        const note = await NoteModel.findOne({_id:noteId})
        if(note.userId.toString() == userId.toString()){
            
          await  NoteModel.findByIdAndUpdate({_id:noteId},payload)
        return   res.status(200).json({msg:"Note updated Successfully"})
        }else{
          return  res.status(401).json({msg:"Error While Updating Notes"})
        }
      } catch (error) {
        
      }

})

noteRouter.delete("/delete/:id", async (req, res) => {
    
    
    const noteId = req.params.id 
    const userId = req.user._id

      try {
        const note = await NoteModel.findOne({_id:noteId})
        if(note.userId.toString() == userId.toString()){
            
          await  NoteModel.findByIdAndDelete({_id:noteId},payload)
        return   res.status(200).json({msg:"Note Deleted Successfully"})
        }else{
          return  res.status(401).json({msg:"Unauthorized"})
        }
      } catch (error) {
        return  res.status(401).json({msg:"Error While deleting Notes"})
      }
})


module.exports = noteRouter