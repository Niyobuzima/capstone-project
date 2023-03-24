const express = require('express')
const router = express();
const passport = require('passport')

router.get('/login', (req,res) => {
    //handle login
    res.render('login')
});

//
router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/')
})
//auth with google

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

//callback 

router.get('/google/redirect', passport.authenticate('google'),(req,res) => {
   res.redirect('/profile')
});


module.exports = router

//documentation of the codes 

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Passport-Google OAuth2 authentication
 */

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Render login page
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Render login page
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out user
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to homepage after logout
 */

/**
 * @swagger
 * /google:
 *   get:
 *     summary: Authenticate with Google
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 */

/**

/**
 * @swagger
 * /google/redirect:
 *   get:
 *     summary: Callback after Google authentication
 *     tags: 
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '302':
 *         description: Redirect to user profile page after successful authentication
 *       '401':
 *         description: Unauthorized if authentication fails or user is not authorized
 */


