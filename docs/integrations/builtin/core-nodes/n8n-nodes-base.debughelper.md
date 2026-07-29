---
title: Debug Helper
description: >-
  Documentation for the Debug Helper node in n8n, a workflow automation
  platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Debug Helper
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.debughelper.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.debughelper'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.debughelper'
layout:
  description:
    visible: false
---

# Debug Helper <a href="#debug-helper" id="debug-helper"></a>

Use the Debug Helper node to trigger different error types or generate random datasets to help test n8n workflows.

## Operations <a href="#operations" id="operations"></a>

Define the operation by selecting the **Category**:

* **Do Nothing**: Don't do anything.
* [**Throw Error**](#throw-error): Throw an error with the specified type and message.
* [**Out Of Memory**](#out-of-memory): Generate a specific memory size to simulate being out of memory.
* [**Generate Random Data**](#generate-random-data): Generate some random data in a selected format.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

The node parameters depend on the **Category** selected. The **Do Nothing** Category has no other parameters.

### Throw Error <a href="#throw-error" id="throw-error"></a>

* **Error Type**: Select the type of error to throw. Choose from:
	* **NodeApiError**
	* **NodeOperationError**
	* **Error**
* **Error Message**: Enter the error message to throw.

### Out Of Memory <a href="#out-of-memory" id="out-of-memory"></a>

The Out of Memory Category adds one parameter, the **Memory Size to Generate**. Enter the approximate amount of memory to generate.

### Generate Random Data <a href="#generate-random-data" id="generate-random-data"></a>

* **Data Type**: Choose the type of random data you'd like to generate. Options include:
	* **Address**
	* **Coordinates**
	* **Credit Card**
	* **Email**
	* **IPv4**
	* **IPv6**
	* **MAC**
	* **Nanoids**: If you select this data type, you'll also need to enter:
		* **Nanoid Alphabet**: The alphabet the generator will use to generate the nanoids.
		* **Nanoid Length**: The length of each nanoid.
	* **URL**
	* **User Data**
	* **UUID**
	* **Version**
* **Seed**: If you'd like to generate the data using a specific seed, enter it here. This ensures the data gets generated consistently. If you'd rather use random data generation, leave this field empty.
* **Number of Items to Generate**: Enter the number of random items you'd like to generate.
* **Output as Single Array**: Whether to generate the data as a single array (turned on) or multiple items (turned off).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Debug Helper integration templates](https://n8n.io/integrations/debughelper) or [search all templates](https://n8n.io/workflows/)
