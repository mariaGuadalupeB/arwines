
require('dotenv').config();
const helpers = require('../utils/helpers')
const {User, Cart, Cart_item, Review} = require('../db/models')
const { Op } = require("sequelize");
// const User = require(`../db/models/User`);
// const Cart = require(`../db/models/Cart`);

// const TokenExpired = require(`../db/models/TokenExpired`) // asumiendo que este la tabla.
// import { createBlackList } from 'jwt-blacklist'; // si usamos black list jwt  // npm install jwt-blacklist

  const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; 

const userController = {}

userController.register = (req, res, next) => {
    const {unloggedCart_items} = req.body
    delete req.body.unloggedCart_items

    User.create(req.body)
   .then((user) => {
        const token = user.generateToken()
        const {id,firstName,email, admin} = user.dataValues

        user.getCarts({where: {status : `active`}, include: Cart_item})
        .then(async cart => {
            let cart_items = await cart[0].getCart_items({raw:true, attributes: [`productId`, `quantity`]})
            const all_items = [...cart_items, ...unloggedCart_items]

            cart_items = helpers.mergeArrayOfObjects(all_items)
            
            return res.status(200).send({user: { token, id, email, firstName, admin, cart_items }}) 
        })
    })
    .catch(next);
} 
userController.login =  (req, res, next) => {
    const { email, password, unloggedCart_items } = req.body;

    User.findOne({where: {email}})
    .then((user) => {
        if(!user || !user.validPassword(password)) return res.status(401).send(`Invalid credentials`)

        const token = user.generateToken()
        const {id,firstName, admin} = user.dataValues

        user.getCarts({where: {status : `active`}, include: Cart_item})
        .then(async cart => {
            let cart_items = await cart[0].getCart_items({raw:true, attributes: [`productId`, `quantity`]})
            const all_items = [...cart_items, ...unloggedCart_items]

            cart_items = helpers.mergeArrayOfObjects(all_items)
            
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
            .then(user => {
                if(user) {
                    const role = user.admin
                    user.update({admin: !role}).then(user => res.status(200).send(user))

                } else res.sendStatus(404)
            })
        }
    }
    else res.status(403).send('No sufficient credentials')
}

userController.getUser = (req, res, next) => {
    User.findByPk(req.params.id, {include: {model: Review, attributes: ['productId'], raw: true}})
    .then(data => {
    if(!data) res.sendStatus(404)
    else res.status(200).send(data)
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