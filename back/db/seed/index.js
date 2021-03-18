const { Category, User, Product } = require("../models");
const products = require("./products");
const categories = require("./categories");
const prod_cats = require("./prod_cat")
const { findOne } = require('../models/Product');

let bulkCategories = () => Category.bulkCreate(categories).then((res) => res);

function randomCategory() {
  const cats = ["tinto", "blanco", "rosado"];
  return Math.ceil(Math.random() * cats.length);
}
let bulkProducts = () =>
  Product.bulkCreate(products).then((res) => {
    res.map((producto) => {
      producto.addCategory(randomCategory());
    });
  });

const userUno = User.create({
  firstName: `Tucan`,
  lastName: `Verde`,
  email: `tucanverde@gmail.com`,
  password: `1234`,
});
const userDos = User.create({
  firstName: `Mate`,
  lastName: `Cito`,
  email: `matecito@gmail.com`,
  password: `0123`,
});
const userTres = User.create({
  firstName: `Siempre`,
  lastName: `Vivo`,
  email: `siemprevivo@gmail.com`,
  password: `abc1`,
});

Promise.all([bulkCategories(), bulkProducts()]).then((x) => {
  Promise.all([userUno, userDos, userTres]).then(() =>
    console.log("base de datos seedeada OK")
  );
  return x;
});
