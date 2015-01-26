angular.module('directives', [])

.run(function($rootScope) {
  $rootScope.figures = {};
  $rootScope.figureIndex = 1;
  $rootScope.pageNumber = 0;

  $rootScope.headingList = [];
})

.directive('settingsBar', function($rootScope) {
  return {
    restrict: 'AEC',
    templateUrl: 'templates/settings-bar.html'
  }
})

.directive('page', function($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    scope: true,
    controller: function($scope) {
      $scope.pageNumbers = $rootScope.pageNumber += 1;
    },
    template: '<div class="page"><div class="page-content" ng-transclude></div><div class="page-number">{{pageNumbers}}</div></div>'
  }
})

.directive('h1', function($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    scope: true,
    controller: function($scope, $attrs, $transclude) {
      if("skip" in $attrs) return;

      var listItem = {}
      listItem.name = $transclude().text();
      listItem.page = $rootScope.pageNumber;
      listItem.items = [];

      $rootScope.headingList.push(listItem);
      $scope.h1Number = $rootScope.headingList.length;
    },
    template: '<span id="h-{{h1Number}}">{{h1Number}} <span ng-transclude></span></span>'
  }
})

.directive('h2', function($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    scope: true,
    controller: function($scope, $attrs, $transclude) {
      if("skip" in $attrs) return;

      var listItem = {}
      listItem.name = $transclude().text();
      listItem.page = $rootScope.pageNumber;
      listItem.items = [];

      $scope.h1Number = $rootScope.headingList.length;
      $rootScope.headingList[$scope.h1Number - 1].items.push(listItem);

      $scope.h2Number = $rootScope.headingList[$scope.h1Number - 1].items.length;
    },
    template: '<span id="h-{{h1Number}}.{{h2Number}}"><span ng-if="h1Number">{{h1Number}}.{{h2Number}} </span><span ng-transclude></span></span>'
  }
})

.directive('h3', function($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    scope: true,
    controller: function($scope, $attrs, $transclude) {
      if("skip" in $attrs) return;

      var listItem = {}
      listItem.name = $transclude().text();
      listItem.page = $rootScope.pageNumber;
      listItem.items = [];

      $scope.h1Number = $rootScope.headingList.length;
      $scope.h2Number = $rootScope.headingList[$scope.h1Number - 1].items.length;
      $rootScope.headingList[$scope.h1Number - 1].items[$scope.h2Number - 1].items.push(listItem);

      $scope.h3Number = $rootScope.headingList[$scope.h1Number - 1].items[$scope.h2Number - 1].items.length;
    },
    template: '<span id="h-{{h1Number}}.{{h2Number}}.{{h3Number}}"><span ng-if="h1Number">{{h1Number}}.{{h2Number}}.{{h3Number}} </span><span ng-transclude></span></span>'
  }
})

.directive('figure', function($rootScope) {
  return {
    scope: {
      name: '@name',
      width: '@width',
      src: '@src',
      text: '@text'
    },
    controller: function($scope) {
      $scope.number = $rootScope.figures[$scope.name] = $rootScope.figureIndex;
      $rootScope.figureIndex += 1;
    },
    replace: true,
    restrict: 'E',
    template: '<div id="f-{{number}}" class="figure" style="width: {{width}}"><img ng-src="{{src}}" alt="{{name}}"><div class="text">Fig {{number}}: {{text}}</div></div>'
  }
})
