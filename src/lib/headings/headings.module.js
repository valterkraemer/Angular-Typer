(function() {
  'use strict';

  angular
    .module('angularTyper.headings', [
      'angularTyper.tableOfContents',
      'angularTyper.pageNumber'
    ])
    .run(runBlock);

  runBlock.$inject = ['$rootScope'];

  function runBlock($rootScope) {
    $rootScope.headings = [];
  }

})();