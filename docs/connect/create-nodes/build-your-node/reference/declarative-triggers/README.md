---
description: Build polling and webhook trigger nodes without trigger code, by describing the trigger in the node description.
status: preview
tags:
  - tag: preview
    primary: true
layout:
  description:
    visible: false
---

# Declarative triggers

A declarative trigger is a trigger node you build without writing trigger code: you describe the trigger in the `trigger` object of the node description, and n8n builds the trigger methods from it when it loads the node.

{% hint style="info" %}
**Preview status**

Declarative triggers are in Preview. The configuration format may change in a later n8n version, so don't rely on it for production nodes yet. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

{% hint style="info" %}
**Feature availability**

Declarative triggers are available from n8n 3.0.0.
{% endhint %}

## Declarative trigger types

There are two types of declarative trigger:

* **Polling triggers** (`type: 'polling'`) send a request on a schedule and emit only the new items. n8n builds the `poll()` method for you.
* **Webhook triggers** (`type: 'webhook'`) register a webhook with a service and handle each incoming request. n8n builds `webhookMethods.default` and the `webhook()` method for you.

Both types send their requests with the same `routing` format as [declarative-style action nodes](../base-files/declarative-style-parameters.md). `requestDefaults`, credentials, and `postReceive` actions work the same way in these requests. The webhook handler is different, because it shapes an incoming request instead of a response. Refer to [Webhook triggers](webhook-triggers.md) for details.

This section assumes you know how to build a declarative-style node. If you don't, start with [Build a declarative-style node](../../tutorial-build-a-declarative-style-node.md).

## Requirements for declarative triggers

To build a declarative trigger, you need:

* n8n 3.0.0. Your package declares this with node API version `3.1`. Refer to [Declare the node API version](#declare-the-node-api-version).
* `n8n-workflow` from n8n 3.0.0 in your `devDependencies`. With an older version, `trigger` isn't part of `INodeTypeDescription` and your node doesn't compile.

### Declare the node API version

Declare node API version `3.1` in the `n8n` section of your `package.json`:

```json
{
	"n8n": {
		"n8nNodesApiVersion": "3.1",
		"nodes": ["dist/nodes/ExampleTrigger/ExampleTrigger.node.js"]
	}
}
```

Write the value as the string `"3.1"`. n8n rejects the number `3.1` as an invalid version.

n8n doesn't check this declaration when it loads the node. The declaration lets n8n versions without declarative triggers refuse your package:

* From n8n 2.44.0, a version without declarative triggers refuses the package with this message: "This community node isn't compatible with your version of n8n. Update n8n to use it."
* Versions before n8n 2.44.0 either refuse the package with a different error or install it. When they install it, the trigger does nothing.

## Create a declarative trigger with the n8n-node tool

The [`n8n-node` tool](../../using-the-n8n-node-tool.md) has a template for each declarative trigger type. Each template sets node API version `3.1` and includes a working example node for a placeholder API:

```shell
# Scaffold a polling trigger
n8n-node new n8n-nodes-<your-node-name> --template declarative/polling-trigger

# Scaffold a webhook trigger
n8n-node new n8n-nodes-<your-node-name> --template declarative/webhook-trigger
```

## Write your own trigger methods

Your node class can still define its own trigger methods. A method the class defines always wins over the method n8n builds:

* **Polling triggers:** if the class defines `poll()`, n8n uses it and ignores the `trigger` configuration.
* **Webhook triggers:** n8n replaces the webhook lifecycle methods one at a time. For example, if the class defines only `webhookMethods.default.checkExists`, n8n uses your `checkExists` and builds `create` and `delete` from the configuration. If the class defines `webhook()`, your method handles all incoming requests and n8n ignores `handler`.

For a [versioned node](../versioning.md), n8n builds the methods only for the versions whose description has a `trigger` object.

## Expressions in declarative triggers resolve in one pass

n8n resolves each configured expression once. Values that come from a request or a response are data, not expressions. For example, if a service returns `"id": "={{ 1 + 1 }}"`, n8n stores the text `={{ 1 + 1 }}`, not `2`.

This applies to every place a declarative trigger reads external data, including polling `postReceive` actions and the webhook `store`, `matchOn`, and handler stages.

## In this section

* [Polling triggers](polling-triggers.md): check an API for new items on a schedule, using a cursor to skip items the trigger already emitted.
* [Webhook triggers](webhook-triggers.md): register a webhook with a service, then verify, filter, and turn each incoming request into items.

## Related resources

* [Node building reference](../)
* [Declarative-style parameters](../base-files/declarative-style-parameters.md)
* [Choose your node building approach](../../../plan-your-node/choose-a-node-building-style.md)
* [Using the n8n-node tool](../../using-the-n8n-node-tool.md)
