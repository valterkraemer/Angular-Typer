(function() {
  'use strict';

  angular.module('superBook', [
    'angularTyper'
  ])

  .constant('config', {

    parts: {
      content: [
        'table-of-content.html',
        'chapter-1.html',
        'chapter-2.html'
      ]
    },

    bibTex: {
      bibliography: [
        'references.bib',
        'lahteet.bib'
      ]
    }

  })

  .constant('details', {
    author: "Valter Kraemer",
    title: "Angular-Typer",
    subheading: "Documentation",
    date: "October 13, 2014",
    pages: 0, // 0 = auto
    major: "Media tech",
    code: "T3004",
    supervisor: "Dale Gribble",
    mentor: "Rusty Shackleford (Department name)",
    synopsis: "This is the documentation and demo for Angular-Typer",
    keywords: "Angular-Typer, Some, Other, Keywords",
  })

  .run(function(bibliograpySvc, $timeout, tableOfContentsSvc) {
    $timeout(function() {

    },1000);
  });

})();

/*

 */