---
title: Code node common issues
contentType:
  - integration
  - reference
priority: high
nodeTitle: Code node common issues
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.code/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code/common-issues
description: >-
  Documentation for common issues and questions in the Code node in n8n, a
  workflow automation platform. Includes details of the issue and suggested
  solutions.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Common issues

Here are some common errors and issues with the [Code node](./) and steps to resolve or troubleshoot them.

## Code doesn't return items properly <a href="#code-doesnt-return-items-properly" id="code-doesnt-return-items-properly"></a>

This error occurs when the code in your Code node doesn't return data in the expected format.

In n8n, all data passed between nodes is an array of objects. Each of these objects wraps another object with the `json` key:

```javascript
[
  {
    "json": {
	  // your data goes here
	}
  }
]
```

To troubleshoot this error, check the following:

* Read the [data structure](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/understand-n8ns-data-structure) to understand the data you receive in the Code node and the requirements for outputting data from the node.
* Understand how data items work and how to connect data items from previous nodes with [item linking](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/reference-data/link-data-items).

## A 'json' property isn't an object <a href="#a-json-property-isnt-an-object" id="a-json-property-isnt-an-object"></a>

This error occurs when the Code node returns data where the `json` key isn't pointing to an object.

This may happen if you set `json` to a different data structure, like an array:

```javascript
[
  {
    "json": [
	  // Setting `json` to an array like this will produce an error
	]
  }
]
```

To resolve this, ensure that the `json` key references an object in your return data:

```javascript
[
  {
    "json": {
	  // Setting `json` to an object as expected
	}
  }
]
```

## Code doesn't return an object <a href="#code-doesnt-return-an-object" id="code-doesnt-return-an-object"></a>

This error may occur when your Code node doesn't return anything or if it returns an unexpected result.

To resolve this, ensure that your Code node returns the [expected data structure](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/understand-n8ns-data-structure):

```javascript
[
  {
    "json": {
	  // your data goes here
	}
  }
]
```

This error may also occur if the code you provided returns `'undefined'` instead of the expected result. In that case, ensure that the data you are referencing in your Code node exists in each execution and that it has the structure your code expects.

## 'import' and 'export' may only appear at the top level <a href="#import-and-export-may-only-appear-at-the-top-level" id="import-and-export-may-only-appear-at-the-top-level"></a>

This error occurs if you try to use `import` or `export` in the Code node. These aren't supported by n8n's JavaScript sandbox. Instead, use the `require` function to load modules.

To resolve this issue, try changing your `import` statements to use `require`:

```javascript
// Original code:
// import express from "express";
// New code:
const express = require("express");
```

## Cannot find module '\<module>' <a href="#cannot-find-module-andltmoduleandgt" id="cannot-find-module-andltmoduleandgt"></a>

This error occurs if you try to use `require` in the Code node and n8n can't find the module.

{% hint style="warning" %}
**Only for self-hosted**

n8n doesn't support importing modules in the [Cloud](../../../../../manage-cloud/overview.md) version.
{% endhint %}

If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n, follow these steps:

* Install the module into your n8n environment.
  * If you are running n8n with [npm](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/install-options/install-with-npm), install the module in the same environment as n8n.
  * If you are running n8n with [Docker](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/install-options/install-with-docker), you need to extend the official n8n image with a [custom image](https://docs.docker.com/build/building/base-images/) that includes your module.
* Set the `NODE_FUNCTION_ALLOW_BUILTIN` and `NODE_FUNCTION_ALLOW_EXTERNAL` [environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-modules-in-code-node) to allow importing modules.

## Using global variables <a href="#using-global-variables" id="using-global-variables"></a>

Sometimes you may wish to set and retrieve simple global data related to a workflow across and within executions. For example, you may wish to include the date of the previous report when compiling a report with a list of project updates.

To set, update, and retrieve data directly to a workflow, use the [static data](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/cookbook/built-in-methods-and-variables-examples/getworkflowstaticdata) functions within your code. You can manage data either globally or tied to specific nodes.

{% hint style="info" %}
**Use Remove Duplicates when possible**

If you're interested in using variables to avoid processing the same data items more than once, consider using the [Remove Duplicates node](../n8n-nodes-base.removeduplicates/) instead. The Remove Duplicates node can save information across executions to avoid processing the same items multiple times.
{% endhint %}

## Can't access credentials in a code node <a href="#cant-access-credentials-in-a-code-node" id="cant-access-credentials-in-a-code-node"></a>

By design, Code nodes can't access credentials. They don't have access to n8n’s internal credential management system. This prevents exposure of sensitive authentication data.

Attempts to reference credentials in a Code node using expressions or methods like `this.getCredentials()` or `$getCredentials()` will result in errors, such as `this.getCredentials is not a function` and `$getCredentials is not defined`.

If you need to make authenticated API calls, use the [HTTP Request node](../n8n-nodes-base.httprequest/) which provides credential support.

To work with credentials dynamically, handle the credential selection logic outside of the Code node:

* Use a [Switch](../n8n-nodes-base.switch.md) node to route to different nodes with different credentials.
* Use expressions directly in credential fields to select credentials dynamically based on previous node data.
* Use an HTTP Request node with Custom Auth to dynamically set headers, query parameters, or body values using expressions.
