const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//Pet model
class Pet extends Model {
  
}
//fields and colums for pet model
Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pet_url: {
            type: DataTypes.STRING,
            validate: {
              isURL: true
            }
        },
        species: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breed: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        pet_id_number: {
            type: DataTypes.STRING,
            validate: {
                len: [8]
              }
       },
       color: {
        type: DataTypes.STRING,
        allowNull: false,
       },
       gender: {
        type: DataTypes.STRING,
       },
       age: {
           type: DataTypes.INTEGER,
           validate:{
               isInt: true,
               min: 0
           }
       },
       diet: {
        type: DataTypes.STRING,
       },
       reported_location: {
        type: DataTypes.STRING,
       },
       is_lost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
       },
       image_path: {
           type: DataTypes.STRING,
        validate:{
            len: [1]
        }
       }
    
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'pet'
    }
);



module.exports = Pet;
