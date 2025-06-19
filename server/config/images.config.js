const path = require('path');
const multer = require('multer');
require('dotenv').config({path:'../.env'});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null,'C:/Users/Lenovo/Desktop/Nouveau dossier (5)/Ecommerce-website-CarFancy-/client/public/images_db')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;