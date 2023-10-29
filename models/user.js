const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    passwordHash: {type: String, required: true},
    
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User