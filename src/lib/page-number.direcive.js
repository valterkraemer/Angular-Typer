(function() {
  'use strict';

  angular.module('angularTyper.pageNumber', [])

  .service('pageNumberSvc', function() {

    var pageNumber = 0;

    return function() {
      return pageNumber++;
    };
  })

  .directive('pageNumber', function(pageNumberSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        elem[0].innerHTML = pageNumberSvc();
      }
    };
  });

})();
