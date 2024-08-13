const Event = require('../models/event.model');
require('dotenv').config({ path: '../.env' });
const multer = require('multer');
const path = require('path');
const pics_path = process.env.path;
const { v4: uuidv4 } = require('uuid');


module.exports.createEvent = async (req, res) => {
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
            const newItem = await Event.create({
                ...req.body,
                picture: paths,
            });

            res.json(newItem);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
};

module.exports.getAllEvents = (req, res) => {
    Event.find()
        .then(allEvents => res.json(allEvents))
        .catch(err => res.status(404).json(err));
};

module.exports.getOneEvent = (req, res) => {
    Event.findById({_id:req.params.id})
        .then(foundEvent => {
            if (!foundEvent) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json(foundEvent);
        })
        .catch(err => res.status(404).json(err));
};

module.exports.updateEvent = (req, res) => {
    Event.findByIdAndUpdate({_id:req.params.id}, req.body, { new: true,runValidators:true })
        .then(updatedEvent => {
            if (!updatedEvent) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json(updatedEvent);
        })
        .catch(err => res.status(400).json(err));
};

module.exports.deleteEvent = (req, res) => {
    Event.findByIdAndDelete({_id:req.params.id})
        .then(deletedEvent => {
            if (!deletedEvent) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json({ message: 'Event deleted successfully' });
        })
        .catch(err => res.status(400).json(err));
};
