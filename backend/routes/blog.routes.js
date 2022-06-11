const router = require('express').Router();
const {getAllBlogs, addBlog, updateBlog, getById, deletedById, getBlogsByUserId} = require('../controllers/blog.controller');
router.get('/', getAllBlogs);
router.post('/add', addBlog);
router.put('/update/:id', updateBlog);
router.get('/:id', getById);
router.delete('/:id', deletedById);
router.get('/user/:id', getBlogsByUserId);
module.exports = router;