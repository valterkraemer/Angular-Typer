# Angular-Typer

The idea of this project is to be able to write documents in HTML with similar functionality as LATEX.

Examples:

if 'criteria' is defined in your bibliography.js file (similar to BibTex) and you type

{{'criteria' | cite}} it will change to e.g. Hartson et al. (2001) and will be included in the sources list.

Or if you have inserted a figure into the document with

< figure name="design2evaluation" width="40%" src="img/design2evaluation.png" text="Development process">< /figure>

You can reference to it in your text with {{'design2evaluation' | fig}} which will change to e.g. Fig 2

If you use header tags (< h1>, < h2>, < h3>) the headings will be added to the table of contents with the appropriate page number.

I'm sorry that this project is poorly documented but I hope you get an idea what this is used for. I have already successfully used it for school submissions :)

Check out the [DEMO](http://valterkraemer.github.io/Angular-Typer/)
