const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const port = 3001
const mongoose = require('mongoose');
const path = require('path');

// Schema imports
const Building = require(path.join(__dirname, 'building.js'));
// const Component = require('../schema/component.js');

// Connect
const url = 'mongodb://localhost/viz_risk'
mongoose.Promise = global.Promise;
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('Hello World!'))

// Get buildings
app.get('/api/buildings',(req, res, next) => {
  Building.find({"main_damage": {$ne: "Damaged"}}, (err, buildings) => { // filter out buildings that only were labeled as 'Damaged'
    if (err) next(err);
    res.json(buildings);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
