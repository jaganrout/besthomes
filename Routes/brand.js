const express = require('express');
const router = express.Router();
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
const BrandController = require('../controllers/BrandController');
router.get('/brand/createbrand',BrandController.getCreateBrand);
router.post('/brand/createbrand',multer({storage:fileStorage,fileFilter:fileFilter}).single('icon'),BrandController.postCreateBrand);
router.get('/brand/viewbrand',BrandController.getViewBrand);
router.get('/brand/deletebrand/:brandid',BrandController.getDeleteBrand);
router.get('/brand/editbrand/:brandid',BrandController.getEditBrand);
router.post('/brand/updatebrand', multer({storage:fileStorage,fileFilter:fileFilter}).single('icon') ,BrandController.postUpdateBrand);

//api
router.get('/api/getauthbrands', BrandController.getApiAuthBrand);
module.exports = router;