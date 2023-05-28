const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var fetchuser =require('../middleware/fetchuser');

const JWT_SECRET="usmanisagoodboy";

//Create a User using : Post "/api/auth/createuser". No login Requires
router.post('/createuser', [
    body('email', 'Enter a Valid email').isEmail(),
    body('name', 'Enter a Valid name').isLength({ min: 3 }),
    body('password', 'Enter a Valid password').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Check Whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({   success, error: "Sorry a user with this email already esists" })
        }
        const salt = await bcrypt.genSalt(10);
         const secPaass=await bcrypt.hash (req.body.password,salt);
        //create a user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPaass,
        });

        const data={
            user:{
                    id:user.id
            }
        }

          const authotoken= jwt.sign(data,JWT_SECRET);
          
        //   res.json({user})
        success=true;

        res.json({success, authotoken})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occureed");
    }


})


//Authenticate a User using : Post "/api/auth/login". No login Requires

router.post('/login', [
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password cant be blank').exists(),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const{email,password}=req.body;

    try {
        let user=await User.findOne({email});
        if(!user)
        {    success=false;
            return res.status(400).json({error:"Please enter correct info"});
        }

        const passwordCompare =await bcrypt.compare(password,user.password);

        if(!passwordCompare)
        {
             success=false;
            return res.status(400).json({success,error:"Please enter correct info"});
        }

        const data={
            user:{
                    id:user.id
            }
        }

        const authotoken= jwt.sign(data,JWT_SECRET);
        success=true; 
        //   res.json({user})

        res.json({ success , authotoken})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occureed");
    }

})


//Get loggdin User Details using POST "/api/auth/getuser". Login Required

router.post('/getuser',fetchuser, async (req, res) => {
    
    try {
        userId=req.user.id;
        const user =await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occureed");
    }

})
  


module.exports = router;