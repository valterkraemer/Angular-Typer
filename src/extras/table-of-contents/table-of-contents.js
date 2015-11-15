(function() {
  'use strict';

  angular
    .module('angularTyper.tableOfContents', [])
    .service('tableOfContentsSvc', tableOfContentsSvc);

  function tableOfContentsSvc() {

    var headings = [];
    var indexes = {
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0
    };

    return {
      register: function(level, name, functions) {

        if (level < 5) indexes.h5 = 0;
        if (level < 4) indexes.h4 = 0;
        if (level < 3) indexes.h3 = 0;
        if (level < 2) indexes.h2 = 0;

        if (level === 5) indexes.h5 += 1;
        if (level === 4) indexes.h4 += 1;
        if (level === 3) indexes.h3 += 1;
        if (level === 2) indexes.h2 += 1;
        if (level === 1) indexes.h1 += 1;

        var chapter = '';
        if (level >= 1) chapter += indexes.h1;
        if (level >= 2) chapter += '.' + indexes.h2;
        if (level >= 3) chapter += '.' + indexes.h3;
        if (level >= 4) chapter += '.' + indexes.h4;
        if (level >= 5) chapter += '.' + indexes.h5;

        var item = {
          name: name,
          chapter: chapter,
          level: level,
          page: 1,
          setPage: function(number) {
            this.page = number;
          }
        };

        headings.push(item);

        return item;
      },

      setPage: function() {

      },

      getHeadings: function() {
        return headings;
      }
    };
  }

})();