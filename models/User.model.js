const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        role: {type: String, default: 'user', enum: ['user', 'admin']}
    },
    { timestamps: true }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;