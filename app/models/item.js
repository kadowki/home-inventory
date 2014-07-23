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












module.exports = Item;
