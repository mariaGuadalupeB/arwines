const db = require("../index");
const { Model } = require("sequelize");
const User = require("./User");

const S = require("sequelize");

class Role extends Model {

}

Role.init(
	{
    role_name: {
        type: S.STRING,
        allowNull: false,
		},
	},
  { sequelize: db,
    modelName: "role", 
   }
)

Role.belongsToMany(User,{through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'})

module.exports = Role;