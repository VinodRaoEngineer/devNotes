const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");

const auth =async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({
            msg:"Token Not Found"
        })
    }
 const token = req.headers.authorization.split(" ")[1]
 if(!token){
    return res.status(401).json({msg: "Token not found"})

 }
 try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(!decoded){
        return res.status(401).json({msg:"Invalid Token Please Login ageain"})
    }
    const user =await UserModel.findById(decoded.id)
    req.user = user;
    next()
 } catch (error) {
    res.status(401).json({msg: "Invalid Token"})
 }
}

module.exports = auth