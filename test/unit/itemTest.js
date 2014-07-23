/* global describe, it, before, beforeEach */
'use strict';


var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Item;

describe('Item', function(){
  before(function(done) {
    connect('home-inventory-test', function(){
    Item  = require('../../app/models/item');
    done();
    });
  });
  
  beforeEach(function(done){
    global.mongodb.collection('items').remove(function(){
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
        expect(table._id).to.be.instanceof(Mongo.ObjectID);
        done();
      }); 
    });
  })
  ;
  describe('.find', function(){
    it('should find all the items from the mongo database', function(done){
      var table = new Item('table', 'kitchen', '1/15/2014', 2, 100);
      table.save(function(){
        Item.find(function(items){ 
          expect(items).to.have.length(1);
          done();
         });
       }); 
     });
    it('should find specific items from the mongo database', function(done){
      var table = new Item('table', 'kitchen', '1/15/2014', 2, 100);
      var couch = new Item('couch', 'livingroom', '3/24/2012', 1, 300);
      var chair = new Item('chair', 'livingroom', '4/10/2010', 3, 50);

         table.save(function(){
            couch.save(function(){
              chair.save(function(){
                Item.find('couch', function(couch){
                  expect(couch).to.have.length(1);
                  expect(couch[0].name).to.be.equal('couch');
                  done();
                });
              });
            });
          }); 
       }); 
   });




 });
