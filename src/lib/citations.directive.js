(function() {
  'use strict';

  angular.module('angularTyper.citations', ['angularTyper.bibliograpy'])

  .directive('cite', function(bibliograpySvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {

        if (!attrs.on) {
          console.warn('Citation key not defined');
        } else {
          bibliograpySvc.getByKey(attrs.on).then(function(bib) {

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
    };
  });

})();



/*
.filter('cite', function(bib, $rootScope) {
  return function(input) {
    if (bib[input]) {
      if (!$rootScope.cites[input]) {
        $rootScope.cites[input] = bib[input];
      }

      var authors = bib[input].author.split(",");
      var firstAuthor = authors[0];
      var name = firstAuthor.split(" ");
      var lastname = name[name.length-1];
      var etAl = "";

      if (authors.length > 1) {
        etAl = " et al.";
      }
      return lastname + etAl + " (" + bib[input].year + ")";

    } else {
      return "('" + input + "' not found in bibliography)";
    }
  };
})*/
