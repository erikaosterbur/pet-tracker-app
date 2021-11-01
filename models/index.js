const Pet = require('./pet')
const User = require('./user')
const Vet = require('./vet-visit')

Pet.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Pet, {
    foreignKey: 'pet_id'
})

Pet.hasMany(Vet, {
    foreignKey: 'vet_id'
})

Vet.belongsTo(Pet, {
    foreignKey: 'pet_id'
})


module.exports = {
    Pet,
    User,
    Vet,
};