const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    login_date:{
        type:String,
        require:true,
        default:'Nane'
    },
    register_date:{
        type:String,
        require:true
    },
    password_clear:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', userSchema)