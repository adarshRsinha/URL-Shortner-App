const express = require('express');
const path = require('path');
const URL = require('./models/user');
const {connectToMongoDB} = require('./connect');
const {restrictLoggedInUser, checkAuth} = require('./middlewares/auth');
const urlRouter = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');

const app=express();
require('dotenv').config({path: './config.env'});

const port=process.env.PORT;

connectToMongoDB(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => {
    console.log("mongoDB is Connected");
})

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url", restrictLoggedInUser, urlRouter);   //agar user login hoga to tabhi /url path ko access kar payenge
app.use("/user", userRoute);
// use res.render to load up an ejs view file
app.use("/", checkAuth, staticRoute);

app.get('/url/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate({shortId}, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        });

        if (!entry) {
            return res.status(404).send('URL not found');
        }

        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, () => {
    console.log(`Server is started at port: ${port}`)
});
