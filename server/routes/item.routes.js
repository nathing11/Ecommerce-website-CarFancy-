const itemController = require("../controllers/item.controllers");
const upload = require('../config/images.config')

module.exports = app =>{
    app.get('/api/item',itemController.getAllItems);
    app.get('/api/item/:id',itemController.getOneItem);
    app.get('/api/cart',itemController.getMultipleItems);
    app.post('/api/item',itemController.createItem);
    app.delete('/api/item/:id', itemController.deleteItem);
    app.put('/api/item/:id',itemController.updateItem);
    
};
