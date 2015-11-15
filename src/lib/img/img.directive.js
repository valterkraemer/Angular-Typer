(function() {
  'use strict';

  angular
    .module('angularTyper.img')
    .directive('img', img);

  img.$inject = ['ImgSvc', '$q'];

  function img(ImgSvc, $q) {
    return {
      restrict: 'E',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {
      if (!attrs.src) {
        console.error('Img element have no "src" attribute');
      } else {
        var deferred = $q.defer();
        ImgSvc.addPromise(deferred.promise);

        elem.bind('load', function() {
          deferred.resolve();
        });
      }
    }
  }

})();