---
title: RSS Read
description: Documentation for the RSS Read node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# RSS Read

The RSS Read node is used to read data from RSS feeds published on the internet.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [RSS Read integrations](https://n8n.io/integrations/rss-read/){:target=_blank .external-link} page.
///

## Node Reference

The RSS Read node has only one property:

- *URL* field: This field is used to specify the web address of the RSS publication.

## Example Usage

This workflow allows you to read an RSS Feed using the RSS Read node. You can also find the [workflow](https://n8n.io/workflows/583){:target=_blank .external-link} on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [RSS Read]()


The final workflow should look like the following image.

![A workflow with the RSS Read node](/_images/integrations/builtin/core-nodes/rssfeedread/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. RSS Read node

1. Enter the URL of the RSS feed that you want to read in the *URL* field.
2. Click on *Execute Node* to run the workflow.

## Related resources

n8n provides a trigger node for RSS Read. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.rssfeedreadtrigger/).

View [example workflows and related content](https://n8n.io/integrations/rss-read/){:target=_blank .external-link} on n8n's website.



