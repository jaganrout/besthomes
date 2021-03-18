const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/CategoryController');
var cors = require('cors');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,uuidv4()+'_'+file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}
router.get('/category/createcategory',categoryController.getCreateCategory);
router.post('/category/createcategory',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),categoryController.postCreateCategory);
router.get('/category/categoryview',categoryController.getCategoryView);
router.get('/category/editcategory/:Categoryid',categoryController.getEditCategory);
router.post('/category/updatecategory',multer({storage:fileStorage,fileFilter:fileFilter}).single('image') ,categoryController.postUpdateCategory);
router.get('/category/deletecategory/:Categoryid',categoryController.getDeleteCategory);


//api api api api api api api api api api api api api api api api api 
router.get('/api/category/getcategories', cors(),categoryController.apiGetCategoryes);
router.get('/api/category/getchildcategories/:Categoryid',categoryController.apiCategoryesByParentCategoryId);
module.exports = router;