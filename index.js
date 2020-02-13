const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/subscription', {
	useNewUrlParser: true
});

app.use(cors());
app.listen(port);
app.use(bodyParser.json());

app.get('/', (req, res) => {
   // let novi = {email: 'novo', password: 'novo'};
    //User.insert(novi);
    /*let User = mongoose.connection.db.collection("user");
    User.find({}).toArray(function(err, data){
            res.status(200).send(data);
        }); */  
        
});

app.post('/login-admin', (req, res) => {
    let Adim = mongoose.connection.db.collection("admin");
    let email = req.body.email;
    let password = req.body.password;
    let query = { email: email };
    Admin.findOne(query, function(err, doc){
        if(err)
        {
            return res.status(500).send();
        }
        if(!doc){
            return res.status(404).send("Admin does not exist!");
        }
        if(doc.password != password){
            return res.status(422).send("Wrong password!");
        }
        if(doc.password == password){
            return res.status(200).send();
        }
    });
});  

app.post('/login-user', (req, res) => {
    let User = mongoose.connection.db.collection("user");
    let email = req.body.email;
    let password = req.body.password;
    let query = { email: email };
    User.findOne(query, function(err, doc){
        if(err)
        {
            return res.status(500).send();
        }
        if(!doc){
            return res.status(404).send("User does not exist!");
        }
        if(doc.password != password){
            return res.status(422).send("Wrong password!");
        }
        if(doc.password == password){
            return res.status(200).send();
        }
    });
});

app.post('/signup-user', (req, res) => {
    let User = mongoose.connection.db.collection("user");
    let email = req.body.email;
    let password = req.body.password;
    let name= req.body.name;
    let surname= req.body.surname;
    let adress = req.body.adress;
    let phone  = req.body.phone;
    let newUser = { email: email, password: password, name:name, surname:surname, adress:adress, phone:phone};
    User.insert(newUser, function(err, doc){
        if(err)
        {
            return res.status(500).send();
        }
        return res.status(200).send(doc);
    });
});