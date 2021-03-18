const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BrandSchema = new Schema({
    brandName:{
        type:String,
        require:true
    },
    icon:{
        type: String,
        require:true
    },
    isauthorised:{
        type: Boolean,
        require: true
    },
    categoryId : {
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
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

module.exports =  mongoose.model('Brand',BrandSchema);