(function (root, Library) {
    // The square bracket notation is used to avoid property munging by the Closure Compiler.
   if (typeof define == "function" && typeof define.amd == "object" && define.amd ) {
     // Export for asynchronous module loaders (e.g., RequireJS, `curl.js`).
     define(["exports"], Library);
   } else {
     // Export for CommonJS environments, web browsers, and JavaScript engines.
     Library = Library(typeof exports == 'object' && exports || (root.Library = {
       "noConflict": (function (original) {
         function noConflict() {
           root.Library = original;
           // `noConflict` can't be invoked more than once.
           delete Library.noConflict;
           return Library;
         }
         return noConflict;
       })(root.Library)
     }));
   }
 })(this, function (exports) {

  function Line( string, index ){
    this.string = string || ''; 
    this.index = index;
  }

  Line.prototype = {
    getLabel: function( line ) {
      if( this.isComment() ){
        return '';
      }else{
        return this.string.split( ' - ' )[1] || '';
      }
    },
    getInteger: function() {
      return this.string.replace( /^\D+/g, '');
    },
    isComment: function() {
      return this.string.charAt(0) === '#';
    },
    hasContent: function( indexStart, indexEnd, content ) {
      return this.string.slice( indexStart, indexEnd ) === content;
    },
    isOk: function() {
      return this.hasContent( 0, 2, 'ok' );
    },
    isNotOk: function() {
      return this.hasContent( 0, 6, 'not ok' );
    },
    isTest: function(){
      return this.isOk() || this.isNotOk();
    } 

  };

  function Parser( string ) {
    this.tests = [];
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
      if( line.isTest() ){
        this.tests.push( line );
        if( line.isOk() ) this.validTest++;
        else if( line.isNotOk() ) this.failedTest++;
      }
    },
    getFailedTests: function(){
      return this.failedTest;
    },
    getValidTests: function(){
      return this.validTest;
    },
    getTest: function( index ){
      return this.tests[ index - 1 ];
    },
    getTotal: function(){
      return this.tests.length;
    }

  };


   exports.Line = Line;
   exports.Parser = Parser;

   return exports;
 });
