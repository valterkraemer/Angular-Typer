(function() {
  'use strict';

  angular.module('angularTyper.img')
    .service('ImgSvc', ImgScv);

  ImgScv.$inject = ['$q'];

  function ImgScv($q) {

    var promises = [];

    return {
      addPromise: function(promise) {
        promises.push(promise);
      },
      getPromises: function() {
        return $q.all(promises);
      }
    };
  }

})();