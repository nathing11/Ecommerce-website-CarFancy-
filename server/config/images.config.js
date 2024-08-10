const path = require('path');
const multer = require('multer');
require('dotenv').config({path:'../.env'});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null,'C:/Users/User/Desktop/MERN_project_final/client/public/images_db')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;