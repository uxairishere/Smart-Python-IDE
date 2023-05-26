require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) {
            return res.status(403).json("Token is not valid!");
          }
    
          req.user = user;
          next();
        });
      } else {
        res.status(401).json("You are not authenticated!");
      }
}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' } )
}

const generateRefreshToken = (user) => {
    return jwt.sign(user , process.env.REFRESH_TOKEN_SECRET);
  };

module.exports = { authenticateToken, generateAccessToken, generateRefreshToken }