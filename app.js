const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const user = require('./Routes/admin');
const category = require('./Routes/category');
const brand = require('./Routes/brand');
const item = require('./Routes/item');
const customer = require('./Routes/customer');
const app =express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('images'));
app.set('view engine','pug');
app.set('views','views');
app.use(
    session(
        {
            resave:true,
            secret:'123456',
            saveUninitialized:true
         
        }
    )
);
app.use(category);
app.use(user);
app.use(brand);
app.use(item);
app.use(customer)
mongooes.connect('mongodb://localhost:27017/my-home')
.then(result =>{
   app.listen(300);   
})
.catch(err=>{
    console.log(err);
})
