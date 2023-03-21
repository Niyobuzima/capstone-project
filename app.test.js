const request = require('supertest');
const app = require('./app');
const port = process.env.PORT || 3000;

let server;

beforeAll((done) => {
  server = app.listen(port, () => {
    console.log(`connected`);
    done();
  });
});

afterAll(() => {
  console.log(`disconnected`);
  server.close();
});

describe('GET /blogs', () => {
  it('should return all blogs', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /blogs/:id', () => {
  it('should return a single blog', async () => {
    const blog = await request(app).get('/posts');
    const res = await request(app).get(`/posts/${blog.body[0]._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(blog.body[0].title);
  });
});

describe('POST /blogs', () => {
  it('should create a new blog', async () => {
    const newBlog = { title: 'Test Blog', snippet: 'This is a test blog', body: 'This is the body of the test blog.' };
    const res = await request(app).post('/posts').send(newBlog);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newBlog.title);
  });
});

describe('PATCH /blogs/:id', () => {
  it('should update a blog', async () => {
    const blog = await request(app).get('/posts');
    const updatedBlog = { title: 'Updated Blog', snippet: 'This is an updated blog', body: 'This is the updated body of the blog.' };
    const res = await request(app).patch(`/posts/${blog.body[0]._id}`).send(updatedBlog);
    expect(res.status).toBe(200);
  });
});

describe('DELETE /blogs/:id', () => {
  it('should delete a blog', async () => {
    const blog = await request(app).get('/posts');
    const res = await request(app).delete(`/posts/${blog.body[0]._id}`);
    expect(res.status).toBe(200);
  });
});
