const User = require('./User');
const Pet = require('./Pets');
const Comment = require('./Comment');

//user associations====//
User.hasMany(Pet, {
    foreignKey: 'user_id'
});
Pet.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// User.belongsToMany(Pet, {
//     through: Vote,
//     as: 'voteed_pets',

//     foreignKey: 'user_id',
//     onDelete: 'SET NULL'
// });

// Pet.belongsToMany(User, {
//     through: Vote,
//     as: 'voted_pets',
//     foreignKey: 'pet_id',
//     onDelete: 'SET NULL'
// })

//associate to comment====//
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Pet, {
    foreignKey: 'pet_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Pet.hasMany(Comment, {
    foreignKey: 'pet_id',
    onDelete:'SET NULL'
});


module.exports = { User, Pet, Comment };