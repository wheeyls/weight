var fs = require("fs");

var Day = exports.Day = function day(attributes) {
  attributes.date = new Date(attributes.date) || new Date();
  attributes.id = attributes.id || new Date().getTime();
  attributes.target = this.goal_weight(attributes.date);
  this.attributes = attributes;
};
Day.prototype = {
  start: 182.0,
  start_date: new Date("Mon Jan 14 2012 00:00:00 GMT-0800 (PST)"),
  daily_goal: (3/7),
  goal_weight: function (compare_date) {
    var ms_in_day = 24 * 60 * 60 * 1000,
      days_past = 0;
    compare_date = compare_date || this.attributes.date;

    days_past = Math.floor( (compare_date.getTime() - this.start_date.getTime()) / ms_in_day );

    return this.start - (days_past * this.daily_goal);
  }
};

// Collection of days
var Days = exports.Days = function Days() {
  this.file = "db.json";
  this.encoding = "utf-8";
  this.list = {};
};
Days.prototype = {
  add: function(attributes) {
    var d = new Day(attributes), 
      id = d.attributes.id;

    this.list[id] = d;
  },
  save: function(callback) {
    var all = {}, item, l = this.list, i;
    for(i in l) {
      if(l.hasOwnProperty(i)) {
        item = l[i];
        all[item.attributes.id] = item.attributes;
      }
    }

    if(this.list === {}) {throw "Trying to write blank, please correct manually";}
    fs.writeFile(this.file, JSON.stringify(all), this.encoding, function(err) {
      callback(err);
    });
  },
  load: function(callback) {
    var all, list, i, that = this;
    fs.readFile(that.file, that.encoding, function(err, data) {
      if(err) { throw err; }
      that.list = {};

      all = JSON.parse(data);

      for(i in all) {
        if(all.hasOwnProperty(i)) {
          that.add(all[i]);
        }
      }
      callback(this.list);
    });
  }
};

