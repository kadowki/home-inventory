'use strict';

var cItem = global.mongodb.collection('items');
var _ = require('lodash');

function Item(name, room, date, count, costEach){
  this.name      = name;
  this.room      = room;
  this.date      = new Date(date);
  this.count     = count;
  this.costEach  = costEach;
}




Item.prototype.save = function(cb){
  cItem.save(this, function(err, obj){
    cb();
  });
};

Item.find = function(item, cb){
  if(cb !== undefined){
    cItem.find({name: item}).toArray(function(err, items){
    cb(items);
    });
  }else{
    cItem.find().toArray(function(err, items){
    item(items);
    });
  }
};

Item.value = function(area, cb){
    cItem.find({room: area}).toArray(function(err, items){
    var sum = 0;
    for(var i = 0; i < items.length; i++){
      var item = items[i]; //Each items is set to the value of item[i]
      item = _.create(Item.prototype, item); //resets the prototype chain
      sum += item.value();
    }
      cb(sum);
    });
};

Item.prototype.value = function(){
  return this.count * this.costEach;
};









module.exports = Item;

