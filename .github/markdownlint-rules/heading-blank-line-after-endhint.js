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
const headingPattern = /^#{1,6}\s/;
const endhintPattern = /^\{%\s*endhint\s*%\}$/;

module.exports = {
  names: ["heading-blank-line-after-endhint"],
  description: "A heading right after \"{% endhint %}\" needs a blank line above it",
  tags: ["headings", "blank_lines"],
  parser: "none",
  function: function rule(params, onError) {
    const lines = params.lines;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!headingPattern.test(line)) {
        continue;
      }

      const previous = lines[i - 1];
      if (endhintPattern.test(previous.trim())) {
        onError({
          lineNumber: i + 1,
          detail: "Add a blank line above this heading.",
          context: line.trim(),
        });
      }
    }
  },
};
