const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const Comment = new Schema({
    comments:{
        type: String,
    },
    List:{
        type:Schema.Types.ObjectId,
        ref:'List'

    },
    User:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})


module.exports = mongoose.model('Comment', Comment);
