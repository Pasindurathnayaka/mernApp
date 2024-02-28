// import blog controller to use its methods
const {

    getAllBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog

} = require('../controllers/blogController');

// import express module
const express = require('express');

// create router object
const router = express.Router();

// import authmiddle module
// const { requireAuth } = require('../middleware/authmiddle');

// handle GET rquest at root
router.get('/', getAllBlogs);

// handle GET rquest at "/:id" uri
router.get('/:id', getBlog);

// handle POST rquest at root
router.post('/', addBlog);

// handle PUT rquest at "/:id" uri
router.put('/:id', updateBlog);

// handle DELETE rquest at "/:id" uri
router.delete('/:id', deleteBlog);

module.exports = router;