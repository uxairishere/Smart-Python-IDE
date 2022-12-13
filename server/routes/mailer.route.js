const express = require('express');
const router = express.Router();
const { sendContactMail } = require('../middlewares/SendVerifyEmail');

router.post('/api/email/contact', (req,res) => {
    const {fullname,email,subject,body} = req.body;
    try{
        sendContactMail(fullname, email, subject, body);
        console.log("CONTACT EMAIL SUCCESS")
        res.send({status: 'ok', message: 'Your message has been send to the developers'})
    }catch(e){
        console.log("ERROR WHILE SENDING MAIL TO DEV: " + e);
        res.send({status: 'error'})
    }
})

module.exports = router