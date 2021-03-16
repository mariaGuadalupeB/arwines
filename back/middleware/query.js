const Product = require('../db/models/Product');
const { Op } = require("sequelize");


const isQuery = (req, res, next) => {
    const keys = Object.keys(req.query)

    if(keys.length > 0) {
        Product.findAll({ 
            where: { 
                [keys[0]]: {
                    [Op.like]: '%'+req.query[keys[0]].toUpperCase()+'%'
                }
            } 
        })
            .then(products => res.status(200).send(products))
            .catch(next);
    } 
    else next();

}

module.exports = isQuery;