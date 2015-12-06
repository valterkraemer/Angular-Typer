(function() {
  'use strict';

  var h1 = 0;
  var h2 = 0;
  var h3 = 0;
  var h4 = 0;
  var h5 = 0;

  angular
    .module('angularTyper.headings')
    .directive('h1', h1func)
    .directive('h2', h2func)
    .directive('h3', h3func)
    .directive('h4', h4func)
    .directive('h5', h5func);

  h1func.$inject = ['PageNumber'];

  function h1func(PageNumber) {

    return {
      restrict: 'EA',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {

      if (!('skip' in attrs)) {

        h2 = h3 = h4 = h5 = 0;

        var item = {
          name: elem[0].innerHTML,
          chapter: ++h1,
          level: 1
        };
        scope.headings.push(item);

        elem[0].innerHTML = h1 + ' ' + elem[0].innerHTML;

        scope.$on('pagesSplitted', function(event, data) {
          item.page = PageNumber.get(elem);
        });
      }
    }

  }

  h2func.$inject = ['PageNumber'];

  function h2func(PageNumber) {
    return {
      restrict: 'EA',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {

      if (!('skip' in attrs)) {

        h3 = h4 = h5 = 0;

        var item = {
          name: elem[0].innerHTML,
          chapter: (h1 + '.' + (++h2)),
          level: 2
        };
        scope.headings.push(item);

        scope.$on('pagesSplitted', function(event, data) {
          item.page = PageNumber.get(elem);
        });
      }
    }
  }

  h3func.$inject = ['PageNumber'];

  function h3func(PageNumber) {
    return {
      restrict: 'EA',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {

      if (!('skip' in attrs)) {

        h4 = h5 = 0;

        var item = {
          name: elem[0].innerHTML,
          chapter: (h1 + '.' + h2 + '.' + (++h3)),
          level: 3
        };
        scope.headings.push(item);

        scope.$on('pagesSplitted', function(event, data) {
          item.page = PageNumber.get(elem);
        });
      }
    }
  }

  h4func.$inject = ['PageNumber'];

  function h4func(PageNumber) {
    return {
      restrict: 'EA',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {

      if (!('skip' in attrs)) {

        h5 = 0;

        var item = {
          name: elem[0].innerHTML,
          chapter: (h1 + '.' + h2 + '.' + h3 + '.' + (++h4)),
          level: 4
        };
        scope.headings.push(item);

        scope.$on('pagesSplitted', function(event, data) {
          item.page = PageNumber.get(elem);
        });
      }
    }
  }

  h5func.$inject = ['PageNumber'];

  function h5func(PageNumber) {
    return {
      restrict: 'EA',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {

      if (!('skip' in attrs)) {

        var item = {
          name: elem[0].innerHTML,
          chapter: (h1 + '.' + h2 + '.' + h3 + '.' + h4 + '.' + (++h5)),
          level: 5
        };
        scope.headings.push(item);

        scope.$on('pagesSplitted', function(event, data) {
          item.page = PageNumber.get(elem);
        });
      }
    }
  }

})();