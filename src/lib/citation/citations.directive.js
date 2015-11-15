(function() {
  'use strict';

  angular
    .module('angularTyper.bibliograpy')
    .directive('cite', cite);

  cite.$inject = ['bibliograpySvc'];

  function cite(bibliograpySvc) {
    return {
      restrict: 'EA',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {

      if (!attrs.on) {
        console.warn('Citation key not defined');
      } else {
        bibliograpySvc.getByKey(attrs.on).then(function(bib) {

          if (!bib) {
            return;
          }

          var authors = bib.author.split(",");
          var firstAuthor = authors[0];
          var name = firstAuthor.split(" ");
          var lastname = name[name.length - 1];
          var etAl = "";

          if (authors.length > 1) {
            etAl = " et al.";
          }

          elem[0].innerHTML = lastname + etAl + " (" + bib.year + ")";
        });
      }
    }
  }

})();