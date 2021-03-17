
require('dotenv').config();
const helpers = require('../utils/helpers')
const {User, Cart,Cart_item} = require('../db/models')
const { Op } = require("sequelize");
// const User = require(`../db/models/User`);
// const Cart = require(`../db/models/Cart`);

// const TokenExpired = require(`../db/models/TokenExpired`) // asumiendo que este la tabla.
// import { createBlackList } from 'jwt-blacklist'; // si usamos black list jwt  // npm install jwt-blacklist

  const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; 

const userController = {}

userController.register = (req, res, next) => {
    User.create(req.body)
   .then((user) => {
        const token = user.generateToken()
        const {id,firstName,email, admin} = user.dataValues

        user.getCarts({where: {status : `active`}, include: Cart_item})
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
        if(!user || !user.validPassword(password)) return res.status(401).send(`Invalid credentials`)

        const token = user.generateToken()
        const {id,firstName, admin} = user.dataValues

        user.getCarts({where: {status : `active`}, include: Cart_item})
        .then(cart => {
            
            const {cart_items} = cart[0]
            return res.status(200).send({user: { token, id, email, firstName, admin, cart_items }}) 
        })    
    })
}
userController.changeRole = (req, res, next) => {
    const {userId, isAdmin} = req.user
    const idToUpdate = req.params.id

    if(isAdmin) {
        if(userId === +idToUpdate) res.status(400).send('You cant modify your own role!')
        else {
            User.findByPk(idToUpdate)
<<<<<<< HEAD
            .then(user => {
                if(user) {
                    const role = user.admin
                    user.update({admin: !role}).then(user => res.status(200).send(user))

                } else res.sendStatus(404)
            })
=======
            .then(user => user ? user.update(req.body) : res.sendStatus(404))
            .then(user =>  res.status(200).send(user))
            .catch(next)
>>>>>>> 50121484624eb87467c618463c98b27b70369033
        }
    }
    else res.status(403).send('No sufficient credentials')
}

userController.getUser = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(data => {
    if(!data) res.sendStatus(404)
    })
}

userController.getAllUsers = (req, res, next) => {
    const {userId, isAdmin} = req.user
    const idToUpdate = req.params.id

    if(isAdmin) {
        User.findAll({where: 
            {id: 
                {[Op.ne]: userId}}})
        .then(data => {
            res.status(200).send(data)
        })
    }
}

userController.deleteUser = (req, res, next) => {
    console.log('hola')
    const {userId, isAdmin} = req.user
    if(isAdmin) {
        User.findByPk(req.params.id)
        .then(user => user ? user.destroy()
            .then(() => res.status(200).send('User was deleted')) : res.sendStatus(404))
        .catch(next);    
    }
}
// userController.updateAdmin = (req, res, next) => {
//         User.findByPk(req.body.userID)
//         .then(data => data ? data.update(req.body)
//             .then(data => res.send(data) ) : res.sendStatus(404))
//         .catch(next)
// }
userController.getUsersAdmin = (req, res, next) => {
    User.findAll({})
    .then(data => res.send(data))
    .catch(next) 
}    
module.exports = userController;