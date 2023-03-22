const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')
const body_parser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerJS = require('swagger-jsdoc')

//swagger documentation

const options = {
   definition: {
     openapi: '3.0.0',
     info: {
       title: 'My Portfolio API',
       version: '1.0.0',
       description: 'API for managing blog posts in my portfolio website',
       contact: {
         name: 'NIYOBUZIMA Theophile'
       }
     },
     servers: [
       {
         url: 'http://localhost:3000',
         url: 'https://niyobuzima-portfolio.onrender.com'
       }
     ],
     components: {
       schemas: {
         Blog: {
           type: 'object',
           properties: {
             title: { type: 'string' },
             body: { type: 'string' },
             snippet: { type: 'string' },
           },
         },
         NewBlog: {
           type: 'object',
           properties: {
             title: { type: 'string' },
             body: { type: 'string' },
             snippet: { type: 'string' },
           },
           required: ['title', 'body', 'snippet'],
         },
         BlogUpdate: {
           type: 'object',
           properties: {
             title: { type: 'string' },
             body: { type: 'string' },
             snippet: { type: 'string' },
           },
         },
       },
     },
   },
   apis: ['./routes/*.js'],
   yaml: {
    keepCstNodes: true
  }
 };
 
 console.log(options);

const specs = swaggerJS(options)

middleware
app.get('/api-docs.json', (req, res) => {
   res.setHeader('Content-Type', 'application/json');
   res.send(specs);
 });

app.use(body_parser.json())
const postRoute = require('./routes/post')

app.use('/posts', postRoute)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
//connect to mongodb

const uri = process.env.DB_CONNECTION;
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: 'TEST' })
 .then(() => {
    console.log('connected')
 })
 .catch((error) => {
    console.log(error)
 })

 //server port

app.listen(3000, () => {
    console.log('server running')
})