(function() {
  'use strict';

  angular
    .module('angularTyper.file')
    .factory('FileSvc', FileSvc);

  FileSvc.$inject = ['$templateRequest', '$sce', '$q', '$http'];

  function FileSvc($templateRequest, $sce, $q, $http) {
    var htmlPaths = [];

    return {
      addHtmlPath: addHtmlPath,
      getHtml: getHtml,
      getFiles: getFiles
    };

    function addHtmlPath(path) {
      htmlPaths.push(path);
    }

    function getHtml() {
      var promises = [];

      htmlPaths.forEach(function(path) {
        var templateUrl = $sce.getTrustedResourceUrl(path);
        promises.push($templateRequest(templateUrl));
      });

      return $q.all(promises);
    }

    function getFiles(paths) {
      var promises = [];

      paths.forEach(function(url) {
        promises.push($http.get(url));
      });

      return $q.all(promises);
    }

  }

})();