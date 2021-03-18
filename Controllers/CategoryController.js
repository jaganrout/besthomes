const CategoryModel = require('../models/CategoryModel');
var successmessage =null;
var errormessage = null;

exports.getCreateCategory=(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){

            CategoryModel.find({isDeleted:false},function(err,category){
                res.render('category/createcategory',{
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

exports.getEditCategory=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            const categoryid = req.params.Categoryid
              CategoryModel.findById(categoryid).then(category=>{
        
        CategoryModel.find({isDeleted:false},function(err,categoryes){
            console.log(category);
            res.render('category/editcategory',{
                categorys: categoryes,
                category:category,
                successmessage : successmessage,
                errormessage : errormessage
            });
        successmessage = null;
        errormessage = null;
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

exports.getDeleteCategory=(req,res,next)=>{
    
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            const categoryid =  req.params.Categoryid;
            CategoryModel.findById(categoryid).then(category=>{
                category.isDeleted = true;
                category.deletedBy = req.session.userdetails.userid;
                category.deletedOn = new Date()
                return category.save()
            }).then(result=>{
                successmessage = "Category Deleted Successfully";
                res.redirect('/category/categoryview');
            })
            .catch(err=>
                { console.log(err)
                    
                    errormessage = err;
                     res.redirect('/category/categoryview');
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

exports.postUpdateCategory=(req,res,next)=>{
    
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            const categoryid= req.body._id;
            const categoryname = req.body.categoryname;
            const alias = req.body.alias;
            const primary = req.body.primary;
            const image = req.file.filename;
            CategoryModel.findById(categoryid).then(category=>{
                category.categoryName = categoryname;
                category.alias = alias;
                category.primary=primary;
                category.image=image;
                category.updatedBy = req.session.userdetails.userid;
                category.updatedOn = new Date()
                return category.save()
            }).then(result=>{
                successmessage = "Category Updated Successfully";
                res.redirect('/category/categoryview');
            })
            .catch(err=> 
                
                {
                    errormessage = err;
                     res.redirect('/category/categoryview');
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
exports.postCreateCategory=(req,res,next)=>{

    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            
            const categoryname = req.body.categoryname;
            const alias = req.body.alias;
            const primary = req.body.primary;
            const image = req.file.filename;
            const category = new CategoryModel({
                categoryName:categoryname,
                alias:alias,
                link:alias,
                primary:primary,
                image:image,
                createdBy:req.session.userdetails.userid,
                createdon: new Date()
            });
            category
            .save().then(result =>{
                console.log('Created category');
                successmessage = "Success";
                res.redirect('/category/createcategory');
            })
            .catch(err=>{
                console.log(err);
                errormessage = err;
                res.redirect('/category/createcategory');
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

exports.getCategoryView=  (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype=='admin'){
             CategoryModel.find({isDeleted:false},function(err,categores){           
                res.render('category/categoryview',{
                    catagories : categores,
                    successmessage : successmessage,
                    errormessage:errormessage
                });  
                successmessage = null;
                errormessage = null;
            }); 
                    
        }
    }
    else{
        res.redirect('/admin/login');
    }
}

//api api api api api api api api api api api api api api api api api 
exports.apiGetCategoryes = (req,res,next)=>{
    CategoryModel.find({isDeleted:false},function(err,cat){
        const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                categories : cat
            }
        };
        res.status(200).json(response);
    })
}
exports.apiCategoryesByParentCategoryId=(req,res,next)=>{
    const Primary = req.params.Categoryid;
    CategoryModel.find({isDeleted:false, primary: Primary},function(err,cat){
        const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                categories : cat
            }
        };
        res.send(response);
    });
}