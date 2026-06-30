---
title: Structure of the node base file
description: A reference document detailing the basic structure of the node base file.
contentType: reference
nodeTitle: Structure
originalFilePath: integrations/creating-nodes/build/reference/node-base-files/structure.md
originalUrl: >-
  https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/structure
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/reference/base-files/structure
layout:
  description:
    visible: false
---

# Structure of the node base file <a href="#structure-of-the-node-base-file" id="structure-of-the-node-base-file"></a>

The node base file follows this basic structure:

1. Add import statements.
2. Create a class for the node.
3. Within the node class, create a `description` object, which defines the node.

A programmatic-style node also has an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the `properties` object, within `descriptions`.

## Outline structure for a declarative-style node <a href="#outline-structure-for-a-declarative-style-node" id="outline-structure-for-a-declarative-style-node"></a>

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
Refer to [Standard parameters](standard-parameters.md) for information on parameters available to all node types. Refer to [Declarative-style parameters](declarative-style-parameters.md) for the parameters available for declarative-style nodes.

## Outline structure for a programmatic-style node <a href="#outline-structure-for-a-programmatic-style-node" id="outline-structure-for-a-programmatic-style-node"></a>

This code snippet gives an outline of the node structure. 

```js
import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

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

Refer to [Standard parameters](standard-parameters.md) for information on parameters available to all node types. Refer to [Programmatic-style parameters](programmatic-style-parameters.md) and [Programmatic-style execute method](programmatic-style-execute-method.md) for more information on working with programmatic-style nodes.
