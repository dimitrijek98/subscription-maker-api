const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/subscription', {
	useNewUrlParser: true
}).then(console.log('bla bla'));

app.use(cors());
app.listen(port);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("OK");
});