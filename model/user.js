const mongoose = require('mongoose');
const schema = mongoose.schema;

const userSchema = new schema({
    username: string,
    googleId: string,
})

const user = mongoose.model('user', userSchema);
 module.exports = user;