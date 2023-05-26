const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const AuthModel = require('../models/auth.model');

// middleware 
const { generateAccessToken, authenticateToken, generateRefreshToken } = require('../middlewares/authware');

let refreshTokens = [];

// new token 
router.post('/api/token', (req,res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) res.sendStatus(401) 
    if (!refreshTokens.includes(refreshToken)) res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403)
        const user_info = { name: user.name, email: user.email }
        const accessToken = generateAccessToken(user_info);
        const newRefreshToken = generateRefreshToken(user_info);

        refreshTokens.push(newRefreshToken);
        return res.json({accessToken: accessToken, refreshToken: newRefreshToken})
    })
})

// delete access token 
router.delete('/api/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204);
})

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

        if (isPasswordValid && user) {

            const user_info = { name: user.name, email: user.email }
            const userdata = { name: user.name, email: user.email, profileImg: user.profileImg, role: user.role }

            const accessToken = generateAccessToken(user_info)
            const refreshToken = jwt.sign(user_info, process.env.REFRESH_TOKEN_SECRET)

            refreshTokens.push(refreshToken)
            
            return res.json({ accessToken: accessToken, refreshToken: refreshToken, user: userdata  })
        } else {
            return res.json({ user: false, error: "User not found" })
        }
    } catch (e) {
        console.log(e)
        res.json({ status: 'error', user: false })
    }
})


router.post("/api/users", authenticateToken , async (req, res) => {
    if (req.user) {
        const allusers =  await AuthModel.find();
      res.status(200).json({allusers: allusers});
    } else {
      res.status(403).json("You are not allowed to delete this user!");
    }
  });

module.exports = router;