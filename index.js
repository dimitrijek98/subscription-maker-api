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

app.post('/LogIn', (req, res) => {
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
            return res.status(200).send(JSON.stringify(doc));
        }
    });
});

app.post('/SignUpUser', (req, res) => {
    let User = mongoose.connection.db.collection("user");
    let rollID = "2";
    let email = req.body.email;
    let password = req.body.password;
    let name= req.body.name;
    let surname= req.body.surname;
    let newUser = { rollID: rollID, email: email, password: password, name:name, surname:surname };
    User.insert(newUser, function(err, doc){
        if(err)
        {
            return res.status(500).send();
        }
        return res.status(200).send(JSON.stringify(doc));
    });
});

app.post('/UserContracts', (req,res) =>{
    let Contract = mongoose.connection.db.collection("contract");
    let email = req.body.email;
    let query = { "user.email" : email };
    Contract.find(query).toArray(function(err, data){
        if(err){
            return res.status(500).send();
        }
        else{
            return res.status(200).send(JSON.stringify(data));
        }
    }); 
});

app.post('/FindConcrectContract', (req,res) =>{
    let Contract = mongoose.connection.db.collection("contract");
    let email = req.body.email;
    let key = req.body.target;
    let query = { "user.email" : email, target: key};
    Contract.findOne(query, function(err, data){
        if(err){
            return res.status(500).send();
        }
        else{
            return res.status(200).send(JSON.stringify(data));
        }
    }); 
});

app.get('/AllExtras', (req,res) =>{
    let Extras = mongoose.connection.db.collection("extras");
    let tip = req.body.type;
    let query = { type: tip };
    Extras.find(query).toArray(function(err,data){
        if(err){
            return res.status(500).send();
        }
        else{
            return res.status(200).send(JSON.stringify(data));
        }
    });
});

app.post('/NewExtras', (req,res) =>{
    let Extras = mongoose.connection.db.collection("extras");
    let tip = req.body.type;
    let naziv = req.body.name;
    let newExtras = { type: tip, name: naziv };
    Extras.insert(newExtras, function(err,data){
        if(err)
        {
            return res.status(500).send();
        }
        return res.status(200).send(JSON.stringify(data));
    });
});

app.post('/AddExtras', (req,res) =>{
    let Contract = mongoose.connection.db.collection("contract");
    let email = req.body.email;
    let key = req.body.target;
    let tip = req.body.type;
    let naziv = req.body.name;
    let query = { "user.email": email, target: key, "plan.services.type": tip};
    let update = { "plan.services.$.extras": naziv};
    Contract.updateOne(query, {$push: update} , function(err, data){
        if(err){
        return res.status(500).send(err);
        }
        else{
        res.status(200).send(JSON.stringify(data));
        }
    });
});

app.post('/RemoveExtras', (req,res) =>{
    let Contract = mongoose.connection.db.collection("contract");
    let email = req.body.email;
    let key = req.body.target;
    let tip = req.body.type;
    let naziv = req.body.name;
    let query = { "user.email": email, target: key, "plan.services.type": tip};
    let update = { "plan.services.$.extras": naziv};
    Contract.updateOne(query, {$pull: update} , function(err, data){
        if(err){
        return res.status(500).send(err);
        }
        else{
        res.status(200).send(JSON.stringify(data));
        }
    });
});

app.get('/AllPlans', (req,res) =>{
    let Plan = mongoose.connection.db.collection("plan");
    Plan.find().toArray(function(err,data){
        if(err){
            return res.status(500).send();
        }
        else{
            return res.status(200).send(JSON.stringify(data));
        }
    });
});

app.post('/NewPlan', (req,res) =>{
    let Plan = mongoose.connection.db.collection("plan");
    let ime = req.body.name;
    let cena = req.body.price;
    let usluga = req.body.services; //bolje je na frontu kreirati ovaj objekat jer se tacno zna sta sve ima
    let newPlan = { name: ime, price: cena, services: usluga };
    Plan.insert(newPlan, function(err,data){
        if(err)
        {
            return res.status(500).send();
        }
        return res.status(200).send(JSON.stringify(data));
    });
});

app.post('/EditPlan', (req,res) =>{
    let Plan = mongoose.connection.db.collection("plan");
    let staroIme = req.body.oldName;
    let ime = req.body.name;
    let cena = req.body.price;
    let usluga = req.body.services;
    let query = { name: staroIme};
    let update = { name:ime, price:cena, services: usluga};
    Plan.updateOne(query, {$set: update} , function(err, data){
        if(err){
        return res.status(500).send(err);
        }
        else{
        res.status(200).send(JSON.stringify(data));
        }
    });
});


app.post('/DeletePlan', (req,res) =>{
    let Plan = mongoose.connection.db.collection("plan");
    let ime = req.body.name;
    let query = { name: ime};
    Plan.deleteOne(query, function(err, data){
        if(err){
        return res.status(500).send(err);
        }
        else{
        res.status(200).send(JSON.stringify(data));
        }
    });
});

app.post('/FindUser', (req,res) =>{
    let User = mongoose.connection.db.collection("user");
    let email = req.body.email;
    let query = { email: email };
    User.findOne(query, function(err, doc){
        if(err)
        {
            return res.status(500).send();
        }
        if(!doc){
            return res.status(404).send("User does not exist!");
        }
        else{
            return res.status(200).send(JSON.stringify(doc));
        }
    });
});

app.post('/NewContract', (req,res) =>{
    let Contract = mongoose.connection.db.collection("contract");
    let email = req.body.email;
    let key = req.body.target;
    let paket = req.body.plan; //bolje je na frontu kreirati ovaj objekat jer se tacno zna sta sve ima
    let newContract = { user: { email: email}, target: key, plan: paket };
    Contract.insert(newContract, function(err,data){
        if(err)
        {
            return res.status(500).send();
        }
        return res.status(200).send(JSON.stringify(data));
    });
});

app.post('/DeleteContract', (req,res) =>{
    let Contract = mongoose.connection.db.collection("contract");
    let email = req.body.email;
    let key = req.body.target;
    let query = { "user.email": email, target: key };
    Contract.deleteOne(query, function(err, data){
        if(err){
        return res.status(500).send(err);
        }
        else{
        res.status(200).send(JSON.stringify(data));
        }
    });
});