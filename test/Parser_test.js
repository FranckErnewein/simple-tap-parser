var fs = require('fs');
var tap = require('../tap');

var tapfile = fs.readFileSync( __dirname + '/tap-file.tap', {encoding: 'utf8'} );

var parser = new tap.Parser ( tapfile );

var details = '' +
'  More output from test 2. There can be\n' +
'  arbitrary number of lines for any output\n' +
'  so long as there is at least some kind\n' +
'  of whitespace at beginning of line.\n';

var details2 = '' +
'  More output from test 5. There can be\n' + 
'  arbitrary number of lines for any output\n';

module.exports.parser = function( test ) {
  test.equals( parser.getTestCount(), 5 );
  test.equals( parser.getValidCount(), 2 );
  test.equals( parser.getFailedCount(), 3 );
  test.equals( parser.getTest( 2 ).getLabel(), 'First line of the input valid.' );
  test.equals( parser.getTest( 4 ).getLabel(), 'Summarized correctly # TODO Not written yet' );
  test.equals( parser.getTest( 2 ).getDetails(), details );
  test.equals( parser.getTest( 5 ).getDetails(), details2 );
  test.done();
};
