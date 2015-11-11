(function() {
  'use strict';

  angular.module('angularTyper')

  .factory('fetchFiles', function($templateRequest, $sce, $q, $http) {

    function extractUrls(path, item) {

      // item can be String, Array or Object

      if (typeof item === 'string') {
        return [path + '/' + item];
      } else if (typeof item === 'object') {

        if (Array.isArray(item)) {
          return [].concat.apply([], item.map(function(i) {
            return extractUrls(path, i);
          }));
        } else {
          // Object should be dictionary
          return [].concat.apply([], Object.keys(item).map(function(i) {
            return extractUrls('/' + path + i, item[i]);
          }));
        }

      } else {
        console.error('invalid type');
      }
    }

    return {
      html: function(parts) {
        var urls = extractUrls('', parts);

        var promises = [];

        urls.forEach(function(template) {
          var templateUrl = $sce.getTrustedResourceUrl(template);
          promises.push($templateRequest(templateUrl));
        });

        return $q.all(promises);
      },
      file: function(parts) {
        var urls = extractUrls('', parts);

        var promises = [];

        urls.forEach(function(url) {
          promises.push($http.get(url));
        });

        return $q.all(promises);
      }
    };


    /*return function(parts) {
      var urls = [];

      function extractUrls(start, parts) {
        switch (typeof parts) {
          case 'string':
            urls.push(start + parts);
            break;

          case 'object':
            if (Array.isArray(parts)) {
              parts.forEach(function(part) {
                extractUrls(start, part);
              });
            } else {
              for (var key in parts) {
                extractUrls(start + key + '/', parts[key]);
              }
            }
            break;

          default:
            console.log(parts);
            console.error('invalid type');
        }
      }
      extractUrls('', parts);


      var promises = [];

      urls.forEach(function(template) {
        var templateUrl = $sce.getTrustedResourceUrl(template);
        promises.push($templateRequest(templateUrl));
      });

      return $q.all(promises);*/

  });

})();
