const express = require('express')
const User = require('../models/userModel')
const router = express.Router();



// get all user

router.get('/',async(req,res)=>{
    const users = await User.find()
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(error=>{
        res.status(500).send(error.message || "something went wrong ")
    })
})

// get single user

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    const users = await User.findById(id)
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(error=>{
        res.status(500).send(error.message || "something went wrong ")
    })
})

// create user

router.post('/',async(req,res)=>{

    const payload = {
        name:req.body.name,
        email:req.body.email,
        gender:req.body.email,
        isActive: req.body.active
    }
    const users = await User.create(payload)
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch(error=>{
        res.status(500).send(error.message || "something went wrong ")
    })
})

// delete user

router.delete('/:id/delete',async(req,res)=>{
    const id = req.params.id;
    await User.findByIdAndDelete(id)
    .then((data)=>{
        if(!data){
            return res.status(500).send("server issue ! Try again ...")
        }
        return res.status(200).send("successfully deleted")
    })
    .catch(error=>{
        return res.status(500).send(error.message || "something went wrong ")
    })
})

// update user 

router.put('/:id/update',async(req,res)=>{
    const id = req.params.id;
    const { name , email  } = req.body
    await User.findByIdAndUpdate(id,{name:name , email: email})
    .then((data)=>{
        if(!data){
            return res.status(500).send("server issue ! Try again ...")
        }
        return res.status(200).send("successfully updated")
    })
    .catch(error=>{
        return res.status(500).send(error.message || "something went wrong ")
    })
})



module.exports = router