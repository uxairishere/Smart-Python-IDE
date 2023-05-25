require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user
        next()
    })

}

function generateAccessToken(user){
    jwt.sign(user_info, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' } )
}

module.exports = { authenticateToken, generateAccessToken }