(function() {
  'use strict';

  angular
    .module('angularTyper.bibliograpy', [
      'angularTyper.file'
    ])
    .run(runBlock);

  runBlock.$inject = ['$rootScope'];

  function runBlock($rootScope) {
    $rootScope.cites = [];
  }

})();