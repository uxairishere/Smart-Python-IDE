const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

router.post('/api/dashboard', async (req, res) => {
    const { email, token } = req.body
    console.log("EMAIL FROM CLIENT: " + email)
    // console.log("TOKEN FROM CLIENT: " + token)

    const verify = await jwt.verify(token, 'secret123')

    if (verify) {
        const user = await UserModel.findOne({ email: email })

        if (user.accrole === 'admin') {
            const alluser = await UserModel.find({})
            // console.log(alluser)
            res.send({ dashboard: user, allusers: alluser, status: 'ok' })

        } else {
            res.send({ dashboard: user, status: 'ok' })
        }
    }
})

// change role 
router.post('/api/changerole', async (req, res) => {
    const { id, role } = req.body;
    const user = await UserModel.findById(id);
    user.accrole = role;
    user.save();
    res.send({ status: 'ok' })
})

// delete user 
router.post('/api/deleteuser', async (req, res) => {
    const { id } = req.body;
    try {
        await UserModel.findByIdAndDelete(id);
        res.send({status: 'ok'})
    } catch (e) {
        console.log('user not found')
        res.send({status: 'user not found'})
    }

})

module.exports = router