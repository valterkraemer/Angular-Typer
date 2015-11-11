(function() {
  'use strict';

  angular.module('angularTyper.bibliograpy', [])

  .service('bibliograpySvc', function(config, fetchFiles, $q) {

    var deferred = $q.defer();

    // citationKey
    // entryType
    // entryTags

    var bibliograpy;

    fetchFiles.file(config.bibTex).then(function(data) {

      var filedata = data.map(function(file) {
        return file.data;
      }).join();

      bibliograpy = bibtexParse.toJSON(filedata);

      deferred.resolve(bibliograpy);
    });



    return {
      getByKey: function(key) {

        return deferred.promise.then(function(data) {

          var results = bibliograpy.filter(function(obj) {
            return obj.citationKey === key;
          });

          if (results.length) {
            if (results.length > 1) {
              console.warn('Multiple citations with key "' + key + '"');
            }
            return results[0].entryTags;
          } else {
            console.error('No entry with key "' + key + '"');
          }

        });

      }
    };

  });

})();
