const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//Pet model
class Pet extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            pet_id: body.pet_id
        })
        .then(() => {
            return Pet.findOne({
                where: {
                    id: body.pet_id
                },
                attributes: [
                    'id',
                    'pet_url',
                    'name',
                    'specie',
                    'pet-id-number',
                    'color',
                    'gender',
                    'diet',
                    'reported-location'
                    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE pet.id = vote.pet_id)')]
                ],
                include: [
                    {
                    model: models.Comment,
                    attributes: ['id', 'comment_text', 'pet_id', 'user_id', 'created_at'],
                    include: {
                        model: models.User,
                        attributes: ['username']
                    }
                 }
                ]
            });
        });
    }
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
            allowNull: false,
            validate: {
              isURL: true
            }
        },
        specie: {
            type: DataTypes.STRING,
            allowNull: false,
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
            allowNull: false,
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
        allowNull: false,
       },
       diet: {
        type: DataTypes.STRING,
        allowNull: false,
       },
       reported_location: {
        type: DataTypes.STRING,
        allowNull: false,
       },
       petstatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'pet'
    }
);



module.exports = Pet;
