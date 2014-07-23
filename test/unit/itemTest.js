/* global describe, it, before */
'use strict';


var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Item;

describe('Item', function(){
  before(function(done) {
    connect('home-inventory-test', function(){
    Item  = require('../../app/models/item');
    done();
    });
  });

  describe('constructor', function(){
    it('should create an object called item with properties', function(){
      var inv = new Item('table', 'kitchen', '1/15/2014', 2, 100);

    expect(inv).to.be.instanceof(Item);
    expect(inv.room).to.equal('kitchen');
    expect(inv.date).to.be.instanceof(Date);
    expect(inv.date.getFullYear()).to.equal(2014);
    expect(inv.date.getDate()).to.equal(15);
    expect(inv.date.getMonth()).to.equal(0);
    expect(inv.count).to.equal(2);
    expect(inv.costEach).to.equal(100);
    });
  });


  describe('#save', function(){
    it('should save an item to the mongo database', function(done){
      var table = new Item('table', 'kitchen', '1/15/2014', 2, 100);
      table.save(function(){
        expect(table._id).to.be.ok;
        done();
      }); 
    });
  });




 });
