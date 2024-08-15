const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")

const userRouter = express.Router()


userRouter.post('/register', (req,res)=> {
    const {name, email, password, gender,age} = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if(err){
                return res.status(500).json({msg:"Internal server Error"})
            }
            const user = new UserModel ({
                 name,
                 email, 
                 password:hash,
                 gender,
                 age

            })
            await user.save()
            res.status(201).json({msg:"User Registerd Successfully"})

        })
    } catch (error) {
        res.status(500).json({
            msg: "Error while registering user"
        })
    }

})


userRouter.post('/login',async (req,res)=> {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({msg:"User Not Found"})
        }
        if(user){
            bcrypt.compare(password, user.password ,(err, result)=> {
                if(err){
                    return res.status(500).json({
                        msg: "Internal serval error"
                    })
                }
                if(result){
                    const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
                    return res.status(200).json({
                        msg: "User logged In Successfully",
                        token
                    })
                }else{
                    return res.status(401).json({
                        msg:"Invalid Creditional/password"
                    })
                }
            })
        }
    } catch (error) {
        return res.status(401).json({
            msg:"Invalid Creditional/password"
        })
        
    }

})

module.exports = userRouter