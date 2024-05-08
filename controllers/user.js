const User = require("../models/user1");
const {setUser} = require("../service/auth");
const { v4: uuidv4 } = require('uuid');

async function handleCreateUserSignUp(req, res){
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");  
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;

    const user=await User.findOne({
        email,
        password,
    });

    // console.log("user:", user);

    if(!user){
        return res.render("login", {
            error: "Invalid Email or Password",
        });
    }
    
    // const sessionid = uuidv4();
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports={
    handleCreateUserSignUp,
    handleUserLogin,
}