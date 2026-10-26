---
description: Create, test, and submit workflow templates to the n8n template library.
layout:
  description:
    visible: false
---

# Create workflow templates

Share workflows that solve practical problems by submitting them to the [n8n template library](https://n8n.io/workflows/).

A template includes a workflow and setup instructions. Someone else should be able to import it, follow your instructions, and get the expected result. The Creator portal generates the title and description automatically, so you don't need to write them.

## In this section

* [Template submission guidelines](submission-guidelines.md): Choose a useful problem, review your work, and test the workflow before submitting it.
* [Add sticky notes to templates](sticky-note-guidelines.md): Explain the workflow and its setup on the canvas.
* [Workflow template ideas](workflow-template-ideas.md): Find a use case and develop it into a complete solution.

## Submit a template

You need a [creator account](https://creators.n8n.io/register) to submit templates.

1. Check the [submission guidelines](submission-guidelines.md) and choose a use case that adds value to the library.
2. Build your workflow. Give nodes descriptive names and add the required sticky notes.
3. Test the workflow from start to finish, including the paths and inputs your instructions cover.
4. [Export the workflow as JSON](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/export-and-import). Remove secrets, personal data, and references to your accounts or resources.
5. Import that JSON into a fresh workflow. Follow your own setup instructions and check the output. Fix any missing setup steps or dependencies.
6. Sign in to the [Creator Dashboard](https://creators.n8n.io/login) and submit the JSON.

{% hint style="info" %}
**AI assistance is welcome**

You can use AI to build workflows and write setup instructions. Review every part, test the exported workflow, and correct the instructions before submitting. You're responsible for the result.
{% endhint %}

## Template review

n8n reviews submissions against the template guidelines. If your template meets the requirements, n8n publishes it and sends you a confirmation email. If it needs changes, n8n sends feedback by email.

New creators can submit one template at a time. Wait until n8n approves your submission before submitting another.

After n8n approves three of your templates, you become a verified creator. Verified creators receive a badge on the website, can submit batches of up to four templates, and can offer paid templates.

## Offer paid templates

You must become a verified creator before you can offer paid templates. The same quality, testing, and documentation requirements apply to free and paid templates.

You're responsible for tracking payments, delivering the template after someone buys it, and keeping it accessible to the buyer. Failure to deliver a paid template may result in account suspension or a ban.

## Related resources

* [Contribute to n8n](../)
* [Create nodes](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes)
* [Contribution guide for n8n Docs](../contribution-guide-for-n8n-docs/README.md)
* [Where to get help](../where-to-get-help.md)
* [Use workflow templates](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/use-templates)
