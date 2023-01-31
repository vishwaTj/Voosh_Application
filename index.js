const express = require ('express');
const app = express();
const port = 700;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
app.use('/assets',express.static(__dirname + '/assets'));
app.use(expressLayouts);

//extract styles for subpages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// middle ware to extract data from webpages
app.use(express.urlencoded());

// view engine to view pages
app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`There was an error in setting up port : ${err}`);
    }
    else{
        console.log(`The port is up and running on: ${port}`);
    }
})