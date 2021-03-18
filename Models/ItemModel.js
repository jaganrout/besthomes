const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    itemName:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true
    },
    moq:{
        type: String,
        require:true
    },
    unit:{
        type: String,
        require:true
    },
    image:{
        type: String,
        require:true
    },
    brand:{
        type: String,
        require:true
    },
    category:{
        type: String,
        require:true
    },
    createdBy:{
        type:String,
        require:false
    },
    createdOn:{
        type:Date,
        require:false
    },
    updatedBy:{
        type:String,
        require:false,
    },
    updatedOn:{
        type:Date,
        require:false
    },
    isDeleted:{
        type:Boolean,
        require:false,
        default: false
    },
    deletedBy:{
        type:String,
        require:false
    },
    deletedOn:{
        type:Date,
        require:false
    }
});

module.exports =  mongoose.model('item',itemSchema);