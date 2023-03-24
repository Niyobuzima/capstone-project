const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const user = require('../model/user')

passport.serializeUser((user,done) => {
    done(null,user.id)
});

passport.deserializeUser((id,done) => {
    user.findById(id).then((user) => {
        done(null,user)
    })
   
});

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
    done(null,currentUser)
}else{
    new user({
        username: profile.displayName,
        googleId: profile.id
       }).save().then((newUser) => {
        console.log('new user created' + newUser)
       }).catch((error) => {
        console.log(error)
       })

    done(null,newUser)
}
 })
}
))