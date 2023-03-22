//

const request = require('supertest');
const app = require('../app'); 
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const blogs = require('../routes/*.js'); 

//Assertion style

expect.should();

expect.use(chaiHttp);

describe('BLOGS API ', () =>{
  //get all blogs
  describe('GET /API/blogs',()=> {
    it('It should GET All Blogs',(done) => {
      expect.request(app)
      .get('/API/blogs')
      .end((err,response) => {
        response.should.have.status(200);
        response.should.be.json;
        Object.keys(response.body).length.should.equal(4);
      done();
      console.log(err)
      })
      
    })
  })
})

