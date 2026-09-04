// A heading glued directly to a preceding "{% endhint %}" tag (no blank
// line in between) can fail to render on the live site, showing raw "##"
// markdown syntax instead of a heading. Confirmed live on 5 pages; not
// deterministic (11 other instances of the identical byte pattern rendered
// fine), so we fix and lint for all instances rather than only known-broken
// ones.
//
// Scoped to "{% endhint %}" specifically: other block tags (e.g. "{% step
// %}", "{% column %}") have their own "first line is a title" behavior and
// render a glued heading correctly as a styled title, not as broken text.
//
// Uses the micromark token stream (parser: "micromark") rather than a raw
// line scan: it only emits an "atxHeading" token for a heading markdownlint
// itself recognizes as a real heading, so one written inside a fenced code
// example (e.g. to illustrate this exact bug in a style guide) is already
// excluded, with no need to track fence delimiters by hand.
const endhintPattern = /^\{%\s*endhint\s*%\}$/;

module.exports = {
  names: ["heading-blank-line-after-endhint"],
  description: "A heading right after \"{% endhint %}\" needs a blank line above it",
  tags: ["headings", "blank_lines"],
  parser: "micromark",
  function: function rule(params, onError) {
    const lines = params.lines;

    for (const token of params.parsers.micromark.tokens) {
      if (token.type !== "atxHeading" || token.startLine <= 1) {
        continue;
      }

      const previous = lines[token.startLine - 2];
      if (endhintPattern.test(previous.trim())) {
        onError({
          lineNumber: token.startLine,
          detail: "Add a blank line above this heading.",
          context: token.text,
        });
      }
    }
  },
};
