/*
*  Defined the Mongoose Schema and return a Model for a Buidling
*/

// Add dependencies
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const locationSchema = new Schema({
  _id: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  perc_increase: {type: Number}
}, { strict: false });

// Create model of scneme
const Location = mongoose.model('Location', locationSchema);

// Make avaiable to users
module.exports = Location;
