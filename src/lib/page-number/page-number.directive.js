(function() {
  'use strict';

  angular
    .module('angularTyper.pageNumber')
    .directive('pageNumber', pageNumber);

  pageNumber.$inject = ['PageNumber'];

  function pageNumber(PageNumber) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        scope.$on('pagesSplitted', function(event, data) {
          elem[0].innerHTML = PageNumber.get(elem);
        });
      }
    };
  }

})();