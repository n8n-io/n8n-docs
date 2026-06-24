---
contentType: tutorial
nodeTitle: 'Tutorial: Build a programmatic-style node'
originalFilePath: integrations/creating-nodes/build/programmatic-style-node.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node'
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/tutorial-build-a-programmatic-style-node
layout:
  description:
    visible: false
---

# Build a programmatic-style node <a href="#build-a-programmatic-style-node" id="build-a-programmatic-style-node"></a>

This tutorial walks through building a programmatic-style node. Before you begin, make sure this is the node style you need. Refer to [Choose your node building approach](../plan-your-node/choose-a-node-building-style.md) for more information.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

You need the following installed on your development machine:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/zu69Es8XpVYF7Wjldwd1/" %}

You need some understanding of:

- JavaScript/TypeScript
- REST APIs
- git
- Expressions[^1] in n8n


## Build your node <a href="#build-your-node" id="build-your-node"></a>

In this section, you'll clone n8n's node starter repository, and build a node that integrates the [SendGrid](https://sendgrid.com/). You'll create a node that implements one piece of SendGrid functionality: create a contact.

{% hint style="info" %}
**Existing node**

n8n has a built-in SendGrid node. To avoid clashing with the existing node, you'll give your version a different name.
{% endhint %}
### Step 1: Set up the project <a href="#step-1-set-up-the-project" id="step-1-set-up-the-project"></a>

n8n provides a starter repository for node development. Using the starter ensures you have all necessary dependencies. It also provides a linter. 

Clone the repository and navigate into the directory:

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from the template repository.
2. Clone your new repository:
		```shell
		git clone https://github.com/<your-organization>/<your-repo-name>.git n8n-nodes-friendgrid
		cd n8n-nodes-friendgrid
		```

The starter contains example nodes and credentials. Delete the following directories and files:

* `nodes/Example`
* `nodes/GithubIssues`
* `credentials/GithubIssuesApi.credentials.ts`
* `credentials/GithubIssuesOAuth2Api.credentials.ts`

Now create the following directories and files:

`nodes/FriendGrid`  
`nodes/FriendGrid/FriendGrid.node.json`  
`nodes/FriendGrid/FriendGrid.node.ts`  
`credentials/FriendGridApi.credentials.ts`  

These are the key files required for any node. Refer to [Node file structure](../plan-your-node/choose-node-file-structure.md) for more information on required files and recommended organization.

Now install the project dependencies:

```shell
npm i
```

### Step 2: Add an icon <a href="#step-2-add-an-icon" id="step-2-add-an-icon"></a>

Save the SendGrid SVG logo from [here](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/SendGrid/sendGrid.svg) as `friendGrid.svg` in `nodes/FriendGrid/`.


{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iV21vfNb9w8eJrJxc055/" %}


### Step 3: Define the node in the base file <a href="#step-3-define-the-node-in-the-base-file" id="step-3-define-the-node-in-the-base-file"></a>

Every node must have a base file. Refer to [Node base file](reference/base-files/README.md) for detailed information about base file parameters.

In this example, the file is `FriendGrid.node.ts`. To keep this tutorial short, you'll place all the node functionality in this one file. When building more complex nodes, you should consider splitting out your functionality into modules. Refer to [Node file structure](../plan-your-node/choose-node-file-structure.md) for more information.

#### Step 3.1: Imports <a href="#step-31-imports" id="step-31-imports"></a>

Start by adding the import statements:

```typescript
import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
```

#### Step 3.2: Create the main class <a href="#step-32-create-the-main-class" id="step-32-create-the-main-class"></a>

The node must export an interface that implements `INodeType`. This interface must include a `description` interface, which in turn contains the `properties` array.

{% hint style="info" %}
**Class names and file names**

Make sure the class name and the file name match. For example, given a class `FriendGrid`, the filename must be `FriendGrid.node.ts`.
{% endhint %}
```typescript
export class FriendGrid implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		properties: [
			// Resources and operations will go here
		],
	};
	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	}
}
```

#### Step 3.3: Add node details <a href="#step-33-add-node-details" id="step-33-add-node-details"></a>

All programmatic nodes need some basic parameters, such as their display name and icon. Add the following to the `description`:

```typescript
displayName: 'FriendGrid',
name: 'friendGrid',
icon: 'file:friendGrid.svg',
group: ['transform'],
version: 1,
description: 'Consume SendGrid API',
defaults: {
	name: 'FriendGrid',
},
inputs: [NodeConnectionTypes.Main],
outputs: [NodeConnectionTypes.Main],
usableAsTool: true,
credentials: [
	{
		name: 'friendGridApi',
		required: true,
	},
],
```

n8n uses some of the properties set in `description` to render the node in the Editor UI. These properties are `displayName`, `icon`, and `description`.

#### Step 3.4: Add the resource <a href="#step-34-add-the-resource" id="step-34-add-the-resource"></a>

The resource object defines the API resource that the node uses. In this tutorial, you're creating a node to access one of SendGrid's API endpoints: `/v3/marketing/contacts`. This means you need to define a resource for this endpoint. Update the `properties` array with the resource object:

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
	noDataExpression: true,
	required: true,
	description: 'Create a new contact',
},
```

`type` controls which UI element n8n displays for the resource, and tells n8n what type of data to expect from the user. `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](reference/node-ui-elements.md) for more information.

#### Step 3.5: Add operations <a href="#step-35-add-operations" id="step-35-add-operations"></a>

The operations object defines what you can do with a resource. It usually relates to REST API verbs (GET, POST, and so on). In this tutorial, there's one operation: create a contact. It has one required field, the email address for the contact the user creates.

Add the following to the `properties` array, after the `resource` object:

```typescript
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
			action: 'Create a contact',
		},
	],
	default: 'create',
	noDataExpression: true,
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
	placeholder: 'name@email.com',
	description:'Primary email for the contact',
},
```

#### Step 3.6: Add optional fields <a href="#step-36-add-optional-fields" id="step-36-add-optional-fields"></a>

Most APIs, including the SendGrid API that you're using in this example, have optional fields you can use to refine your query.

To avoid overwhelming users, n8n displays these under **Additional Fields** in the UI.

For this tutorial, you'll add two additional fields, to allow users to enter the contact's first name and last name. Add the following to the properties array:

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

### Step 4: Add the execute method <a href="#step-4-add-the-execute-method" id="step-4-add-the-execute-method"></a>

You've set up the node UI and basic information. It's time to map the node UI to API requests, and make the node actually do something.

The `execute` method runs every time the node runs. In this method, you have access to the input items and to the parameters that the user set in the UI, including the credentials.

Add the following the `execute` method in the `FriendGrid.node.ts`:

```typescript
// Handle data coming from previous nodes
const items = this.getInputData();
let responseData;
const returnData: INodeExecutionData[] = [];
const resource = this.getNodeParameter('resource', 0);
const operation = this.getNodeParameter('operation', 0);

// For each item, make an API call to create a contact
for (let i = 0; i < items.length; i++) {
	try {
		if (resource === 'contact') {
			if (operation === 'create') {
				// Get email input
				const email = this.getNodeParameter('email', i);
				// Get additional fields input
				const additionalFields = this.getNodeParameter('additionalFields', i);
				const data: IDataObject = {
					email,
				};

				Object.assign(data, additionalFields);

				// Make HTTP request according to https://sendgrid.com/docs/api-reference/
				const options: IHttpRequestOptions = {
					headers: {
						'Accept': 'application/json',
					},
					method: 'PUT',
					body: {
						contacts: [
							data,
						],
					},
					url: 'https://api.sendgrid.com/v3/marketing/contacts',
					json: true,
				};
				responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'friendGridApi', options);
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject),
					{ itemData: { item: i } },
				);

				returnData.push.apply(returnData, executionData);
			}
		}
	} catch (error) {
		if (this.continueOnFail()) {
			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray({ error: error.message }),
				{ itemData: { item: i } },
			);
			returnData.push.apply(returnData, executionData);
			continue;
		}
		throw error;
	}
}
return [returnData];
```

Note the following lines of this code:

```typescript
const items = this.getInputData();
... 
for (let i = 0; i < items.length; i++) {
	...
	const email = this.getNodeParameter('email', i);
	...
}
```

Users can provide data in two ways:

* Entered directly in the node fields
* By mapping data from earlier nodes in the workflow

`getInputData()`, and the subsequent loop, allows the node to handle situations where data comes from a previous node. This includes supporting multiple inputs. This means that if, for example, the previous node outputs contact information for five people, your FriendGrid node can create five contacts.


### Step 5: Set up authentication <a href="#step-5-set-up-authentication" id="step-5-set-up-authentication"></a>

The SendGrid API requires users to authenticate with an API key.

Add the following to `FriendGridApi.credentials.ts`

```typescript
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FriendGridApi implements ICredentialType {
	name = 'friendGridApi';
	displayName = 'FriendGrid API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.sendgrid.com/v3',
			url: '/marketing/contacts',
		},
	};
}

```

For more information about credentials files and options, refer to [Credentials file](reference/credentials-files.md).

### Step 6: Add node metadata <a href="#step-6-add-node-metadata" id="step-6-add-node-metadata"></a>

Metadata about your node goes in the JSON file at the root of your node. n8n refers to this as the codex file. In this example, the file is `FriendGrid.node.json`.

Add the following code to the JSON file:

```json
{
	"node": "n8n-nodes-friendgrid",
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

For more information on these parameters, refer to [Node codex files](reference/codex-files.md).


### Step 7: Update the npm package details <a href="#step-7-update-the-npm-package-details" id="step-7-update-the-npm-package-details"></a>

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
		"n8nNodesApiVersion": 1,
		"credentials": [
			"dist/credentials/FriendGridApi.credentials.js"
		],
		"nodes": [
			"dist/nodes/FriendGrid/FriendGrid.node.js"
		]
	},
	"devDependencies": {
		// don't change
	},
	"peerDependencies": {
		// don't change
	}
}
```

You need to update the `package.json` to include your own information, such as your name and repository URL. For more information on npm `package.json` files, refer to [npm's package.json documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).



## Test your node <a href="#test-your-node" id="test-your-node"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7XjXX06uVcZBYZwANeP3/" %}

## Next steps <a href="#next-steps" id="next-steps"></a>

* [Deploy your node](../deploy-your-node/README.md).
* View an example of a programmatic node: n8n's [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost). This is an example of a more complex programmatic node structure.
* Learn about [node versioning](reference/versioning.md).
* Make sure you understand key concepts: [item linking](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/reference-data/link-data-items/how-items-link-through-workflows) and [data structures](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/understand-n8ns-data-structure).

[^1]: In n8n, expressions allow you to populate node parameters dynamically by executing JavaScript code. Instead of providing a static value, you can use the n8n expression syntax to define the value using data from previous nodes, other workflows, or your n8n environment.
