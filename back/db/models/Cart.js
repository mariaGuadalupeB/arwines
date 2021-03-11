const db = require("../index");
const { Model } = require("sequelize");
const S = require("sequelize");

const Cart_item = require("./Cart_item");

class Cart extends Model {

}

Cart.init(
	{
		status: { // active, confirmed, pending, refused
			type: S.STRING,
			allowNull: false,
			defaultValue: "active",
		},
		userId: {
			type: S.INTEGER,
			allowNull: false,
		},
	},

  { sequelize: db,
    modelName: "cart", 
   }
);

Cart.hasMany(Cart_item)
Cart_item.belongsTo(Cart)


module.exports = Cart;

