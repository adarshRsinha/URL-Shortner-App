const express = require('express');
const {handleCreateUserSignUp, handleUserLogin} = require("../controllers/user");

const router = express.Router();

router.post("/", handleCreateUserSignUp);

router.post("/login", handleUserLogin);

module.exports = router;