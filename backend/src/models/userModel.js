const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    phone: String,
    country: String,
    state: String,
    street: String,
    address: String,
    wallet_address: { type: String, unique: true },
    is_admin: { type: Boolean, default: false },
    is_collector: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    password: String,
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);