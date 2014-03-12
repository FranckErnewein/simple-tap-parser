var fs = require('fs');
var tap = require('../tap');

var tapfile = fs.readFileSync( __dirname + '/tap-file.tap', {encoding: 'utf8'} );

var parser = new tap.Parser ( tapfile );

module.exports.parser = function( test ) {
  test.equals( parser.getTotal(), 5 );
  test.equals( parser.getValidTests(), 2 );
  test.equals( parser.getFailedTests(), 3 );
  test.equals( parser.getTest( 2 ).getLabel(), 'First line of the input valid.' );
  test.equals( parser.getTest( 4 ).getLabel(), 'Summarized correctly # TODO Not written yet' );
  test.done();
};
