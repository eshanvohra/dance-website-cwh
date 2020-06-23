const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const app = express();
const port = 8003;

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true ,useUnifiedTopology: true } );



//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);


 
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/home', (req, res)=>{

    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{

    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{

    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved")
    }).catch(()=>{
        res.status(400).send("Item was not saved to db")
    })
    // res.status(200).render('contact.pug');
})










// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});