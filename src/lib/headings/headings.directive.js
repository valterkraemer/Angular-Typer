(function() {
  'use strict';

  var h1 = 0;
  var h2 = 0;
  var h3 = 0;
  var h4 = 0;
  var h5 = 0;

  angular
    .module('angularTyper.headings')

  .component('h1', {
    bindings: {
      skip: '@'
    },
    transclude: false,
    isolate: false,
    controller: function($scope, $attrs, $element, $rootScope) {

      if ($attrs.skip === undefined) {
        h2 = h3 = h4 = h5 = 0;

        var item = {
          name: $element[0].innerHTML,
          chapter: ++h1,
          level: 1
        };
        $rootScope.vars.headings.push(item);

        $element[0].innerHTML = h1 + ' ' + $element[0].innerHTML;

        $rootScope.$on('pagesSplitted', function(event, data) {
          item.page = $element.parent().scope().pageNumber;
        });
      }
    }
  })

  .component('h2', {
    bindings: {
      skip: '@'
    },
    transclude: false,
    isolate: false,
    controller: function($scope, $attrs, $element, $rootScope) {

      if ($attrs.skip === undefined) {
        h3 = h4 = h5 = 0;

        var item = {
          name: $element[0].innerHTML,
          chapter: (h1 + '.' + (++h2)),
          level: 2
        };

        $rootScope.vars.headings.push(item);

        $scope.$on('pagesSplitted', function(event, data) {
          item.page = $element.parent().scope().pageNumber;
        });
      }
    }
  })

  .component('h3', {
    bindings: {
      skip: '@'
    },
    transclude: false,
    controller: function($scope, $attrs, $element, $rootScope) {

      if ($attrs.skip === undefined) {
        h4 = h5 = 0;

        var item = {
          name: $element[0].innerHTML,
          chapter: (h1 + '.' + h2 + '.' + (++h3)),
          level: 3
        };

        $rootScope.vars.headings.push(item);

        $scope.$on('pagesSplitted', function(event, data) {
          item.page = $element.parent().scope().pageNumber;
        });
      }
    }
  })

  .component('h4', {
    bindings: {
      skip: '@'
    },
    transclude: false,
    controller: function($scope, $attrs, $element, $rootScope) {

      if ($attrs.skip === undefined) {
        h5 = 0;

        var item = {
          name: $element[0].innerHTML,
          chapter: (h1 + '.' + h2 + '.' + h3 + '.' + (++h4)),
          level: 4
        };

        $rootScope.vars.headings.push(item);

        $scope.$on('pagesSplitted', function(event, data) {
          item.page = $element.parent().scope().pageNumber;
        });
      }
    }
  })

  .component('h5', {
    bindings: {
      skip: '@'
    },
    transclude: false,
    controller: function($scope, $attrs, $element, $rootScope) {

      if ($attrs.skip === undefined) {
        h5 = 0;

        var item = {
          name: $element[0].innerHTML,
          chapter: (h1 + '.' + h2 + '.' + h3 + '.' + h4 + '.' + (++h5)),
          level: 5
        };

        $rootScope.vars.headings.push(item);

        $scope.$on('pagesSplitted', function(event, data) {
          item.page = $element.parent().scope().pageNumber;
        });
      }
    }
  });


  /*.directive('h1', h1func)
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

      console.log(scope);

      if (!('skip' in attrs)) {

        h2 = h3 = h4 = h5 = 0;

        var item = {
          name: elem[0].innerHTML,
          chapter: ++h1,
          level: 1
        };
        scope.vm.headings.push(item);

        elem[0].innerHTML = h1 + ' ' + elem[0].innerHTML;

        scope.$on('pagesSplitted', function(event, data) {
          item.page = scope.pageNumber;//PageNumber.get(elem);
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
        scope.vm.headings.push(item);

        scope.$on('pagesSplitted', function(event, data) {
          item.page = scope.pageNumber;//PageNumber.get(elem);
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
        scope.vm.headings.push(item);

        scope.$on('pagesSplitted', function(event, data) {
          item.page = scope.pageNumber;//PageNumber.get(elem);
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
        scope.vm.headings.push(item);

        scope.$on('pagesSplitted', function(event, data) {
          item.page = scope.pageNumber;//PageNumber.get(elem);
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
        scope.vm.headings.push(item);

        scope.$on('pagesSplitted', function(event, data) {
          item.page = scope.pageNumber;//PageNumber.get(elem);
        });
      }
    }
  }*/

})();
