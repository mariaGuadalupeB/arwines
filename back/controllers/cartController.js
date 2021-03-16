// const Cart = require("../db/models/Cart");
// const Product = require("../db/models/Product");
// const Cart_item = require("../db/models/Cart_item");
const { Cart, Product, Cart_item } = require("../db/models");
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
  const userEmail = req.body.email;
  sendEmail(userEmail)
  res.status(200).send("email enviado")
};

cartController.setCartToPending = (req, res, next) => {
    const userTokenId = req.user.userId
    const cartItems = req.body // [{productId: id, quantity: cantidad}, {productId: id, quantity: cantidad}]

    Cart.findOne({
        where: {userId: userTokenId, status: "active"},
        include: Cart_item
    })
    .then((cart) => {
        const promises = cartItems.map(item=>{
            const {productId, quantity} = item
            return Cart_item.findOrCreate({
                where: {productId, cartId: cart.id},
                defaults: {productId, quantity, cartId: cart.id}
            })
            .then(cart_items => cart_items[0].update({quantity, cartId:cart.id}))
        })
        return Promise.all(promises).then(updatedCart=>res.status(200).send(updatedCart))
    })
}

module.exports = cartController;
