// const Cart = require("../db/models/Cart");
// const Product = require("../db/models/Product");
// const Cart_item = require("../db/models/Cart_item");
const { Cart, User, Product, Cart_item } = require("../db/models");
const sendEmail = require("../utils/sendEmail")

const { Op } = require("sequelize");


const cartController = {};

cartController.saveCart = (req, res, next) => {
  const userTokenId = req.user.userId;
  const cartItems = req.body; // [{productId: id, quantity: cantidad}, {productId: id, quantity: cantidad}]

  Cart.findOne({
    where: { userId: userTokenId, status: "active" },
    include: Cart_item,
  }).then((cart) => {
    const promises = cartItems.map((item) => {
      const { productId, quantity } = item;
      return Cart_item.findOrCreate({
        where: { productId, cartId: cart.id },
        defaults: { productId, quantity, cartId: cart.id },
      }) // [instancia, created]
        .then((cart_items) =>
          cart_items[0].update({ quantity, cartId: cart.id })
        );
    });
    return Promise.all(promises).then((updatedCart) =>
      res.status(200).send(updatedCart)
    );
  });
};

cartController.checkOutCart = (req, res, next) => {
  const userTokenId = req.user.userId;
  const {cart_items, total} = req.body; // [{productId: id, quantity: cantidad}, {productId: id, quantity: cantidad}]

  Cart.findOne({
    where: { userId: userTokenId, status: "active" },
    include: Cart_item,
  }).then((cart) => {
      if(cart) return cart.update({total, status: 'pending'})
      else throw new Error('no active cart')

  }).then(cart => {
    const promises = cart_items.map((item) => {
      const { productId, quantity } = item;
      
      return Cart_item.findOrCreate({
        where: { productId, cartId: cart.id },
        defaults: { productId, quantity, cartId: cart.id },
        include: Product
      }) // [instancia, created]
      .then((cart_item) => cart_item[0].update({ quantity, cartId: cart.id })
      )
      .then(async cart_item => {
          const product = await cart_item.getProduct()
          if(product.quantity<quantity) res.send('no hay stock suficiente')
          else {
            product.update({quantity: product.quantity-quantity})
            return cart_item
          }
        })
      })
      return Promise.all(promises)
          .then(() =>{
            User.findByPk(userTokenId)
            .then(user=>user.createCart(Cart))
            .then(data => res.send(data))
    })
  })
  .catch(err=>res.send(err.message))

};

cartController.confirmCart = (req, res, next) => {
  const {userId, isAdmin} = req.user
  const userTokenId = req.user.userId
  const {cartId} = req.params

  if(isAdmin) {
    Cart.findByPk(cartId)
    .then(cart=>cart.update({status: 'confirmed'}))
    .then(cart=>res.status(200).send('carrito confirmado'))
    }
}

cartController.rejectCart = (req, res, next) => {
  const {userId, isAdmin} = req.user
  const userTokenId = req.user.userId
  const {cartId} = req.params
  
  if(isAdmin) {
    Cart.findByPk(cartId)
    .then(cart=>cart.update({status: 'confirmed'}))
    .then(cart=>res.status(200).send('carrito confirmado'))
  }
}

module.exports = cartController;
