const db = require("../index");
const { Model } = require("sequelize");
const S = require("sequelize");

class Category extends Model {
}

Category.init(
	{
		name: {
			type: S.STRING,
			allowNull: false,
		},
    description: {
        type: S.STRING,
          allowNull: true,
    },
	},
  { sequelize: db,
    modelName: "category", 
   }
);



module.exports = Category;