angular.module('details', [])

.constant('details', {
  author: "Valter Kraemer",
  title: "Angular-Typer",
  subheading: "Documentation",
  date: "", // "October 13, 2014", empty string for today's date
  pages: 0, // 0 = auto
  major: "Media tech",
  code: "T3004",
  supervisor: "Dale Gribble",
  mentor: "Rusty Shackleford (Department name)",
  synopsis: "This is the documentation and demo for Angular-Typer",
  keywords: "Angular-Typer, Some, Other, Keywords",
})

.constant('static', {
  university: "Mars University",
  school: "My School",
  programme: "My Programme",
  synopsisOf: ["SYNOPSIS OF", "MY THESIS"],
})
