(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    //AMD. Register as an anonymous module.
    define([], function () {
      return factory({});
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(exports);
  } else {
    // Browser globals
    factory((root.tap = {}));
  }

 }( this, function ( exports ) {
  
  'use strict';
  
  var OK = 'ok';
  var NOT_OK = 'not ok';
  var SEPARATOR = ' - ';

  function Line( string ) {
    this.string = string || ''; 
  }

  Line.prototype = {
    isComment: function() {
      return this.string.charAt(0) === '#';
    },
    beginWith: function( content ) {
      return this.string.slice( 0, content.length ) === content;
    },
    isTest: function(){
      return this.beginWith( OK ) || this.beginWith( NOT_OK );
    },
    isDetail: function(){
      var firstChar = this.string.charAt( 0 );  
      return firstChar == '\t' || firstChar == ' ';
    },
  };

  function Test( line ) {
    this.line = line;
    this.details = '';
  }

  Test.prototype = {
    isValid: function(){
      return this.line.beginWith( 'ok' );
    },
    addDetail: function( line ) {
      this.details += line.string + '\n';
    },
    getDetails: function(){
      return this.details;
    },
    getLabel: function(){
      return this.line.string.split( SEPARATOR )[1] || '';
    }
  };

  function Parser( string ) {
    this.tests = [];
    this.lines = [];
    this.validTest = 0;
    this.failedTest = 0;
    if( string ) this.parse( string );
  }

  Parser.prototype = {
    parse: function( string ){
      var self = this;
      string.split('\n').forEach( function( line, index ){
        self.addLine( line, index ); 
      });
    },
    addLine: function( string, index ){
      var line = new Line( string, index );
      this.lines.push( line );
      if( line.isTest() ){
        var test = new Test( line );
        this.tests.push( test );
        this[ test.isValid() ? 'validTest' : 'failedTest' ]++; 
      }else if( line.isDetail() ){
        this.getLastTest().addDetail( line );
      }
    },
    getFailedCount: function() {
      return this.failedTest;
    },
    getValidCount: function() {
      return this.validTest;
    },
    getTest: function( index ){
      return this.tests[ index - 1 ];
    },
    getLastTest: function(){
      return this.tests[ this.tests.length - 1 ];
    },
    getLine: function( index ) {
      return this.lines[ index ];
    },
    getTestCount: function() {
      return this.tests.length;
    }

  };


   exports.Line = Line;
   exports.Test = Test;
   exports.Parser = Parser;

   return exports;
 }));
