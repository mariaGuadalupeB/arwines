
require('dotenv').config();
const helpers = require('../utils/helpers')
const {User, Cart,Cart_item} = require('../db/models')

// const User = require("../db/models/User");
// const Cart = require("../db/models/Cart");

// const TokenExpired = require("../db/models/TokenExpired") // asumiendo que este la tabla.
// import { createBlackList } from 'jwt-blacklist'; // si usamos black list jwt  // npm install jwt-blacklist

  const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; 

const userController = {}

// {
//     "user": {
//         "access_token": "SFMyNTY.NDg4NDg5NGQtY2FmYy00MzBkLThlZWYtYTNiY2E5YmZhY2Y4.R9YwrQ8kFDrQ4cuJG95c-1hwlksuvTGH6DZR7d-et34",
//         "email": "test10@example.com",
//         "id": 17,
//       
//         "type": "customer"
//     }
// }


userController.register = (req, res, next) => {
    User.create(req.body)
   .then((user) => {
       const token = user.generateToken()
       const {id,firstName,email, admin} = user.dataValues

        user.getCarts({where: {status : "active"}, include: Cart_item})
        .then(cart => {
            const {cart_items} = cart[0]
            return res.status(200).send({user: { token, id, email, firstName, admin, cart_items }}) 
        })    
    })
    .catch(next);
} 
userController.login =  (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({where: {email}})
    .then((user) => {
        if(!user || !user.validPassword(password)) return res.status(401).send("Invalid credentials")

        const token = user.generateToken()
        const {id,firstName, admin} = user.dataValues

        user.getCarts({where: {status : "active"}, include: Cart_item})
        .then(cart => {
            
            const {cart_items} = cart[0]
            return res.status(200).send({user: { token, id, email, firstName, admin, cart_items }}) 
        })    
    })
}
userController.updateUser = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(data => data ? data.update(req.body)
        .then(data =>  res.send(data) ) : res.sendStatus(404))
    .catch(next)
    }
userController.getUser = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(data => {
    if(!data) res.sendStatus(404)
    })
}
userController.deleteUser = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(data => data ? data.destroy()
        .then(() => res.status(200).send('User was deleted')) : res.sendStatus(404))
    .catch(next);    
}
userController.updateAdmin = (req, res, next) => {
        User.findByPk(req.body.userID)
        .then(data => data ? data.update(req.body)
            .then(data => res.send(data) ) : res.sendStatus(404))
        .catch(next)
}
userController.getUsersAdmin = (req, res, next) => {
    User.findAll({})
    .then(data => res.send(data))
    .catch(next) 
}    
module.exports = userController;