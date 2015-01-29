angular.module('controllers', [])

.controller('MainCtrl', function ($scope, $rootScope, $anchorScroll, $location, details, static) {
  $scope.details = details;
  $scope.static = static;

  $scope.loaded = 1;

  $scope.goToAnchor = function(anchor) {
    if ($location.hash() !== anchor) {
      // set the $location.hash to `newHash` and
      // $anchorScroll will automatically scroll to it
      $location.hash(anchor);
    } else {
      // call $anchorScroll() explicitly,
      // since $location.hash hasn't changed
      $anchorScroll();
    }
  }

  $scope.date = function() {
    if ($scope.details.date) {
      var d = new Date($scope.details.date);
      if (isNaN(d.getTime())) {
        return "Date not properly formatted";
      }
      return d.toLocaleDateString();
    } else {
      return (new Date).toLocaleDateString();
    }
  }

  $scope.load = function() {
    $scope.loaded += 1;
  }
})
