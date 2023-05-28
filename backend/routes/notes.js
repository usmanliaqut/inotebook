const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Get All the Notes using: Get "/api/notes/fetchnotes" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id });

    res.json(notes)
})



//Add a new Notes using: post "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter title'),
    body('description', 'Enter a descrption'),
    body('tag', 'Enter a descrption'),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes(
            {
                title, description, tag, user: req.user.id
            }
        )
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occureed");
    }

})



//update an existing Notes using: put "/api/notes/updatenote" login  required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
        newNote.title = title
    }
    if (description) {
        newNote.description = description
    }
    if (tag) {
        newNote.tag = tag
    }



    //Find the note to be find for update

    let note=await Notes.findById(req.params.id);
    if(!note)
    {
        res.status(400).json({error:"not found"});
    }


    //check login user is changing his own notes

    if(note.user.toString() !== req.user.id )
    {
        res.status(401).json({error:"not allowed"});
    }

     
    ///now update the notes with notes id
    note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

    res.json({note})
})

//Delete an existing Notes using: Delete "/api/notes/deletenote" login  required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

  
  try {

    //Find the note to be find for delete
    let note=await Notes.findById(req.params.id);
    if(!note)
    {
        res.status(400).json({error:"not found"});
    }


    //check login user is changing his own notes

    if(note.user.toString() !== req.user.id )
    {
        res.status(401).json({error:"not allowed"});
    }

     
    ///now update the notes with notes id
    note =await Notes.findByIdAndDelete(req.params.id)

    res.json("success");
  } catch (error) {
    res.status(400).json({error:"not found"});
  }
  
   


    

   
})

module.exports = router;