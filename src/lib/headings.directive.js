(function() {
  'use strict';

  angular.module('angularTyper.headings', ['angularTyper.tableOfContents'])

  .directive('h1', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        elem[0].innerHTML = tableOfContentsSvc.register(1, elem[0].innerHTML) + ' ' + elem[0].innerHTML;
      }
    };
  })

  .directive('h2', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        elem[0].innerHTML = tableOfContentsSvc.register(2, elem[0].innerHTML) + ' ' + elem[0].innerHTML;
      }
    };
  })

  .directive('h3', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        elem[0].innerHTML = tableOfContentsSvc.register(3, elem[0].innerHTML) + ' ' + elem[0].innerHTML;
      }
    };
  })

  .directive('h4', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        elem[0].innerHTML = tableOfContentsSvc.register(4, elem[0].innerHTML) + ' ' + elem[0].innerHTML;
      }
    };
  })

  .directive('h5', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        elem[0].innerHTML = tableOfContentsSvc.register(5, elem[0].innerHTML) + ' ' + elem[0].innerHTML;
      }
    };
  });

})();
