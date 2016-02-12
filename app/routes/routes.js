'use strict';

var express  	= require('express'),
    request   = require('request'),
    dotenv    = require('dotenv'),
    Search	  = require('../models/search.js'),
	  router 	  = express.Router();

dotenv.load();

// introductory homepage	 
router.get('/api', function(req, res) {
  res.render('api/index');
});

// gets the query string and returns image results
router.get('/api/:query', function(req, res) {
  var start,
      cx  = process.env.CX,
      key = process.env.API_KEY,
      url = 'https://www.googleapis.com/customsearch/v1',
      qParams   = '&searchType=image&fileType=jpeg|gif|png&imgSize=small&alt=json';
  
  var q = req.params.query;
  var offset = req.param('offset');
  
  if (offset != undefined && /[0-9]/g.test(offset)) {
    offset = parseInt(offset);
    start = (offset <= 10 ? offset : 10);
  }
  else {
    console.log('invalid offset value ' + offset + ' or no offset given');
  }
  
  // entire search includes Google base URL, keys, query string, image params
  var search = url + '?key=' + key + '&cx=' + cx + '&q=' 
  + q + qParams; + '&start=' + start;
  
  // uses the Request Node module
  request(search, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var result = JSON.parse(body);
      
      var imageList = result.items.map(function(item) {
        return {
          url: item.link,
          snippet: item.snippet,
          thumbnail: item.image.thumbnailLink,
          context: item.image.contextLink
        };
      });
      
      res.send(imageList);
    }
  });
  
  // data saved into search object
  var newSearch = {
    term: q,
    when: Date.now()
  };
  
  // create new search and save to Mongo
  Search.create(newSearch, function(err, newlyCreated) {
    if (err) {
      console.log('There was an error: ' + err);
    }
    else {
      console.log('Search added');
      console.log(newlyCreated);
    }
  });
});

router.get('/api/latest/imagesearch', function(req, res) {
  // finds last 10 searches and sorts by descending as in
  // FCC sample
  Search.find({}).limit(10).sort({ when: -1 }).exec(function(err, searches) {
    if (err) {
      console.log('There was an error: ' + err);
    }
    else {
      var searchList = searches.map(function(search) {
        return {
          term: search.term,
          when: search.when
        };
      });
      
      res.send(searchList);
    }
  });
});

module.exports = router;