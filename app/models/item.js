'use strict';

var cItem = global.mongodb.collection('items');

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











module.exports = Item;

