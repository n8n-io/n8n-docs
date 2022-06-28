# Node base file

The node base file contains the core code of your node. All nodes must have a base file. The contents of this file are different depending on whether you're building a declarative-style or programmatic-style node. For guidance on which style to use, refer to [Choose your node building approach](/integrations/creating-nodes/plan/choose-node-method/).

This document gives short code snippets to help understand the code structure and concepts. For full walk-throughs of building a node, including real-world code examples, refer to [Build a declarative-style node](/integrations/creating-nodes/build/declarative-style-node/) or [Build a programmatic-style node](/integrations/creating-nodes/build/programmatic-style-node/).

You can also explore the [n8n-nodes-starter](){:target=_blank .external-link} and n8n's own [nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes){:target=_blank .external-link} for a wider range of examples. The starter contains basic examples that you can build on. The n8n [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost) is a good example of a more complex node, including versioning.


## Structure of the node base file

The node base file follows this basic structure:

1. Import statements
2. Create a class for the node
3. Within the node class, create a `description` object, which defines the node.

A programmatic-style node also has an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the `properties` object, within `descriptions`.

### Outline structure for a declarative-style node

This code snippet gives an outline of the node structure. 

```js
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class APOD implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details here
		properties: [
			// Resources and operations here
		]
	};
}
```

### Outline structure for a programmatic-style node

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

## Standard parameters

These parameters are the same for all node types.

### displayName

String. This is the name users see in the n8n GUI.

### name

### icon

### group

### description

String. A short description of the node. n8n uses this in the GUI.

### defaults

Object. [TODO: what is this actually for?]

The object can include:

* `name`: [TODO]
* `color`: Hex color code.

### inputs

[TODO: always seems to be main? Whut?]

### outputs

[TODO: always seems to be main? Whut?]

### credentials

Array of object. This parameter tells n8n the credential options. Each object defines an authentication type [TODO: is this changing with the current auth type overhaul?].

The object must include:

* `name`: the credential name. Must match the prefix of the credential file. For example, `asanaAPI` links to `AsanaApi.credential.ts`. [TODO: except they don't have to match case - in fact they usually don't. Why?]
* `required`: boolean. Specify whether authentication is required to use this node.

### requestDefaults

Object. Set up the basic information for API calls to the service this node integrates. [TODO: fix phrasing, this is horrible]

This object must include:

* `baseURL`: The API base URL.
* `url`: [TODO: this always seems included, but often empty. Whut?]

You can also add:

* `headers`: an object describing the API call headers, such as content type. [TODO: query about the starter - why quotes on Content-Type but not on Accept? https://github.com/n8n-io/n8n-nodes-starter/blob/master/nodes/HttpBin/HttpBin.node.ts#L29]

### properties

Array of objects. This contains the resource and operations objects that define node behaviors.

#### Resource

A resource object includes the following parameters:

* `displayName`: String. This should always be `Resource`.
* `name`: String. This should always be `resource`.
* `type`: String. Tells n8n which UI element to use, and what type of input to expect. For example, `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](/integrations/creating-nodes/reference/ui-elements/) for more information.
* `noDataExpression`: Boolean. [TODO: what is this?]

#### Operations

The operations object defines the available operations on a resource.

* `displayName`: String. This should always be `Options`.
* `name`: String. This should always be `option`.
* `type`: String. Tells n8n which UI element to use, and what type of input to expect. For example, `dateTime` results in n8n adding a date picker. Refer to [Node UI elements](/integrations/creating-nodes/reference/ui-elements/) for more information.
* `noDataExpression`: Boolean. [TODO: what is this?]
* `action`: String. This parameter combines the resource and operation. You should always include it, as n8n will use it in future versions. For example, given a resource called `"Card"` and an operation `"Get all"`, your action is `"Get all cards"`.



## Declarative-style parameters

### version

Number or array. If you have one version of your node, this can be a number. If you want to support multiple versions, turn this into an array, containing numbers for each node version.

n8n support two methods of node versioning, but declarative-style nodes must use the light versioning approach. Refer to [Node versioning](/integrations/creating-nodes/plan/node-versioning/) for more information.

### routing

`routing` is an object used within an `options` array in an `operations` object. It contains the details of the API call.

The code example below comes from the [Declarative-style tutorial](/integrations/creating-nodes/build/declarative-style-node/). It sets up an integration with a NASA API. It shows how to use `requestDefaults` to set up the basic API call details, and `routing` to add information for each operation.

```js
description: INodeTypeDescription = {
  // Other node info here
  requestDefaults: {
			baseURL: 'https://api.nasa.gov',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
    properties: [
      // Resources here
      {
        displayName: 'Operation'
        // Other operation details
        options: [
          {
            name: 'Get'
            value: 'get',
            description: '',
            routing: {
              request: {
                method: 'GET',
                url: '/planetary/apod'
              }
            }
          }
        ]
      }
    ]
}
```

### routing.output

### routing.request

### routing.send



## Programmatic-style parameters





### defaultVersion

Number. Use `defaultVersion` when using the full versioning approach.

n8n support two methods of node versioning. Refer to [Node versioning](/integrations/creating-nodes/plan/node-versioning/) for more information.


### version

Number or array. Use `version` when using the light versioning approach.

If you have one version of your node, this can be a number. If you want to support multiple versions, turn this into an array, containing numbers for each node version.

n8n support two methods of node versioning. Programmatic-style nodes can use either. Refer to [Node versioning](/integrations/creating-nodes/plan/node-versioning/) for more information.

## Programmatic-style: The execute() method

The main difference between the declarative and programmatic styles is how they handle incoming data and build API requests. The programmatic style requires an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the `operations` object.

The `execute()` method creates and returns an instance of `INodeExecutionData`.

!!! warning "Paired items"
    You must include input and output item pairing information in the data you return. For more information, refer to [Paired items](/integrations/creating-nodes/reference/paired-items/).

