/*
*  Defined the Mongoose Schema and return a Model for a Buidling
*/

// Add dependencies
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const buildingSchema = new Schema({
  _id: { type: String },
  lat: { type: Number },
  lng: { type: Number }
}, { strict: false });

// Create model of scneme
const Building = mongoose.model('Building', buildingSchema);

// Make avaiable to users
module.exports = Building;
