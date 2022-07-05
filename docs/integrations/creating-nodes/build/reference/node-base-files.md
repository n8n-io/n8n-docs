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

export class ExampleNode implements INodeType {
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

_String_ | _Required_

This is the name users see in the n8n GUI.

### name

_String_ | _Required_

The internal name of the object. Used to reference it from other places in the node.

### icon

_String_ | _Required_

Starts with `file`. For example, `icon: 'file:exampleNodeIcon.svg'`.

--8<-- "_snippets/integrations/creating-nodes/node-icons.md"

### group

_Array of strings_ | _Required_

Tells n8n how the node behaves when the workflow runs. Options are:

* `trigger`: node waits for a trigger.
* `schedule`: node waits for a timer to expire.
* `input`, `output`, `transform`: these currently have no effect.
* An empty array, `[]`. Use this as the default option if you don't need `trigger` or `schedule`.

### description

_String_ | _Required_

A short description of the node. n8n uses this in the GUI.

### defaults

_Object_ | _Required_

Contains essential brand and name settings.

The object can include:

* `name`: String. Used as the node name on the canvas if the `displayName` is too long.
* `color`: String. Hex color code. Provide the brand color of the integration for use in n8n.

### inputs

_Array of strings_ | _Required_

Names the input connectors. Controls the number of connectors the node has on the input side. If you need only one connector, us `input: ['main']`.

### outputs

_Array of strings_ | _Required_  

Names the output connectors. Controls the number of connectors the node has on the output side. If you need only one connector, us `output: ['main']`.

### credentials

_Array of objects_ | _Required_  

This parameter tells n8n the credential options. Each object defines an authentication type.

The object must include:

* `name`: the credential name. Must match the `name` property in the credential file. For example, `name: 'asanaApi'`  in [`Asana.node.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Asana/Asana.node.ts){:target=_blank .external-class} links to `name = 'asanaApi'` in [`AsanaApi.credential.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/credentials/AsanaApi.credentials.ts){:target=_blank .external-class}.
* `required`: Boolean. Specify whether authentication is required to use this node.

### requestDefaults

_Object_ | _Required_  

Set up the basic information for the API calls the node makes.

This object must include:

* `baseURL`: The API base URL.

You can also add:

* `headers`: an object describing the API call headers, such as content type.
* `url`: string. Appended to the `baseURL`. You can usually leave this out. It's more common to provide this in the `operations`.

### properties

_Array of objects_ | _Required_  

This contains the resource and operations objects that define node behaviors, as well as objects to set up mandatory and optional fields that can receive user input.

#### Resource objects

A resource object includes the following parameters:

* `displayName`: String. This should always be `Resource`.
* `name`: String. This should always be `resource`.
* `type`: String. Tells n8n which UI element to use, and what type of input to expect. For example, `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](/integrations/creating-nodes/build/reference/ui-elements/) for more information.
* `noDataExpression`: Boolean. Prevents using an expression for the parameter. Must always be `true` for `resource`. 

#### Operations objects

The operations object defines the available operations on a resource.

* `displayName`: String. This should always be `Options`.
* `name`: String. This should always be `option`.
* `type`: String. Tells n8n which UI element to use, and what type of input to expect. For example, `dateTime` results in n8n adding a date picker. Refer to [Node UI elements](/integrations/creating-nodes/build/reference/ui-elements/) for more information.
* `noDataExpression`: Boolean. Prevents using an expression for the parameter. Must always be `true` for `operation`.
* `action`: String. This parameter combines the resource and operation. You should always include it, as n8n will use it in future versions. For example, given a resource called `"Card"` and an operation `"Get all"`, your action is `"Get all cards"`.

#### Additional fields objects

These objects define optional parameters. n8n displays them under **Additional Fields** in the GUI. Users can choose which parameters to set.

The objects must include:

```js
displayName: 'Additional Fields',
name: 'additionalFields',
// The UI element type
type: ''
placeholder: 'Add Field',
default: {},
displayOption: {
  // Set which resources and operations this field is available for
  show: {
    resource: [
      // Resource names
    ],
    operation: [
      // Operation names
    ]
  }
}
```

For more information about UI element types, refer to [UI elements](/integrations/creating-nodes/build/reference/ui-elements/).



## Declarative-style parameters

### methods and loadOptions

_Object_ | _Optional_

`methods` contains the `loadOptions` object. You can use `loadOptions` to query the service to get user-specific settings, then return them and render them in the GUI so the user can include them in subsequent queries. The object must include routing information for how to query the service, and output settings that define how to handle the returned options. For example:

```js
methods : {
	loadOptions: {
		routing: {
			request: {
				url: '/webhook/example-option-parameters',
				method: 'GET',
			},
			output: {
				postReceive: [
					{
						// When the returned data is nested under another property
						// Specify that property key
						type: 'rootProperty',
						properties: {
							property: 'responseData',
						},
					},
					{
						type: 'setKeyValue',
						properties: {
							name: '={{$responseItem.key}} ({{$responseItem.value}})',
							value: '={{$responseItem.value}}',
						},
					},
					{
						// If incoming data is an array of objects, sort alphabetically by key
						type: 'sort',
						properties: {
							key: 'name',
						},
					},
				],
			},
		},
	}
},
```

### routing

_Object_ | _Required_

`routing` is an object used within an `options` array in operations and input field objects. It contains the details of an API call.

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

<!--

TODO: more info on the routing object
### routing.output

### routing.request

### routing.send

-->

### version

_Number_ or _array_ | Optional

If you have one version of your node, this can be a number. If you want to support more than one version, turn this into an array, containing numbers for each node version.

n8n support two methods of node versioning, but declarative-style nodes must use the light versioning approach. Refer to [Node versioning](/integrations/creating-nodes/build/reference/node-versioning/) for more information.

## Programmatic-style parameters


### defaultVersion

_Number_ | _Optional_

Use `defaultVersion` when using the full versioning approach.

n8n support two methods of node versioning. Refer to [Node versioning](/integrations/creating-nodes/build/reference/node-versioning/) for more information.

### methods

_Object_ | _Optional_

Contains the `loadOptions` method for programmatic-style nodes. You can use this method to query the service to get user-specific settings, then return them and render them in the GUI so the user can include them in subsequent queries.

For example, n8n's [Gmail node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Google/Gmail/Gmail.node.ts) uses `loadOptions` to get all email labels:

```js
	methods = {
		loadOptions: {
			// Get all the labels and display them
			async getLabels(
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const labels = await googleApiRequestAllItems.call(
					this,
					'labels',
					'GET',
					'/gmail/v1/users/me/labels',
				);
				for (const label of labels) {
					const labelName = label.name;
					const labelId = label.id;
					returnData.push({
						name: labelName,
						value: labelId,
					});
				}
				return returnData;
			},
		},
	};
```

### version

_Number_ or _array_ | _Optional_

Use `version` when using the light versioning approach.

If you have one version of your node, this can be a number. If you want to support multiple versions, turn this into an array, containing numbers for each node version.

n8n support two methods of node versioning. Programmatic-style nodes can use either. Refer to [Node versioning](/integrations/creating-nodes/build/reference/node-versioning/) for more information.

## Programmatic-style: The execute() method

The main difference between the declarative and programmatic styles is how they handle incoming data and build API requests. The programmatic style requires an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the `operations` object.

The `execute()` method creates and returns an instance of `INodeExecutionData`.

!!! warning "Paired items"
    You must include input and output item pairing information in the data you return. For more information, refer to [Paired items](/integrations/creating-nodes/build/reference/paired-items/).

