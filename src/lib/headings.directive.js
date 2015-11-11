(function() {
  'use strict';

  angular.module('angularTyper.headings', ['angularTyper.tableOfContents'])

  .directive('h1', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        if (!('skip' in attrs)) {
          var item = tableOfContentsSvc.register(1, elem[0].innerHTML);
          elem[0].innerHTML = item.chapter + ' ' + item.name;
        }
      }
    };
  })

  .directive('h2', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        if (!('skip' in attrs)) {
          var item = tableOfContentsSvc.register(2, elem[0].innerHTML);
          elem[0].innerHTML = item.chapter + ' ' + item.name;
        }
      }
    };
  })

  .directive('h3', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        if (!('skip' in attrs)) {
          var item = tableOfContentsSvc.register(3, elem[0].innerHTML);
          elem[0].innerHTML = item.chapter + ' ' + item.name;
        }
      }
    };
  })

  .directive('h4', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        if (!('skip' in attrs)) {
          var item = tableOfContentsSvc.register(4, elem[0].innerHTML);
          elem[0].innerHTML = item.chapter + ' ' + item.name;
        }
      }
    };
  })

  .directive('h5', function(tableOfContentsSvc) {
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs) {
        if (!('skip' in attrs)) {
          var item = tableOfContentsSvc.register(5, elem[0].innerHTML);
          elem[0].innerHTML = item.chapter + ' ' + item.name;
        }
      }
    };
  });

})();