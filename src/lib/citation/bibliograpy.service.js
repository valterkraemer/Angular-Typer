(function() {
  'use strict';

  angular
    .module('angularTyper.bibliograpy')
    .service('bibliograpySvc', bibliograpySvc);

  bibliograpySvc.$inject = ['FileSvc', '$rootScope'];

  function bibliograpySvc(FileSvc, $rootScope) {

    var bibTexSrcs = [];
    var cites = [];
    var bibtexScripts = document.querySelectorAll('meta[name="bibtex"]');

    for (var i = 0; i < bibtexScripts.length; i++) {
      bibTexSrcs.push(bibtexScripts[i].getAttribute('content'));
    }

    var promise = FileSvc.getFiles(bibTexSrcs).then(function(data) {
      var filedata = data.map(function(file) {
        return file.data;
      }).join();

      return bibtexParse.toJSON(filedata);
    });

    return {
      getByKey: getByKey,
      promise: promise
    };

    function getByKey(key) {
      
      return promise.then(function(bibliograpy) {

        var results = bibliograpy.filter(function(obj) {
          return obj.citationKey === key;
        });

        if (!results.length) {
          console.warn('No entry with key "' + key + '"');
          return;
        }

        if (results.length > 1) {
          console.warn('Multiple bibTex entries with key "' + key + '"');
          return;
        }

        if ($rootScope.vars.cites.indexOf(results[0].entryTags) === -1) {
          $rootScope.vars.cites.push(results[0].entryTags);
        }

        return results[0].entryTags;
      });
    }

  }
})();