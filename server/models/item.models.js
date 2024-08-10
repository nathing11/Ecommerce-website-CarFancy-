const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    whoLikedId:String
}, { timestamps: true });


const CommentaireSchema = new mongoose.Schema({
    content:{
        type:String
    },
    senderId:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0,
    },
    whoLiked:[LikesSchema]
}, { timestamps: true });

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} is required ."],
        minLength: [3, "{PATH} should be at least 3 characters."],
        trim: true,
    },
    type: {
        type: String,
        required: [true, "{PATH} is required ."]
    },
    price: {
        type: Number,
        required: [true, "{PATH} is required ."]
    },
    count: {
        type: Number,
        required: [true, "{PATH} is required ."]
    },
    rate:{
        type:Number,
        default:0
    },
    whoRated:[LikesSchema],
    description:{
        type:String,
        required:[true, "{PATH} is required ."],
        minLength: [10, "{PATH} should be at least 10 characters."],
        trim:true
    },
    comments:[CommentaireSchema],
    images:{
        type:[String],
        required:[true, "{PATH} is required ."]
    },
    colors:{
        type:Array
    },
    sizes:{
        type:Array
    },
}, { timestamps: true });

const Item = mongoose.model('items', ItemSchema);
module.exports = Item