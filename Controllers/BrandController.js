const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
var successmessage =null;
var errormessage = null;
exports.getCreateBrand=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){ 
            CategoryModel.find({isDeleted:false},function(err,category){
            res.render('brand/createbrand',{
                categorys: category,
                successmessage : successmessage,
                errormessage : errormessage
            });
            successmessage = null;
            errormessage = null;
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
exports.postCreateBrand=(req,res,next)=>{
    console.log(req.file);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
    
                const BrandName = req.body.BrandName;
                const icon = req.file.filename;
                const isauthorised = req.body.isauthorised;
                const createdBy = req.session.userdetails.userid;
                const createdOn = new Date();
                const category = req.body.category; 
                const brand = new BrandModel({
                    brandName : BrandName,
                    icon:icon,
                    isauthorised:isauthorised,
                    createdBy:createdBy,
                    createdOn:createdOn,
                    categoryId : category
                })
                brand.save().then(result=>{
                    successmessage = 'Record Submitted Successfully';
                    res.redirect('/brand/createbrand');
                })
                .catch(err=>{
                    errormessage = err;
                    res.redirect('/brand/createbrand');
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
    //view
exports.getViewBrand = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){

            BrandModel.find({isDeleted:false}, function(err,brand){
                console.log(brand);
                console.log(err);
                    res.render('brand/viewbrand',{
                        brand : brand,
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

exports.getDeleteBrand=(req,res,next)=>{
    
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            const brandid =  req.params.brandid;
            BrandModel.findById(brandid).then(brand=>{
                brand.isDeleted = true;
                brand.deletedBy = req.session.userdetails.userid;
                brand.deletedOn = new Date()
                return brand.save()
            }).then(result=>{
                successmessage = "brand Deleted Successfully";
                res.redirect('/brand/viewbrand');
            })
            .catch(err=>
                { console.log(err)
                    
                    errormessage = err;
                     res.redirect('/brand/viewbrand');
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

exports.getEditBrand=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            const brandid = req.params.brandid
              BrandModel.findById(brandid).then(brand=>{
        
        
            console.log(brand);
            res.render('brand/editbrand',{
                brand:brand,
                successmessage : successmessage,
                errormessage : errormessage
            });
                successmessage = null;
        errormessage = null;
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

exports.postUpdateBrand=(req,res,next)=>{
    
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             console.log(req.file);
            if(req.file != undefined)
            {
            const brandid= req.body.brand_id;
            const brandName = req.body.brandName;
            const icon = req.file.filename;
            const isauthorised = req.body.isauthorised;
            
            BrandModel.findById(brandid).then(brand=>{
                brand.brandName = brandName;
                brand.icon = icon;
                brand.isauthorised = isauthorised;
                brand.updatedBy = req.session.userdetails.userid;
                brand.updatedOn = new Date()
                return brand.save()
            }).then(result=>{
                successmessage = "brand Updated Successfully";
                res.redirect('/brand/viewbrand');
            })
            .catch(err=> 
                
                {
                    errormessage = err;
                     res.redirect('/brand/viewbrand');
                });
            }
            else
            {
                const brandid= req.body._id;
                const brandName = req.body.brandname;
                
                
                BrandModel.findById(brandid).then(brand=>{
                    brand.name = brandName;
                   
                    brand.updatedBy = req.session.userdetails.userid;
                    brand.updatedOn = new Date()
                    return brand.save()
                }).then(result=>{
                    successmessage = "brand Updated Successfully with file";
                    res.redirect('/brand/viewbrand');
                })
                .catch(err=> 
                    
                    {
                        errormessage = err;
                         res.redirect('/brand/viewbrand');
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

exports.getApiAuthBrand=(req,res,next)=>{
    BrandModel.find({isauthorised :'yes' , isDeleted : false}, function(err, brands){
        res.status(200).json({
            status : 'success',
            statusCode : 200,
            data : {
                brands : brands
            }
        });
    })
}