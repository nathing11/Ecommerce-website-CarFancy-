const blogController = require('../controllers/blog.controllers');

module.exports = app =>{
    app.get('/api/blog',blogController.getAllBlogs);
    app.get('/api/blog/:id',blogController.getOneBlog);
    app.post('/api/blog',blogController.createBlog);
    app.delete('/api/blog/:id',blogController.deleteBlog);
    app.put('/api/blog/:id',blogController.updateBlog);
};