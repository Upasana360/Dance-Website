const express = require("express");
const { connect } = require("http2");
const path=require("path");
const app = express();
const port = 80;
const bodyparser =require("body-parser");
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});


//Define Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
  });

//Schema to model conversion
const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF(CONFIGURATION )
app.use('/static', express.static('static')) //for serving static file//1st static is url and 2nd one is folder

app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//Set the template engine as pug
app.set('views',path.join(__dirname,'views'))//Set the views direction

//END POINTS
app.get('/',(req,res) => { 
    const params={}
    res.status(200).render('index.pug',params);
})
app.get('/contact',(req,res) => { 
    const params={}
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res) => { 
    var myData=new Contact(req.body);   //New contact object by which request is comming from the body
    myData.save().then(() => {
        res.send("This item has been saved in the database")
    }).catch(()=> {
        res.status(400).send("Item was not saved to the databse")
    })                                                       //This .save returns promise so we write .then to handle the promise
    // res.status(200).render('contact.pug');
})
//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
