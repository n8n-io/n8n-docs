---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Structure of the node base file
description: A reference document detailing the basic structure of the node base file.
contentType: reference
---

# Structure of the node base file

The node base file follows this basic structure:

1. Add import statements.
2. Create a class for the node.
3. Within the node class, create a `description` object, which defines the node.

A programmatic-style node also has an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the `properties` object, within `descriptions`.

## Outline structure for a declarative-style node

This code snippet gives an outline of the node structure. 

```js
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details here
		properties: [
			// Resources and operations here
		]
	};
}
```
Refer to [Standard parameters](/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/) for information on parameters available to all node types. Refer to [Declarative-style parameters](/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters/) for the parameters available for declarative-style nodes.

## Outline structure for a programmatic-style node

This code snippet gives an outline of the node structure. 

```js
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
    // Basic node details here
    properties: [
      // Resources and operations here
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Process data and return
  }
};
```

Refer to [Standard parameters](/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/) for information on parameters available to all node types. Refer to [Programmatic-style parameters](/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters/) and [Programmatic-style execute method](/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method/) for more information on working with programmatic-style nodes.