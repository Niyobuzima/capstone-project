const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: String,
    googleId: String,
})

const user = mongoose.model('user', userSchema);
 module.exports = user;