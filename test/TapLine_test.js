var tap = require('../tap'),
    _ = require('lodash');

var suite = {

  isOk: {
    'ok 1 - Something tested': true,
    'not ok 1 - Something tested': false,
  },

  isNotOk: {
    'ok 1 - Something tested': false,
    'not ok 1 - Something tested': true,
  },

  isComment: {
    '# a comment line': true,
    '#an other comment line': true,
    'not a comment line': false,
    'not a #comment line': false,
  },

  getLabel: {
    'ok - label is here': 'label is here',
    'not ok - label is here': 'label is here',
    'not ok - ': '',
    'not ok': '',
    '#ok': '',
  },

  isTest: {
    'ok - label is here': true,
    'not ok - label is here': true,
    '#ok': false,
    '#not ok': false,
  }

};


module.exports.line = {};

_.each( suite, function( tests, method ){

  module.exports.line[ method ] = function( test ){
    _.each( tests, function( result, input ){
      var line = new tap.Line( input ); 
      test.equals( line[ method ](), result ); 
    });
    test.done();
  };

});





