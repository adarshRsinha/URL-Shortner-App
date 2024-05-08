const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();
const URL = require('../models/user');

async function handleGenerateShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({status: 'url is required'});
    const uidStamp = uid.stamp(10);
    await URL.create({
        shortId: uidStamp,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    // return res.json({id: uidStamp});
    return res.render('home', {
        id: uidStamp,
    })
}

module.exports={
    handleGenerateShortUrl,
}