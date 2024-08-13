const Item = require('../models/item.models');
const multer = require('multer');
const path = require('path');
const pics_path = process.env.path;
const { v4: uuidv4 } = require('uuid');
module.exports.createItem = async (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'C:/Users/User/Desktop/New folder (3)/Ecommerce-website-CarFancy-/client/public/images_db');
        },

        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });

    const upload = multer({ storage: storage }).array('files', 10); // Assuming you are using an array of files

    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Assuming files array is available in req.files
        const paths = req.files.map(file => file.filename);

        try {
            const newItem = await Item.create({
                ...req.body,
                images: paths,
            });

            res.json(newItem);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
};


module.exports.getAllItems = async (req, res) => {
    try {
        const allItems = await Item.find();
        res.json(allItems);
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports.getOneItem = (req, res) => {
    Item.findById({ _id: req.params.id })
        .then(foundItem => {
            if (!foundItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(foundItem);
        })
        .catch(err => res.status(404).json(err));
};

module.exports.getMultipleItems = (req, res) => {
    // Validation: Check if itemIds is an array
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'itemIds should be an array' });
    }

    const itemIds = req.body;
console.log(itemIds)
    // Ensure all IDs are valid MongoDB ObjectIds
    if (!itemIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
        return res.status(400).json({ error: 'Invalid ObjectId in itemIds array' });
    }

    Item.find({ _id: { $in: itemIds } })
        .then(allItems => {
            // Check if all items were found
            if (allItems.length !== itemIds.length) {
                return res.status(404).json({ error: 'Some items not found' });
            }

            res.json(allItems);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports.updateItem = (req, res) => {
    Item.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedItem => {
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(updatedItem);
        })
        .catch(err => res.status(400).json(err));
};

module.exports.deleteItem = (req, res) => {
    Item.findByIdAndDelete({ _id: req.params.id })
        .then(deletedItem => {
            if (!deletedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json({ message: 'Item deleted successfully' });
        })
        .catch(err => res.status(400).json(err));
};