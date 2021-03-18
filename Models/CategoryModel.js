const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const catgorySchema = new Schema({
    categoryName:{
        type:String,
        require:true
    },
    alias:{
        type:String,
        require:true,
    },
    link:{
        type:String,
        require:true
    },
    primary:{
        type: String,
        require:true
    },
    image:{
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

module.exports =  mongoose.model('Category',catgorySchema);