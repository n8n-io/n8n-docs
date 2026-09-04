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
