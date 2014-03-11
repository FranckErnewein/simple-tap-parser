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
    }
  };

   function Parser(){

   }

   exports.Line = Line;
   exports.Parser = Parser;

   return exports;
 });
