const express = require('express')
const router = express.Router()
const blogs = require('../model/blogs')
//swagger route
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all blog posts
 *     responses:
 *       200:
 *         description: Returns an array of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 */
  
//GET ALL BLOGS

//swagger for all blogs
router.get('/', async (req, res) => {
    try {
      const result = await blogs.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });

//GET SINGLE BLOG POST
/**
 * @swagger
 * /posts/{postID}:
 *   get:
 *     summary: Get a single blog post by ID
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         description: ID of the blog post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 */
router.get('/:postID', async (req,res) => {
    try {
        const results = await blogs.findById(req.params.postID);
        res.send(results);
      } catch (error) {
        console.log(error);
      }
})
  
//POST METHOD
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBlog'
 *     responses:
 *       200:
 *         description: Returns the created blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 */
router.post('/', async (req, res) => {
    try {
        const post = new blogs({
            title: req.body.title,
            snippet: req.body.snippet,
            body: req.body.body
        });
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

//UPDATE A POST
/**
 * @swagger
 * /posts/{postID}:
 *   patch:
 *     summary: Update a blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - name: postID
 *         in: path
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogUpdate'
 *     responses:
 *       200:
 *         description: The updated post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:postID', async (req,res) =>{
    try {
      const updatedPost = await blogs.updateOne(
        {_id : req.params.postID},
        {$set: {
          title: req.body.title,
          snippet: req.body.snippet,
          body: req.body.body
        }}
      );
      res.send(updatedPost);
    } catch (error) {
      res.json({ message: error });
    }
  });


  // DELETE POST 

/**
 * @swagger
 *
 * /posts/{postID}:
 *   delete:
 *     summary: Delete a blog post
 *     description: Deletes a blog post with the specified ID.
 *     parameters:
 *       - in: path
 *         name: postID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog post to delete.
 *     responses:
 *       '200':
 *         description: The deleted blog post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog post not found.
 *       '500':
 *         description: Server error.
 */
router.delete('/:postID', async (req,res) =>{
    try{
        const deletedPost = await blogs.deleteOne({_id: req.params.postID})
        res.status(200).send(deletedPost)
    }catch(error){
        res.status(500).json({ message: error });
    }
})


  

module.exports = router;