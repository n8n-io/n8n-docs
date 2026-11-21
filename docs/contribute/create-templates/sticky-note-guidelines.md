---
description: Document template behavior, setup, and workflow sections with sticky notes.
layout:
  description:
    visible: false
---

# Add sticky notes to templates

Add sticky notes so someone can understand and set up your template from the workflow canvas.

Every template needs one main overview note. Workflows with four or more nodes also need section notes to group related nodes.

## Add the main overview note

Use one yellow note in the top-left corner of the canvas. Write from 100 to 300 words, using these headings:

* `### How it works`: Describe the workflow's purpose, trigger, main stages, and result.
* `### Setup`: List required accounts, credentials, resources, and values to configure.
* `### Customization`: Optionally explain useful changes someone can make.

Include enough context to use the workflow without returning to its library page. Explain who the workflow helps, what result it produces, and any limitations.

The following example shows the structure for a lead intake workflow. Adapt it to your own workflow and verify every step:

```markdown
### How it works
This workflow helps sales teams process incoming lead submissions. It checks
required fields, looks for an existing contact in HubSpot, and creates or updates
the matching record. It sends qualified leads to a Slack channel and routes
incomplete submissions for manual review. Matching by email avoids creating a
new contact for each submission from the same person.

### Setup
Connect your HubSpot and Slack credentials. In the configuration node, set the
destination channel and qualification rules. Configure your form to send the
expected name, email, and company fields to the workflow. Send a test submission,
then check the HubSpot record and Slack message. Also test an existing contact
and a submission with a missing email address before publishing the workflow.

### Customization
Change the qualification rules to match your sales process. Update the Slack
message to include the fields your team uses when reviewing a lead.
```

## Group nodes with section notes

For workflows with four or more nodes, use white notes, which appear gray in dark mode, to identify related sections.

Stretch each note to cover or label multiple nodes. Use a short heading, such as `## Validate lead data`, and up to two short lines if needed. Keep each note under 50 words.

Explain the purpose of a section rather than repeating every node's name. For example, describe which records qualify for a branch or why the workflow transforms a field.

## Highlight a critical setup step

You can use a red warning note to draw attention to a critical setup step or risk. Place it over the single node it concerns. Use warning notes sparingly.

For example, explain that someone must change a destination before running a node that sends a message.

## Add a walkthrough video

For a complex workflow or one aimed at beginners, consider adding a setup video. Keep the written instructions complete so someone can use the template without watching it.

To embed a YouTube video in a sticky note, use `@[youtube](RScKsGfrhs4)`, replacing `RScKsGfrhs4` with your video's ID.

You can use the [sticky note generation workflow](https://n8n.io/workflows/13868-auto-generate-sticky-notes-and-rename-nodes/) as a starting point. Review generated notes and node names against these requirements before submitting.

After adding notes, follow the [submission guidelines](submission-guidelines.md) to test and prepare your template.

## Related resources

* [Create workflow templates](./)
* [Template submission guidelines](submission-guidelines.md)
* [Workflow template ideas](workflow-template-ideas.md)
* [Add notes and documentation](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/workflow-components/add-notes-and-documentation)
