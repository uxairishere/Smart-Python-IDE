const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const UserModel = require('../models/user.model');
const nodemailer = require('nodemailer');
// require('dotenv').config();

// middleware 
const { sendMail, randString } = require('../middlewares/SendVerifyEmail')

// config multer 
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + file.originalname)
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
});

// register
router.post('/api/register', imageUpload.single('image'), async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    let profile = (req.file) ? req.file.filename : null;
    const uniqueString = randString();

    try {
        await UserModel.create({
            name: name,
            email: email,
            password: hashPassword,
            profileImg: profile,
            uniqueString
        })
        sendMail(email, uniqueString);
        res.send({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.send({ status: 'error', error: 'Dublicate email' })
    }
})

// verify user 
router.post('/verify/:uniqueString', async (req, res, next) => {
    const { uniqueString } = req.params;
    const user = await UserModel.findOne({ uniqueString: uniqueString })
    if (user) {
        user.isValid = true
        await user.save();
        try {
            const user = await UserModel.findOne({ uniqueString: uniqueString })
            const userdata = {
                name: user.name,
                email: user.email,
                profileImg: user.profileImg,
                isValid: user.isValid
            }
            return res.json({ status: 'ok', aboutuser: JSON.stringify({ userdata }) })
        } catch (err) {
            console.log(err)
        }
    } else {
        console.log("USER NOT FOUND WHILE VERIFYING")

    }
})

//login
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email })
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            const token = jwt.sign({
                name: user.name,
                email: user.email,
                profileImg: user.profileImg
            }, 'secret123')
            const userdata = {
                name: user.name,
                email: user.email,
                profileImg: user.profileImg,
                isValid: user.isValid
            }
            return res.json({ status: 'ok', user: token, aboutuser: JSON.stringify({ userdata }) })
        } else {
            return res.json({ status: 'error', user: false, error: "User not found" })
        }
    } catch (e) {
        console.log(e)
        res.json({ status: 'error', user: false })
    }
})

// get all users number 
router.post('/api/getusers', async (req,res) => {
    const total_users = await UserModel.count({})
    console.log("Total users are: " + total_users)
    res.send({status: 'ok', total_users: total_users})
})

module.exports = router;