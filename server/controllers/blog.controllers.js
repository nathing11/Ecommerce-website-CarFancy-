const Blog = require('../models/blog.model');
require('dotenv').config({ path: '../.env' });
const multer = require('multer');
const path = require('path');
const pics_path = process.env.path;
const { v4: uuidv4 } = require('uuid');


module.exports.createBlog = async (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'C:/Users/User/Desktop/MERN_project_final/client/public/images_db');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });
    const upload = multer({ storage: storage }).array('files', 10); 
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Assuming files array is available in req.files
        const paths = req.files.map(file => file.filename);
        try {
            const newItem = await Blog.create({
                ...req.body,
                picture: paths,
            });
            res.json(newItem);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
};
module.exports.getAllBlogs = (req, res) => {
    Blog.find()
        .then(allBlogs => res.json(allBlogs))
        .catch(err => res.status(404).json(err));
};
module.exports.getOneBlog = (req, res) => {
    Blog.findById({_id:req.params.id})
        .then(foundBlog => {
            if (!foundBlog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json(foundBlog);
        })
        .catch(err => res.status(404).json(err));
};
module.exports.updateBlog = (req, res) => {
    Blog.findByIdAndUpdate({_id:req.params.id}, req.body, { new: true,runValidators:true })
        .then(updatedBlog => {
            if (!updatedBlog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json(updatedBlog);
        })
        .catch(err => res.status(400).json(err));
};
module.exports.deleteBlog = (req, res) => {
    Blog.findOneAndDelete({ _id: req.params.id })
        .then(deletedBlog => {
            if (!deletedBlog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json({ message: 'Blog deleted successfully' });
        })
        .catch(err => res.status(400).json(err));
};