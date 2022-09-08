const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const List = new Schema({
    iteme: {
        type: String,
        maxLength: 20,
        unigue: true,
    },
    imagUrl:{
        type: String,
       
    },
    description: String,
    price: Number,

    active:{
        type:Boolean,
        default: true
    },
  
    User:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
      
    
    

});
module.exports = mongoose.model('List', List);

