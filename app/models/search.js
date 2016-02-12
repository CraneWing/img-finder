// campground model module
var mongoose = require('mongoose');

// schema for searches that will be displayed on 
// recent search page
var searchSchema = new mongoose.Schema({
  term: String,
  when: { type: Date, default: Date.now }
});

// create search model
module.exports = mongoose.model('Search', searchSchema);