require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const UserRounter = require('./routes/user.route')
const CompilerRounter = require('./routes/compiler.route')
const dashboarRouter = require('./routes/dashboard.route')
const mailerRoute = require('./routes/mailer.route');
const authRoute = require('./routes/auth.route');

// configure database 
mongoose.connect('mongodb://0.0.0.0:27017/authjwt')
.then(() => [
    console.log("Database connected successfully")
])
.catch(err => {
    console.log("DB Connection Error: " + err)
})

app.use('/public' ,express.static('public'));
app.use(express.json())
app.use(cors());
app.use(express.static('public'))

// routes
app.use('/', UserRounter);
app.use('/', CompilerRounter);
app.use('/', dashboarRouter);
app.use('/', mailerRoute);
app.use('/auth', authRoute);

app.listen(process.env.PORT, () => {
    console.log("SERVER RUNNING ON PORT: " + process.env.PORT)
})