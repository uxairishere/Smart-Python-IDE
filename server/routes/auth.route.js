const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const AuthModel = require('../models/auth.model');

// middleware 
const { generateAccessToken } = require('../middlewares/authware');



// register
router.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        await AuthModel.create({
            name: name,
            email: email,
            password: hashPassword,
        })
        res.send({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.send({ status: 'error', error: 'Dublicate email' })
    }
});

//login
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthModel.findOne({ email: email })
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {

            const user_info = { name: user.name, email: user.email }
            const userdata = { name: user.name, email: user.email, profileImg: user.profileImg, isValid: user.isValid }

            const accessToken = generateAccessToken(user_info)
            const refreshToken = jwt.sign(user_info, process.env.REFRESH_TOKEN_SECRET)
            
            return res.json({ accessToken: accessToken, refreshToken: refreshToken, aboutuser: JSON.stringify({ userdata }) })
        } else {
            return res.json({ user: false, error: "User not found" })
        }
    } catch (e) {
        console.log(e)
        res.json({ status: 'error', user: false })
    }
})

module.exports = router;