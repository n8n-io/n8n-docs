# Tutorial:  Build a programmatic-style node

This tutorial walks through building a programmatic-style node. Before you begin, make sure this is the node style you need. Refer to [Choose your node building approach](/integrations/creating-nodes/plan/choose-node-method/) for more information.

## Prerequisites

You need the following installed on your development machine:

--8<-- "_snippets/integrations/creating-nodes/prerequisites.md"

You need some understanding of:

- JavaScript/TypeScript
- REST APIs
- git
- Expressions in n8n


## Build your node

In this section, you'll clone n8n's node starter repository, and build a node that integrates the [SendGrid](https://sendgrid.com/){:target=_blank .external-link}. You'll create a node that implements one piece of SendGrid functionality: create a contact.

!!! note "Existing node"
    n8n has a built-in SendGrid node. To avoid clashing with the existing node, you'll give your version a different name.

### Step 1: Set up the project

--8<-- "_snippets/integrations/creating-nodes/tutorial-set-up-project.md"

Now create the following directories and files:

* `nodes/FriendGrid`
* `nodes/FriendGrid/FriendGrid.node.json`
* `nodes/FriendGrid/FriendGrid.node.ts`
* `nodes/FriendGrid/friendgrid.svg`
* `credentials/FriendGridApi.credentials.ts`

These are the key files required for any node. Refer to [Node file structure](/integrations/creating-nodes/build/reference/node-file-structure/) for more information on required files and recommended organization.

Now install the project dependencies:

```shell
npm i
```

### Step 2: Add an icon

Copy and paste the SendGrid SVG logo from [here](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/SendGrid/sendGrid.svg){:target=_blank .external-link} into `sendgrid.svg`. To get the SVG source, select **Raw**.


--8<-- "_snippets/integrations/creating-nodes/node-icons.md"


### Step 3: Update the npm package details

Your npm package details are in the `package.json` at the root of the project. It's essential to include the `n8n` object with links to the credentials and base node file. Update this file to include the following information:

```json
{
	// All node names must start with "n8n-nodes-"
  "name": "n8n-nodes-friendgrid",
  "version": "0.1.0",
  "description": "n8n node to create contacts in SendGrid",
  "keywords": [
		// This keyword is required for community nodes
    "n8n-community-node-package"
  ],
  "license": "MIT",
  "homepage": "https://n8n.io",
  "author": {
    "name": "Test",
    "email": "test@example.com"
  },
  "repository": {
    "type": "git",
		// Change the git remote to your own repository
		// Add the new URL here
    "url": "git+<your-repo-url>"
  },
  "main": "index.js",
  "scripts": {
		// don't change
  },
  "files": [
    "dist"
  ],
	// Link the credentials and node
  "n8n": {
    "credentials": [
      "dist/credentials/FriendGridApi.credentials.js"
    ],
    "nodes": [
      "dist/nodes/FriendGrid/.node.js"
    ]
  },
  "devDependencies": {
		// don't change
  },
  "dependencies": {
    // don't change
  }
}
```

### Step 4: Add node metadata

Metadata about your node goes in the JSON file at the root of your node. n8n refers to this as the codex file. In this example, the file is `FriendGrid.node.json`.

Add the following code to the JSON file:

```json
{
	"node": "n8n-nodes-base.FriendGrid",
	"nodeVersion": "1.0",
	"codexVersion": "1.0",
	"categories": [
		"Miscellaneous"
	],
	"resources": {
		"credentialDocumentation": [
			{
				"url": ""
			}
		],
		"primaryDocumentation": [
			{
				"url": ""
			}
		]
	}
}
```

For more information on these parameters, refer to [Node codex files](/integrations/creating-nodes/build/reference/node-codex-files/).

### Step 5: Create the node

Every node must have a base file. In this example, the file is `FriendGrid.node.ts`. To keep this tutorial short, you'll place all the node functionality in this one file. When building more complex nodes, you should consider splitting out your functionality into modules. Refer to [Node file structure](/integrations/creating-nodes/build/reference/node-file-structure/) for more information.

#### Step 5.1: Imports

Start by adding the import statements:

```typescript
import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import {
    OptionsWithUri,
} from 'request';
```

#### Step 5.2: Create the main class

The node must export an interface that implements INodeType. This interface must include a `description` interface, which in turn contains the `properties` array.

!!! note "Class names and file names"
		Make sure the class name and the file name match. For example, given a class `FriendGrid`, the filename must be `FriendGrid.node.ts`.

```typescript
export class FriendGrid implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		properties: [
			// Resources and operations will go here
		]
	};
}
```

#### Step 5.3: Add node details

All programmatic nodes need some basic parameters, such as their display name and icon. Add the following to the `description`:

```typescript
displayName: 'FriendGrid',
name: 'friendGrid',
icon: 'file:friendGrid.svg',
group: ['transform'],
version: 1,
description: 'Consume SendGrid API',
defaults: {
		name: 'FriendGrid'
},
inputs: ['main'],
outputs: ['main'],
credentials: [
	{
		name: 'friendGridApi',
		required: true,
	},
],
```









## Creating the UI for the node

Double-clicking on the FriendGrid node will open the Node Editor View. It will be empty since we haven't added any UI components yet. Luckily, n8n provides predefined JSON-based UI components that we can use to ask the user for different types of data.

SendGrid's [docs](https://sendgrid.com/docs/api-reference/) mention that to create a contact, we need to provide the following pieces of information:

- email - Required
- first_name - Optional
- last_name - Optional

There are more parameters that can be provided to create a contact in FriendGrid, but we will use only these three in this tutorial.

### Resources and operations

Now, n8n requires a couple of parameters as well:

- resource - Required
- operation - Required

You can get the node to work without these two parameters, but these should be added for the sake of consistency with the other nodes. Resources and Operations help in organizing all the functionalities of a node. These ensure that all the functionalities of a node remain easily discoverable as the node grows.

- The resource value is always singular and its value is the name of the API resource that we want to use. Since we are working with contacts, the resource value would be `contact`.
- The operation value is always singular as well and it is the name of the operation to perform over the resource. Since we are creating contacts, the operation value would be `create`.

You might say that you can “Add a contact” and you are right, but we try to use the same operations (create, delete, get, getAll and update) across all the nodes.

### Adding required fields

Let’s make the Node Editor View ask for these parameters:

1. Add the following under `description.properties` in `packages/nodes-base/nodes/FriendGrid/FriendGrid.node.ts`.

```typescript
{
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	options: [
		{
			name: 'Contact',
			value: 'contact',
		},
	],
	default: 'contact',
	required: true,
	description: 'Resource to consume',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: [
				'contact',
			],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create a contact',
		},
	],
	default: 'create',
	description: 'The operation to perform.',
},
{
	displayName: 'Email',
	name: 'email',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			operation: [
				'create',
			],
			resource: [
				'contact',
			],
		},
	},
	default:'',
	description:'Primary email for the contact',
},
```

2. Stop the current n8n process by pressing ctrl + c in the terminal in which you are running n8n.
3. Run again, by entering the following in the terminal.
	```bash
	npm run dev
	```
4. Go to [localhost:8080](http://localhost:8080/), refresh the page, and open the node again.

The node should now look like in the following image.

![FriendGrid's required fields](/_images/integrations/creating-nodes/friendgrid-required-fields.png)

### Adding optional fields

We have given the node the possibility to ask for all the required parameters needed to create a contact. But, what about the optional parameters?

We can add them below the email parameter and set `required: false`. However, if we had more than two optional parameters, and most APIs do, the UI would become overwhelming for the users. To avoid this, we use a UI element named **collection** (usually called 'Additional Fields') to group all the optional parameters together.

1. Add the following below the `email` field in `packages/nodes-base/nodes/FriendGrid/FriendGrid.node.ts`.

	```typescript
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'contact',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
			},
		],
	},
	```

2. Stop the current n8n process by pressing ctrl + c in the terminal in which you are running n8n.
3. Run again, by entering the following in the terminal.
	```bash
	npm run dev
	```
4. Go to [localhost:8080](http://localhost:8080/), refresh the page, and open the node again.

The node should now look like in the following image.

![FriendGrid's all fields](/_images/integrations/creating-nodes/friendgrid-all-fields.png)

Now all our optional fields are presented in the UI and can be set individually depending on the user’s use-case.

## Creating the UI for credentials'

Most REST APIs use some sort of authentication mechanism. FriendGrid's REST API uses API Keys. The API Key informs them about who is making the request to their system and gives you access to all the functionality that the API provides. Given all the things it can do, this has to be treated as a sensitive piece of information and should be kept private.

n8n gives you the ability to ask for sensitive information using credentials. In the credentials, you can use all the generally available UI elements. Additionally, the data that is stored using the credentials would be encrypted before being saved to the database. In order to do that, n8n uses an encryption key.

With that in mind, let’s create the UI to ask for the user’s FriendGrid API Key. The process of creating and registering credentials is similar to that of creating and registering the node:

1. Go to `packages/nod's-base/credentials`.'
2. Within the credentials folder, create a file named `FriendGridApi.credentials.ts`.
3. Paste the following code.

```typescript
import {
    ICredentialType,
    NodePropertyTypes,
} from 'n8n-workflow';

export class FriendGridApi implements ICredentialType {
    name = 'friendGridApi';
    displayName = 'FriendGrid API';
    documentationUrl = 'friendGrid';
    properties = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string' as NodePropertyTypes,
            default: '',
        },
    ];
}
```

4. Go to `/packages/nodes-base/package.json`.
5. Paste `"dist/credentials/FriendGridApi.credentials.js",` in the credentials array to register the credentials (in an alphabetical order).
6. Got to `packages/nodes-base/nodes/FriendGrid/FriendGrid.node.ts`.
7. Associate the credentials with the node by adding the following to `description.credentials`.

	```typescript
	{
		name: 'friendGridApi',
		required: true,
	},
	```

8. Stop the current n8n process by pressing ctrl + c in the terminal in which you are running n8n.
9. Run again, by entering the following in the terminal.
	```bash
	npm run dev
	```

When you go to the Node Editor view, you should see the following.

![FriendGrid's create credentials](/_images/integrations/creating-nodes/friendgrid-create-credentials.png)

![FriendGrid's credentials](/_images/integrations/creating-nodes/friendgrid-credentials.png)


## Mapping the UI fields to the API

With the UI that we added, we now have all the data that we need to make a request to the FriendGrid API and create contacts.

This is where the `execute` method comes into play. Every time the node is executed, this method will be run. Within this method, we can have access to the input items and to the parameters that the user set in the UI, including the credentials.
To map the fields to the API, perform the following steps:

1. Go to `package/nodes-base/nodes/FriendGrid.node.ts`.
2. Replace the current `execute` method with the following code.

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	let responseData;
	const resource = this.getNodeParameter('resource', 0) as string;
	const operation = this.getNodeParameter('operation', 0) as string;
	//Get credentials the user provided for this node
	const credentials = await this.getCredentials('friendGridApi') as IDataObject;

	if (resource === 'contact') {
		if (operation === 'create') {
			// get email input
			const email = this.getNodeParameter('email', 0) as string;
			// get additional fields input
			const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;
			const data: IDataObject = {
				email,
			};

			Object.assign(data, additionalFields);

			//Make http request according to <https://sendgrid.com/docs/api-reference/>
			const options: OptionsWithUri = {
				headers: {
					'Accept': 'application/json',
					'Authorization': `Bearer ${credentials.apiKey}`,
				},
				method: 'PUT',
				body: {
					contacts: [
						data,
					],
				},
				uri: `https://api.sendgrid.com/v3/marketing/contacts`,
				json: true,
			};

			responseData = await this.helpers.request(options);
		}
	}

	// Map data to n8n data
	return [this.helpers.returnJsonArray(responseData)];
}
```

3. Stop the current n8n process by pressing ctrl + c in the terminal in which you are running n8n.
4. Run again, by entering the following in the terminal.
	```bash
	npm run dev
	```
5. Enter the credentials (FriendGrid API Key), contact parameters, and execute the node.
	- Instructions to find the FriendGrid API Key can be found [here](https://sendgrid.com/docs/ui/account-and-settings/api-keys/).

If everything went well, you should see the following.

![Creating a contact in FriendGrid with n8n](/_images/integrations/creating-nodes/create-contact-friendgrid.png)

Now we can successfully create contacts in FriendGrid from n8n.

## Processing multiples items

In real life, you'll probably have a workflow with more than one node. Our current implementation does not play well with the other nodes. If the data is coming into our FriendGrid node from another node, and that outputs, for example, two contacts, our node will process just the first contact. We want our node to process as many items as it receives.

This is when the `this.getInputData()` function comes into play. Let's update our node so that it can process multiple items.

1. In the Editor UI, create a new workflow. Add a Function node and connect it to the Start node.
2. Open the function node and replace the existing code with the following.

```javascript
 return [
  {
    json: {
      name: 'ricardo@n8n.io'
    }
  },
    {
    json: {
      name: 'hello@n8n.io'
    }
  },
]
```

3. Execute the Function node. We're using the function node for testing, but you can think of it as any node that is returning “two people” (or more). These two people need to be added to FriendGrid as contacts.

	![Output of the Function node](/_images/integrations/creating-nodes/function-node-output.png)

4. Add a FriendGrid node to the workflow and connect it to the Function node. Add an expression in the ***Email*** field of the FriendGrid node and reference the ***name*** property that the Function node outputs.

	![Using expressions in the FriendGrid node](/_images/integrations/creating-nodes/expressions-friendgrid.png)

5. Replace the existing `execute` method with the following:

	```typescript
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		//Get credentials the user provided for this node
		const credentials = await this.getCredentials('friendGridApi') as IDataObject;

		for (let i = 0; i < items.length; i++) {
			if (resource === 'contact') {
				if (operation === 'create') {
					// get email input
					const email = this.getNodeParameter('email', i) as string;

					// i = 1 returns ricardo@n8n.io
					// i = 2 returns hello@n8n.io

					// get additional fields input
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const data: IDataObject = {
						email,
					};

					Object.assign(data, additionalFields);

					//Make http request according to <https://sendgrid.com/docs/api-reference/>
					const options: OptionsWithUri = {
						headers: {
							'Accept': 'application/json',
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						method: 'PUT',
						body: {
							contacts: [
								data,
							],
						},
						uri: `https://api.sendgrid.com/v3/marketing/contacts`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
		}
		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}
	```

6. Execute the workflow.

If you open the FriendGrid node, you should see the following.

![Output of the FriendGrid node](/_images/integrations/creating-nodes/final-friendgrid.png)

As showcased above, both the items were processed. That’s how all nodes in n8n work (with a few exceptions). They will automatically iterate over all the items and process them.

Let’s go over the final version of the `execute` method' We are getting the items returned by the `this.getInputData()` function and iterating over all of them. Additionally, while doing so, we use the item index to get the correct parameter value using the function `this.getNodeParameters()`. For example, with the following input:

```javascript
[
  {
    json: {
      name: 'ricardo@n8n.io'
    }
  },
    {
    json: {
      name: 'hello@n8n.io'
    }
  },
]
```

The `this.getNodeParameters(ParameterName, index)`function outputs the following:

| Index | Parameter Name | Output            |
|-------|----------------|-------------------|
| 0     | email          | ricardo@n8n.io    |
| 1     | email          | hello@n8n.io      |

We used the `this.helpers.request(options)` method to make the HTTP Request that creates the contact in FriendGrid. The FriendGrid endpoint returns something like this:

```javascript
{
   job_id: "b82aca74-3640-4097-85ec-7801d833c2cb"
}
```

We then used the `this.helpers.returnJsonArray()` method to map the API’s output data to n8n's data structure. The node then ends up returning the data like the following:

```javascript
[
   {
      json:{
         job_id: "b82aca74-3640-4097-85ec-7801d833c2cb"
      }
   }
]
```


## Summary

In this tutorial, we implemented the "Create a Contact" functionality of the FriendGrid API. First of all, we made the node show up in the Editor UI and in the Create Node menu with FriendGrid's branding. Then, we added the fields necessary to create a contact in FriendGrid. We also added the credentials so that the API Key could be stored safely. Finally, we mapped all the parameters to the FriendGrid API.

This is just the tip of the iceberg. We built a regular node that consumes a REST API, but a regular node can do everything that can be done with Node.js. Aside from regular nodes you can also build Trigger nodes.

## Next steps

Once you have created the node and want to contribute to n8n, please check the [Node Review Checklist](/integrations/creating-nodes/code/review-checklist/). Make sure you complete the checklist before creating a pull request.

## Next steps

* [Deploy your node](/integrations/creating-nodes/deploy/).
* View an example of a programmatic node: n8n's [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost){:target=_blank .external-link}. 
* Learn about [node versioning](/integrations/creating-nodes/build/reference/node-versioning/).
