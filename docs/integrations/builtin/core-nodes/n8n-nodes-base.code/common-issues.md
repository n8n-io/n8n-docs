---
title: Code node common issues 
description: Documentation for common issues and questions in the Code node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: high
---

# Code node common issues

Here are some common errors and issues with the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) and steps to resolve or troubleshoot them.

<!-- vale off -->
## Code doesn't return items properly
<!-- vale on -->

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

* Read the [data structure](/data/data-structure.md) to understand the data you receive in the Code node and the requirements for outputting data from the node.
* Understand how data items work and how to connect data items from previous nodes with [item linking](/data/data-mapping/data-item-linking/index.md).

<!-- vale off -->
## A 'json' property isn't an object
<!-- vale on -->

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

## Code doesn't return an object

This error may occur when your Code node doesn't return anything or if it returns an unexpected result.

To resolve this, ensure that your Code node returns the [expected data structure](/data/data-structure.md):

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

## 'import' and 'export' may only appear at the top level

This error occurs if you try to use `import` or `export` in the Code node. These aren't supported by n8n's JavaScript sandbox. Instead, use the `require` function to load modules.

To resolve this issue, try changing your `import` statements to use `require`:

```javascript
// Original code:
// import express from "express";
// New code:
const express = require("express");
```

<!-- vale off -->
## Cannot find module '&lt;module&gt;'
<!-- vale on -->

This error occurs if you try to use `require` in the Code node and n8n can't find the module.

/// warning | Only for self-hosted
n8n doesn't support importing modules in the [Cloud](/manage-cloud/overview.md) version.
///

If you're [self-hosting](/hosting/index.md) n8n, follow these steps:

* Install the module into your n8n environment.
	* If you are running n8n with [npm](/hosting/installation/npm.md), install the module in the same environment as n8n.
	* If you are running n8n with [Docker](/hosting/installation/docker.md), you need to extend the official n8n image with a [custom image](https://docs.docker.com/build/building/base-images/) that includes your module.
* Set the `NODE_FUNCTION_ALLOW_BUILTIN` and `NODE_FUNCTION_ALLOW_EXTERNAL` [environment variables](/hosting/configuration/configuration-examples/modules-in-code-node.md) to allow importing modules.

## Using global variables

Sometimes you may wish to set and retrieve simple global data related to a workflow across and within executions. For example, you may wish to include the date of the previous report when compiling a report with a list of project updates.

To set, update, and retrieve data directly to a workflow, use the [static data](/code/cookbook/builtin/get-workflow-static-data.md) functions within your code. You can manage data either globally or tied to specific nodes.

/// info | Use Remove Duplicates when possible
If you're interested in using variables to avoid processing the same data items more than once, consider using the [Remove Duplicates node](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/index.md) instead. The Remove Duplicates node can save information across executions to avoid processing the same items multiple times.
///
