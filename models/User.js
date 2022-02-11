const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { beforeCreate } = require('../config/connection');

//------------------------------ User Model
class User extends Model {
      checkPassword(loginPw) {
          return bcrypt.compareSync(loginPw, this.password);
      }
}
//------------------------------ user data 
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
        contactMethod: {
            type: DataTypes.STRING,
            allowNull: false
        },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8]
            }
          }
    },
    //----------------------------- password hashing
    {
        hooks: {
            async beforeCreate(userInfo) {
            userInfo.password = await bcrypt.hash(userInfo.password, 10);
            return userInfo;
            },

            //hash recreated password
            async beforeCreate(updatedUserInfo) {
            updatedUserInfo.password = await bcrypt.hash(updatedUserInfo.pasword, 10);
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;