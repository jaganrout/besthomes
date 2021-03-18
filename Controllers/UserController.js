const UserModel = require('../models/UserModel');
const sha256 = require('sha256');
exports.getlogin=(req,res,next)=>{
    res.render('admin/login');
}

exports.getDashboard=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        res.render('admin/dashboard');
    }
    else{
        res.redirect('/admin/login');
    }
}

exports.getCreateUser=(req,res,next)=>{
    UserModel.count({},function (err, count){
        console.log(count);
        if(count<=0)
        {
           
            res.render('admin/createuser');
        }
        else{
            res.redirect('/admin/login');
        }
    });
   
}

exports.postLogin=(req,res,next)=>{
    console.log(req.body);
    const emailid = req.body.emailid;
    const password = sha256(req.body.password);

   
        UserModel.find({emailid:emailid,password:password,isDeleted:false},function(err,user){
            if(user.length>0)
            {
                req.session.userdetails ={
                                                userid: user[0]._id,
                                                name: user[0].name,
                                                emailid:user[0].emailid,
                                                contactno:user[0].contactno,
                                                usertype:user[0].usertype
                                          }
                res.redirect('/admin/dashboard');
            }
            else{
                res.redirect('/admin/login');
            }
        });
    }
exports.postCreateUser=(req,res,next)=>{
    const name = req.body.name;
    const emailid = req.body.emailid;
    const contactno = req.body.contactno;
    const password = sha256(req.body.password);
    const admin = new UserModel(
        {   
            name: name,
            emailid:emailid,
            contactno:contactno,
            password:password,
            createdBy:'firstuser',
            usertype: 'admin',
            createdOn: new Date()
        });
     admin
       .save().then(result =>{
            console.log('Created User')
        })
        .catch(err=>{
            console.log(err);
        })
        res.redirect('/admin/createuser');
}

exports.getAdminLogout = (req,res,next)=>{
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.redirect('/admin/login'); 

        }  
    });  
    
}