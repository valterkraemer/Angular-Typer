(function() {
  'use strict';

  angular
    .module('angularTyper.pageNumber')
    .directive('clearpage', clearpage);

  clearpage.$inject = [];

  function clearpage() {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        elem[0].setAttribute('clearpage', '');
      }
    };
  }

})();