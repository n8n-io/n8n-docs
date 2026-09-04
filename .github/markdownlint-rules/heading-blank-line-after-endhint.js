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
const fenceMarkerPattern = /^(`{3,}|~{3,})/;

module.exports = {
  names: ["heading-blank-line-after-endhint"],
  description: "A heading right after \"{% endhint %}\" needs a blank line above it",
  tags: ["headings", "blank_lines"],
  parser: "none",
  function: function rule(params, onError) {
    const lines = params.lines;
    // Track the exact fence delimiter (character + length) that opened the
    // current code fence, so a differently-fenced or shorter line inside it
    // (e.g. a "```" example nested in a "~~~" fence) doesn't prematurely
    // close it. A fence only closes on a matching character with a run at
    // least as long as the one that opened it, per CommonMark.
    let openFence = null;

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      const fenceMatch = trimmed.match(fenceMarkerPattern);

      if (fenceMatch) {
        const marker = fenceMatch[1];
        if (!openFence) {
          openFence = { char: marker[0], length: marker.length };
        } else if (marker[0] === openFence.char && marker.length >= openFence.length) {
          openFence = null;
        }
        continue;
      }

      if (openFence || i === 0 || !headingPattern.test(lines[i])) {
        continue;
      }

      const previous = lines[i - 1];
      if (endhintPattern.test(previous.trim())) {
        onError({
          lineNumber: i + 1,
          detail: "Add a blank line above this heading.",
          context: lines[i].trim(),
        });
      }
    }
  },
};
