const ItemModel = require('../models/ItemModel');
const BrandModel = require('../models/BrandModel');
const categoryModel = require('../models/CategoryModel');
var successmessage =null;
var errormessage = null;
exports.getCreateItem=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
        BrandModel.find({isDeleted:false},function(err,brand){
            categoryModel.find({isDeleted:false},function(err,category){

                    res.render('item/createitem',{
                    brands:brand,
                    categorys:category,
                    successmessage : successmessage,
                    errormessage : errormessage
                });
                successmessage = null;
                errormessage = null
            });
    });
    }
else{
    res.redirect('/admin/login');
}
}
else{
res.redirect('/admin/login');
}
}

exports.postCreateItem=(req,res,next)=>{
    console.log(req.file);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
    
                const itemName = req.body.itemName;
                const description = req.body.description;
                const price = req.body.price;
                const moq = req.body.moq;
                const unit = req.body.unit;
                const image = req.file.filename;
                const brand = req.body.brand;
                const category = req.body.category;
                const createdBy = req.session.userdetails.userid;
                const createdOn = new Date();
                const item = new ItemModel({
                    itemName : itemName,
                    description:description,
                    price:price,
                    moq:moq,
                    unit:unit,
                    image:image,
                    brand:brand,
                    category:category,
                    createdBy:createdBy,
                    createdOn:createdOn
                })
                item.save().then(result=>{
                    successmessage = 'Record Submitted Successfully';
                    res.redirect('/item/createitem');
                })
                .catch(err=>{
                    errormessage = err;
                    res.redirect('/item/createitem');
                })
            }
            else{
               res.redirect('/admin/login');
           }
       }
       else{
           res.redirect('/admin/login');
       }
    }

    exports.getViewItem = (req,res,next)=>{
        if(req.session.userdetails!=null|| req.session.userdetails != undefined)
        {
             if(req.session.userdetails.usertype == 'admin'){
    
                ItemModel.find({isDeleted:false}, function(err,item){
                    console.log(item);
                    console.log(err);
                        res.render('item/viewitem',{
                            items : item,
                            successmessage : successmessage,
                            errormessage: errormessage
                        });
                        successmessage = null;
                        errormessage = null;
                })
            }
            else{
               res.redirect('/admin/login');
           }
       }
       else{
           res.redirect('/admin/login');
       }
    }

    exports.getDeleteItem=(req,res,next)=>{
    
        if(req.session.userdetails!=null|| req.session.userdetails != undefined)
        {
             if(req.session.userdetails.usertype == 'admin'){
                const itemid =  req.params.itemid;
                ItemModel.findById(itemid).then(item=>{
                    item.isDeleted = true;
                    item.deletedBy = req.session.userdetails.userid;
                    item.deletedOn = new Date()
                    return item.save()
                }).then(result=>{
                    successmessage = "brand Deleted Successfully";
                    res.redirect('/item/viewitem');
                })
                .catch(err=>
                    { console.log(err)
                        
                        errormessage = err;
                         res.redirect('/item/viewitem');
                    });
    
             }
            else{
                res.redirect('/admin/login');
            }
        }
        else{
            res.redirect('/admin/login');
        }
    }

    exports.getEditItem=(req,res,next)=>{
        if(req.session.userdetails!=null|| req.session.userdetails != undefined)
        {
             if(req.session.userdetails.usertype == 'admin'){
                const itemid = req.params.itemid
                  ItemModel.findById(itemid).then(item=>{
                    const brandid = req.params.brandid
                      BrandModel.findById(brandid).then(brand=>{
                        const categoryid = req.params.categoryid
                          categoryModel.findById(categoryid).then(category=>{
            
            
                console.log(item);
                res.render('item/edititem',{
                    item:item,
                    brands:brand,
                    categorys:category,
                    successmessage : successmessage,
                    errormessage : errormessage
                });
                    successmessage = null;
            errormessage = null;
                 });
                 });
                 });
            }
            else{
                res.redirect('/admin/login');
            }
        }
        else{
            res.redirect('/admin/login');
        }
    }

    exports.postUpdateItem=(req,res,next)=>{
    
        if(req.session.userdetails!=null|| req.session.userdetails != undefined)
        {
             if(req.session.userdetails.usertype == 'admin'){
                 console.log(req.file);
                if(req.file != undefined)
                {
                const itemid= req.body.item_id;
                const itemName = req.body.itemName;
                const description = req.body.description;
                const price = req.body.price;
                const moq = req.body.moq;
                const unit = req.body.unit;
                const image = req.file.filename;
                const brand = req.body.brand;
                const category = req.body.category;
                
                ItemModel.findById(itemid).then(item=>{
                    item.itemName = itemName;
                    item.description = description;
                    item.price = price;
                    item.moq = moq;
                    item.unit = unit;
                    item.image = image;
                    item.brand = brand;
                    item.category = category;
                    item.updatedBy = req.session.userdetails.userid;
                    item.updatedOn = new Date()
                    return item.save()
                }).then(result=>{
                    successmessage = "item Updated Successfully";
                    res.redirect('/item/viewitem');
                })
                .catch(err=> 
                    
                    {
                        errormessage = err;
                         res.redirect('/item/viewitem');
                    });
                }
                else
                {
                    const itemid= req.body._id;
                    const itemName = req.body.itemName;
                    
                    
                    ItemModel.findById(itemid).then(item=>{
                        item.name = itemName;
                       
                        item.updatedBy = req.session.userdetails.userid;
                        item.updatedOn = new Date()
                        return item.save()
                    }).then(result=>{
                        successmessage = "item Updated Successfully with file";
                        res.redirect('/item/viewitem');
                    })
                    .catch(err=> 
                        
                        {
                            errormessage = err;
                             res.redirect('/item/viewitem');
                        });    
                }
            }
            else{
                res.redirect('/admin/login');
            }
        }
        else{
            res.redirect('/admin/login');
        }
    }
    
    exports.getItemsByCategoryId = (req,res,next)=>{
        ItemModel.find({category:req.params.categoryid, isDeleted:false},function(err,items){
            res.status(200).json({
                status : 'success',
                statusCode : '200',
                data : {
                    items : items
                }
            });
        })
    }

    exports.getItemsByBrandId = (req,res,next)=>{
        ItemModel.find({brand:req.params.brandid, isDeleted:false},function(err,items){
            res.status(200).json({
                status : 'success',
                statusCode : '200',
                data : {
                    items : items
                }
            });
        })
    }