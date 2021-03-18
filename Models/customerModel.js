const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CoustomerSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    emailid:{
        type: String,
        require:true
    },
    contactno:{
        type: String,
        require: true
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

module.exports =  mongoose.model('Coustomer',CoustomerSchema);