var tap = require('../tap'),
    _ = require('lodash');

var suite = {

  isValid: {
    'ok 1 - Something tested': true,
    'not ok 1 - Something tested': false,
  },

  getLabel: {
    'ok - label is here': 'label is here',
    'not ok - label is here': 'label is here',
    'not ok - ': '',
    'not ok': '',
  },


};


module.exports.test = {};

_.each( suite, function( tests, method ){

  module.exports.test[ method ] = function( test ){
    _.each( tests, function( result, input ){
      var t = new tap.Test( new tap.Line( input ) ); 
      test.equals( t[ method ](), result ); 
    });
    test.done();
  };

});





