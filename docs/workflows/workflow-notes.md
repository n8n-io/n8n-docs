# Workflow notes

Workflow notes allow you to annotate and comment on your workflows.

We encourage using workflow notes heavily, especially on template workflows, to help other users understand your workflow.

## Create a note

Workflow notes are a type of core node. To add a new note:

1. Open the nodes panel.
2. Search for `note`.
3. Click the **Note** node. n8n adds a new note to the canvas.

## Edit a note

1. Double click the note you want to edit.
2. Write your note. [This guide](https://commonmark.org/help/) explains how to format your text with Markdown. n8n uses [markdown-it](https://github.com/markdown-it/markdown-it), which implements the CommonMark specification. 
3. Click away from the note, or press `Esc`, to stop editing.

## Note positioning

You can:

* Drag a note anywhere on the canvas.
* Drag notes behind nodes. You can use this to visually group nodes.
* Resize notes by hovering over the edge of the note and dragging to resize.

## Writing in Markdown

Workflow notes support Markdown formatting. This section describes some common options.

```
The text in double asterisks will be **bold**

The text in single asterisks will be *italic*

Use # to indicate headings:
# This is a top-level heading
## This is a sub-heading
### This is a smaller sub-heading

You can add links:
[Example](https://example.com/)

Create lists with asterisks:

* Item one
* Item two

Or created ordered lists with numbers:

1. Item one
2. Item two
```

For a more detailed guide, refer to [CommonMark's help](https://commonmark.org/help/). n8n uses [markdown-it](https://github.com/markdown-it/markdown-it), which implements the CommonMark specification.