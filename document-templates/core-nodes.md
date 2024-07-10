<!--
# How to use this template

1. Make a new branch. If working on an internal ticket, include it at the start of the name. For example, DOC-123-feature-summary.
2. Create a new file, or find the file you want to edit, in integrations/builtin/core-nodes/. If creating a new file, pay attention to the naming conventions: it should match the node name in the codex file. 
3. Copy the template into the file (don't copy this comment).
4. Placeholder text is in _italic_ or between <>. Make sure to replace it! 
5. Before publishing, delete any comments.

Use the style guide: https://github.com/n8n-io/n8n-docs/wiki
You can find more info on working with the docs project in the README: https://github.com/n8n-io/n8n-docs/blob/main/README.md

-->

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: _Name_
description: Documentation for the _Name_ node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

<!-- 
The title should be the name of the node. Add "trigger" if it's a core trigger node. For example:
Item Lists
Local File trigger
-->
# _Name_

_Briefly summarize the functionality._

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/_Name_/).
///



## Node parameters

## Node options


<!-- 
Add any other sections here. 
You should include: quirks, pain points, complex topics that trip people up
You should not include: basic usage examples
-->

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, page) ]]

<!--Add the snippet below if the core node includes value1 > data type > value2 comparisons-->
--8<-- "_snippets/integrations/builtin/core-nodes/data-types.md"
