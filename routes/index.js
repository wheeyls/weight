var fs = require("fs")
  , Days = require("../models/day.js").Days
  , Day = require("../models/day.js").Day
  , day_list = new Days()

/*
 * GET home page.
 */

exports.index = function(req, res){
  fs.readFile("db.json", "utf-8", function(err, data) {
    data = JSON.parse(data);
    res.render('index', {date: new Date().toString(), data: data});
  });
};

exports.save = function(req, res){
  day_list.load(function(list) {
    day_list.add(req.body.day);
    day_list.save(function(err) {
      if(err) { throw err; }
      res.redirect('home');
    });
  });
};
