const express = require('express')
const router = express();
const passport = require('passport')

router.get('/login', (req,res) => {
    //handle login
    res.send('hello auth')
});

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'),(req,res) => {
   res.send('passport working')
});


module.exports = router