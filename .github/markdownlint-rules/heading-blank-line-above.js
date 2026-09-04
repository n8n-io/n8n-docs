// A heading glued to the line above it (no blank line in between) can fail
// to render on the live site, showing raw "##" markdown syntax instead of a
// heading. GitBook's own MD022-equivalent isn't safe to use here unmodified:
// it can't distinguish that bug from the documented GitBook pattern where a
// heading is the first line inside a `{% hint %}` block, which GitBook
// renders as the hint's title, not a bug.
const headingPattern = /^(#{1,6})\s/;
const fencePattern = /^(`{3,}|~{3,})/;
const hintOpenPattern = /^\{%\s*hint\b[^%]*%\}\s*$/;

module.exports = {
  names: ["heading-blank-line-above"],
  description:
    "Headings need a blank line above them, unless they're the title of a hint block",
  tags: ["headings", "blank_lines"],
  parser: "none",
  function: function rule(params, onError) {
    const lines = params.lines;
    let inFence = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (fencePattern.test(line.trim())) {
        inFence = !inFence;
        continue;
      }
      if (inFence) {
        continue;
      }

      if (!headingPattern.test(line) || i === 0) {
        continue;
      }

      const previous = lines[i - 1];
      if (previous.trim() === "") {
        continue;
      }
      if (hintOpenPattern.test(previous.trim())) {
        continue;
      }

      onError({
        lineNumber: i + 1,
        detail: "Add a blank line above this heading.",
        context: line.trim(),
      });
    }
  },
};
