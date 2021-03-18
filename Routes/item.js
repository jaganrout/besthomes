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
const ItemController = require('../controllers/ItemController');
router.get('/item/createitem',ItemController.getCreateItem);
router.post('/item/createitem',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),ItemController.postCreateItem);
router.get('/item/viewitem',ItemController.getViewItem);
router.get('/item/deleteitem/:itemid',ItemController.getDeleteItem);
router.get('/item/edititem/:itemid',ItemController.getEditItem);
router.post('/item/updateitem', multer({storage:fileStorage,fileFilter:fileFilter}).single('image') ,ItemController.postUpdateItem);



router.get('/api/item/getitembycategoryid/:categoryid',ItemController.getItemsByCategoryId);
router.get('/api/item/getitemsbybrandid/:brandid',ItemController.getItemsByBrandId);

module.exports = router;