---
title: ClickUp Trigger node documentation
description: >-
  Learn how to use the ClickUp Trigger node in n8n. Follow technical
  documentation to integrate ClickUp Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: ClickUp Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.clickuptrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.clickuptrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.clickuptrigger
layout:
  description:
    visible: false
---

# ClickUp Trigger node <a href="#clickup-trigger-node" id="clickup-trigger-node"></a>

[ClickUp](https://clickup.com/) is a cloud-based collaboration and project management tool suitable for businesses of all sizes and industries. Features include communication and collaboration tools, task assignments and statuses, alerts and a task toolbar.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/clickup.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [ClickUp Trigger integrations](https://n8n.io/integrations/clickup-trigger/) page.
{% endhint %}

## Events <a href="#events" id="events"></a>

* Key result
    * Created
    * Deleted
    * Updated
* List
    * Created
    * Deleted
    * Updated
* Space
    * Created
    * Deleted
    * Updated
* Task
    * Assignee updated
    * Comment
      * Posted
      * Updated
    * Created
    * Deleted
    * Due date updated
    * Moved
    * Status updated
    * Tag updated
    * Time estimate updated
    * Time tracked updated
    * Updated

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for ClickUp. You can find the node docs [here](../app-nodes/n8n-nodes-base.clickup.md).

View [example workflows and related content](https://n8n.io/integrations/clickup-trigger/) on n8n's website.

Refer to [ClickUp's documentation](https://developer.clickup.com/docs/authentication) for details about their API.
