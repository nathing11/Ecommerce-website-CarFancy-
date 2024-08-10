const eventController = require('../controllers/event.controllers');

module.exports = app =>{
    app.get('/api/event',eventController.getAllEvents);
    app.get('/api/event/:id',eventController.getOneEvent);
    app.post('/api/event',eventController.createEvent);
    app.delete('/api/event/:id',eventController.deleteEvent);
    app.put('/api/event/:id',eventController.updateEvent);
};