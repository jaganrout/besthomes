const CustomerModel = require('../models/customerModel');
const Request = require("request");

//api Send SMS
exports.sendOtp=(req,res,next)=>{
    const mobileno = req.params.mobileno;
    const otp = Math.floor(Math.random() * 8999 + 1000);
    const message = otp +" is your Besthome varification code."
    CustomerModel.find({contactno:mobileno},function(err, customer){
        if(customer.length>0){
             Request.get("http://login.bulksmsgateway.in/sendmessage.php?user=delta24in&password=123456&mobile="+mobileno+"&message="+message+"&sender=iDELTA&type=3 ", (error, response, body) => {
				if(error) {
                    return console.dir(error);
                }
                else{
        
                    res.status(200).json(
                        {
                             statusCode: 200,
                             status:"success",
                             data:{
                                 status : 'success',
                                 otp : otp,
                                 isExists : 'yes',
                                 customer : customer[0] 
                             }
                 
                        }
                     );
                }
        
            });
        }
        else{
             Request.get("http://login.bulksmsgateway.in/sendmessage.php?user=delta24in&password=123456&mobile="+mobileno+"&message="+message+"&sender=iDELTA&type=3 ", (error, response, body) => {
				if(error) {
                    return console.dir(error);
                }
                else{
        
                    res.status(200).json(
                        {
                             statusCode: 200,
                             status:"success",
                             data:{
                                 status : 'success',
                                 otp : otp,
                                 isExists : 'no'
                             }
                 
                        }
                     );
                }
        
            });
        }
    })
}


//api User Registration

exports.postUserRegistration =(req,res,next)=>{
    const name = req.body.name;
    const emailid = req.body.emailid;
    const mobileno = req.body.mobileno;
     const customer = new CustomerModel({
         contactno : mobileno,
         emailid : emailid,
         name : name
     })
     customer.save().then(result =>{
        res.status(200).json({
            statusCode : 200,
            status : 'success',
            data :{
                message : 'success',
                details : result
            }
        })
    })
    .catch(err=>{
        res.status(200).json({
            statusCode : 200,
            status : 'failed',
            data :{
                message : 'failed',
               
            }
        })
    });
     
}



exports.placeOrder=(req,res,netx)=>{
    res.status(200).json({
        status : 'success'
    });
}