<!--
# How to use this template

1. Make a new branch. If working on an internal ticket, include it at the start of the name. For example, DOC-123-feature-summary.
2. Create a new file, or find the file you want to edit, in the `docs` directory. If creating a new file, use a short but descriptive filename since this will impact the URL slug of the page.
3. Copy the template into the file.
4. Placeholder text is in _italic_ or between <>. Make sure to replace it! 
5. Before publishing, delete any comments.
6. Add this page to the `nav.yml` file, using the same title as the one defined below (in the `title` front matter or the H1) or a shortened title if you want a more compact navigation title.

Use the style guide: https://github.com/n8n-io/n8n-docs/wiki
You can find more info on working with the docs project in the README: https://github.com/n8n-io/n8n-docs/blob/main/README.md

-->

<!--
Set the meta title and meta description in the frontmatter
The title here sets the title used in the browser window or tab, or when sharing a link to the content on various platforms.
-->

---
title: _Feature_
description: Documentation for common issues and questions in the _Name_ node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: explanation
---

<!-- 
In most cases, set the H1 heading the same as the `title` field above. This is the title as defined within the page itself.
-->

# _Feature_

<!--
Use the first paragraph or two after the title to provide a high-level summary of the feature. Start with a sentence or two of explanation, followed by additional info that hints at use cases, the problems it solves, or contexts where this is most relevant.

If you have a good screenshot of the feature in action, this is a good place to showcase it:

![Screenshot of feature x](/_images/path/to/screenshot.png)

-->

<!--
If the feature has limited access, this is a good place to include a note, like this:

/// note | Only for self-hosted
_Feature_ is only available on [self-hosted n8n instances](/hosting/index.md). Cloud and embed users can optionally...
///
-->

<!--

INDIVIDUAL SECTIONS TO CONSIDER:

The structure of your document is highly dependant on the feature itself, so no two feature pages are likely to have exactly the same needs. Below, each comment block contains a common section type that you should consider including for your features.

These are suggestions, so:

* Skip any section that isn't a good fit for your feature
* Don't limit yourself to the suggestions below if you need to include other information.

-->

<!--

## What is _Feature_

If the introduction summary is not enough to adequately describe your feature, you might benefit from including a separate section covering what exactly the feature is and what benefits it provides.

Use this to help readers solidify their conceptual understanding of the feature. This section might have overlap with the "How it works" section, so it may make sense to combine.

-->

<!--

## How _Feature_ works

This section provides a general user-level overview of how the feature actually works. This shouldn't cover the engineering implementation details, but should instead focus on helping users understand processes and interactions between components.

If the processes and components involved are complex, this section may benefit from diagrams or other visual aids to ensure that the reader can come away with the correct mental model.

-->

<!--

## Requirements

This section is useful for listing any knowledge, version, plan, or access requirements that users must satisfy before using (or in the case of knowledge, understanding) the feature.

This might not be necessary if the information is communicated in a note near the top of page.

-->

<!--

## Using _Feature_

This covers basic usage information for the feature. Use sub-sections liberally to make the information more digestible.

You may wish to include the following:

* Setting up / Configuring _feature_: A break down of less-straight-forward parts of configuration or setup. This might be important if it requires you to run or change external services like web server configuration or account access.
* Basic usage: generalized instructions for how users can use the feature, assuming a [happy path](https://en.wikipedia.org/wiki/Happy_path)
* How to _x_: how to achieve specific, common goals using the feature
* Using _y_option_: how to use certain parts of the feature that are not obvious from the UI

Generally, you don't need to include exhaustive guidance on every single thing you can do with a feature. The UI and feature design itself should hopefully make most things easy to learn. Focus your efforts (and the document) on information that's of high importance but low discoverability in the product.

-->

<!--

## Common issues
## Troubleshooting

You can use either of these two section names, depending on how you want to frame the content, to discuss how to resolve problems that users may experience.

Give each issue its own subheading:

### Problem 1
### Problem 2

Try to include specific error messages or descriptions that the user might see. This makes it more likely for users can discover this information through search.

For each issue:

* describe the observed problem or behavior
* provide a short explanation as to why this occurs
* give steps that a user can perform to fix, work around, or refactor their work

The goal of this section is to unblock the user, so try to remain solution-oriented.

-->

<!--

## Related resources

Use this section to link to additional resource. This may include related features, example templates, related nodes, or off-site resources.

Usually a bulleted list works pretty well using one of the following formats:

* Bare link:
	* [Resource one](https://example.com)
* Link with explanation:
	* [Resource one](https://example.com): Learn more about what authentication methods Service X supports.
* Sentence with link:
	* To learn more about the available modules, check out [service X's supported module list](http://example.com).

-->
