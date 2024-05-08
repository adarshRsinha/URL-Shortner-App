//I have to take the value of this cookie in the middleware, I have to see who is the user
const {getUser} = require('../service/auth');

async function restrictLoggedInUser(req, res, next){
    //Using the statefull concept
    const userid = req.cookies?.uid;

    if(!userid) return res.redirect('/login');
    const user = getUser(userid);

    if(!user) return res.redirect('./login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const userid = req.cookies?.uid;

    const user = getUser(userid);

    req.user = user;
    next();
}

module.exports = {
    restrictLoggedInUser,
    checkAuth,
}