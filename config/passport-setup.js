const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const user = require('../model/user')

passport.use( 
    new googleStrategy ({
     callbackURL : '/auth/google/redirect',
    clientID : keys.google.clientID,
    clientSECRET : keys.google.cllientSecret
},(accessToken,refreshToken,profile,done) => {
 user.findOne({
    googleId: profile.id 
 }).then((currentUser) => {
if(currentUser){
    console.log(currentUser)
}else{
    new user({
        username: profile.displayName,
        googleId: profile.id
       }).save().then((newUser) => {
        console.log('new user created' + newUser)
       }).catch((error) => {
        console.log(error)
       })
    
}
 })
}
))