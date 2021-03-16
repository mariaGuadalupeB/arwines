const jwt = require("jsonwebtoken");
require('dotenv').config();
const { SECRET } = process.env

const authJWT = (req, res, next) => {
    //para no volver a verificar si el req.use ya habia sido seteado    
    if (req.user !== undefined) return next();
    if(!req.headers.authorization) return res.status(401).send('Unauthorized')
    
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, SECRET);

    if (data) {
        req.user = data;
        return next();
    }
};

module.exports = authJWT;