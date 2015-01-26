angular.module('factories', [])

.factory('figureFactory', function() {

  var figures = [];

  return {
    factory: function(name) {
      return "Hi " + name + "!";
    }
  }
});
