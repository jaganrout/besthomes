const express = require('express');
const router = express.Router();
const CustomerController = require('../Controllers/customerController');

router.get('/api/sendotp/:mobileno',CustomerController.sendOtp);
router.post('/api/customer/registration' ,CustomerController.postUserRegistration);


router.post('/api/order/placeorder',CustomerController.placeOrder);
module.exports=router;
