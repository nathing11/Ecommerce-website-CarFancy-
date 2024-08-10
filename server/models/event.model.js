const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    whoLikedId:String
}, { timestamps: true });
const CommentsSchema = new mongoose.Schema({
    content:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    whoLiked:[LikesSchema],
});

const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "{PATH} is required ."],
        minLength:[3, "{PATH} should be at least 3 characters ."],
        trim:true
    },
    content:{
        type:String,
        required:[true, "{PATH} is required ."],
        minLength:[5, "{PATH} should be at least 5 characters ."]
    },
    picture:{
        type:Array,
        required:[true, "{PATH} is required ."]
    },
    datetime:{
        type:Date


    },
    
    likes:{
        type:Number,
        default:0
    },
    whoLiked:[LikesSchema],
    comments:[CommentsSchema]
},{timestamps:true});

const Event = mongoose.model('events',EventSchema);
module.exports = Event;