const Cart_item = require("./Cart_item");
const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");
const Review = require("./Review");

// Role.belongsToMany(User,{through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'})

// User.belongsToMany(Product, {through:'favorites'})
// Product.belongsToMany(User, {through:'favorites'})

Cart.belongsTo(User, {onDelete: 'CASCADE'})
User.hasMany(Cart, {onDelete: 'CASCADE'});

Product.hasMany(Cart_item, {onDelete: 'CASCADE'})
Cart_item.belongsTo(Product, {onDelete: 'CASCADE'})

Cart.hasMany(Cart_item, {onDelete: 'CASCADE'})
Cart_item.belongsTo(Cart, {onDelete: 'CASCADE'})

Product.belongsToMany(Category, {through: 'prod_cats', onDelete: 'CASCADE'})
Category.belongsToMany(Product, {through: 'prod_cats', onDelete: 'CASCADE'})

Review.belongsTo(Product, {onDelete: 'CASCADE'})
Product.hasMany(Review, {onDelete: 'CASCADE'})

Review.belongsTo(User, {onDelete: 'CASCADE'})
User.hasMany(Review, {onDelete: 'CASCADE'})


module.exports = { Cart_item, Cart, Category, Product, User, Review }
