const express = require('express');
const app = express();
const mongoose = require('mongoose');


require('dotenv/config');

mongoose.connect(process.env.DB_CONNECT).then(function () {
    console.log("connected to db")
});

app.use(express.json());




app.get('/', function (req, res) {
    res.send("Welcome to home page");

})
//Importing routes 
const userRoute = require("./routes/auth");
const postRoute = require("./routes/post")
app.use('/api/users/', userRoute);
app.use('/api/post/', postRoute);




app.listen(3000, function (req, res) {
    console.log("Server is running")
})