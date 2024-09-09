# Feature tests

Use this section to quickly check all docs site features are working when upgrading the theme.

For theme upgrade instructions, refer to Notion.

## Snippets

You should see an info box about the embed license:

--8<-- "_snippets/embed-license.md"

## Admonitions

/// note | This is a note
This is some note contents.
///

/// info | This is an info box
This is some info contents.
///

/// warning | This is a warning
This is some warning contents.
///

??? Details "This is an expanding details box"
	This is some expanding details contents.

## Images

### Inline images

Inline images like this should **not** expand on click: <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span>

If it expands on click, first check that the `off-glb` class has been applied. Refer to [MkDocs GLightbox | Disable by image](https://blueswen.github.io/mkdocs-glightbox/disable/image/){:target=_blank .external-link} for more information.

### Other images

Other images like this should expand on click:

![Screenshot of completed quickstart workflow](/_images/try-it-out/quickstart/very-quick-quickstart-workflow.png)

## Links

[This link should open in a new tab](https://example.com/){:target=_blank .external-link}

[This link should open in the same tab](/try-it-out/quickstart/)

## Instant previews

[This link should show a preview of the quickstart on hover](/try-it-out/quickstart/){ data-preview }

[This link should NOT show a preview on hover](/try-it-out/quickstart/)

## Embed Workflow

You should see an interactive workflow, similar to the templates pages or forum.
[[ workflowDemo("https://api.n8n.io/workflows/templates/655") ]]

## Templates Widget

You should see a list of three HTTP Request templates, followed by links to the integrations page on the website, and the templates search.
<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget('HTTP Request', 'http-request') ]]


## Glossary

You should see the AI Glossary below

--8<-- "_glossary/ai-glossary.md"
