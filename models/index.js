const Pet = require('./pet')
const User = require('./user')
const Vet = require('./vet-visit')

Pet.belongsTo(User, {
    foreignKey: 'user_id'
})

Vet.belongsTo(Pet, {
    foreignKey: 'pet_id'
})

module.exports = {
    Pet,
    User,
    Vet,
};