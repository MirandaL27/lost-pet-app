const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//Pet model
class Pet extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
        .then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.pet_id)')]
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
//fields and colums for post model
Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
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
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
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
