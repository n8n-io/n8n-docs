---
title: Pushcut Trigger node documentation
description: >-
  Learn how to use the Pushcut Trigger node in n8n. Follow technical
  documentation to integrate Pushcut Trigger node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Pushcut Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.pushcuttrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.pushcuttrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.pushcuttrigger
layout:
  description:
    visible: false
---

# Pushcut Trigger node <a href="#pushcut-trigger-node" id="pushcut-trigger-node"></a>

[Pushcut](https://pushcut.io) is an app for iOS that lets you create smart notifications to kick off shortcuts, URLs, and online automation.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/pushcut.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Pushcut Trigger integrations](https://n8n.io/integrations/pushcut-trigger/) page.
{% endhint %}

## Configure a Pushcut action <a href="#configure-a-pushcut-action" id="configure-a-pushcut-action"></a>

Follow these steps to configure your Pushcut Trigger node with your Pushcut app.

1. In your Pushcut app, select a notification from the **Notifications** screen.
2. Select the **Add Action** button.
3. Enter an action name in the **Label** field.
4. Select the **Server** tab.
5. Select the **Integration** tab.
6. Select **Integration Trigger**.
7. In n8n, enter a name for the action and select **Execute step**.
8. Select this action under the **Select Integration Trigger** screen in your Pushcut app.
9. Select **Done** in the top right to save the action.
