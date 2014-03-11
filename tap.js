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
    getMatchSize: function(){
      if( this._matchSize === undefined ){
        this._matchSize = this.string.match(/^1\.\.(\d+)$/);
      }
      return this._matchSize;
    },
    isSizeLine: function() {
      var match = this.getMatchSize();
      if( !( match instanceof Array ) ) return false;
      var size = parseInt( match[1] );
      if( typeof size !== 'number' || isNaN( size ) ) return false;
      return size > 0;
    },
    getSize: function() {
      return this.isSizeLine() ? parseInt( this.getMatchSize()[1] ) : -1;
    }

  };

  function Parser( string ) {
    var lines = string.split(/\n/);
    this.tests = [];
    lines.forEach( function( str, i ){
      this.tests.push( new Line( str, i ) );
    });
  }


   exports.Line = Line;
   exports.Parser = Parser;

   return exports;
 });
