const  User  = require("../db/models/User");

const checkAdmin = (req, res, next) => {    
    User.findByPk(req.params.id)
        .then(data => data.admin ? next() : res.sendStatus(401))
    }

module.exports = checkAdmin;