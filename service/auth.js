//Basically it gives unique id which can help to identify the user
//Using the Setfull and Stateless authentication concept
// const uniqueUserById = new Map();  //uniqueUserById-> yeh state ko maintain kar raha tha

const jwt = require('jsonwebtoken');  //this token is defined the stateless
const secret = '@#ADARSH02';

function setUser(user){
    return jwt.sign(
        {
        _id: user._id,
        email: user.email,
        },
        secret
    );
}

function getUser(token){
    if(!token) return null;
    try {        
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,
    getUser,
}