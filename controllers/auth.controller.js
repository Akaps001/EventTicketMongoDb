const { User } = require("../Models/user.model");
const dotenv = require ("dotenv");
dotenv.config();
const signUpUser = async(req,res) =>{
try {
    let user = new User(req.body);
    await user.save();
    res.status(201).json({
        message:"sign up successfully",
        data:{
            _id:user.id,
            fullname:user.fullname,
            userName:user.username,
            email:user.email,
            phonenumber:user.phonenumber,
        },
        token,
    })
} catch (error) {
    console.log(error)
    res.status(500).json({message:"server error"})
}
}

async function authenticateUser(eamil,password){
    
}
module.exports = {signUpUser}