const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Bids = new Schema({
    bidamount:{
        type:Number,
        defaultValue: 1,
    },
    User:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    List:{
        type:Schema.Types.ObjectId,
        ref:'List'
    }
    
})

module.exports = mongoose.model('Bids', Bids);
