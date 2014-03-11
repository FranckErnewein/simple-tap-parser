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

  isSizeLine: {
    'not valid': false,
    '1..45': true,
    '1..5': true,
    '1..': false,
    '8..9': false,
    '1..0': false,
    '1..010': true,
    '1..3000': true,
    '1.3000': false,
  },

  getSize: {
    'not valid': -1,
    '1..4': 4,
    '1..42': 42,
    '..42': -1,
    '1..042': 42,
    '1..0': -1,
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





