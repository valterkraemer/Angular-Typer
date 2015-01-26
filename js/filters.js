angular.module('filters', [])

.run(function($rootScope) {
  $rootScope.cites = {}
})

.filter('citep', function(bib, $rootScope) {
  return function(input) {
    if (bib[input]) {
      if (!$rootScope.cites[input]) {
        $rootScope.cites[input] = bib[input];
      }

      var authors = bib[input].author.split(",");
      var firstAuthor = authors[0];
      var name = firstAuthor.split(" ");
      var lastname = name[name.length-1];
      var etAl = "";

      if (authors.length > 1) {
        etAl = " et al.";
      }
      return "(" + lastname + etAl + " " + bib[input].year + ")";

    } else {
      return "('" + input + "' not found in bibliography)";
    }
  };
})

.filter('cite', function(bib, $rootScope) {
  return function(input) {
    if (bib[input]) {
      if (!$rootScope.cites[input]) {
        $rootScope.cites[input] = bib[input];
      }

      var authors = bib[input].author.split(",");
      var firstAuthor = authors[0];
      var name = firstAuthor.split(" ");
      var lastname = name[name.length-1];
      var etAl = "";

      if (authors.length > 1) {
        etAl = " et al.";
      }
      return lastname + etAl + " (" + bib[input].year + ")";

    } else {
      return "('" + input + "' not found in bibliography)";
    }
  };
})

.filter('s', function(bib) {
  return function(input) {
    if (input[0] == "(") {
      return input.replace(" ", "'s ");
    } else {
      return input.replace(" (", "'s (");
    }
  };
})

.filter('details', function(details) {

  return function(input) {
    if (details[input]) {
      return details[input];
    } else {
      return "('" + input + "' not found in details)";
    }
  };
})

.filter('fig', function(bib, $rootScope) {
  return function(input) {
    return "Fig " + $rootScope.figures[input];
  }
})
