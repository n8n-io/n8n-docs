---
contentType: tutorial
nodeTitle: 'Tutorial: Build a declarative-style node'
originalFilePath: integrations/creating-nodes/build/declarative-style-node.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node'
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/tutorial-build-a-declarative-style-node
layout:
  description:
    visible: false
---

# Build a declarative-style node <a href="#build-a-declarative-style-node" id="build-a-declarative-style-node"></a>

This tutorial walks through building a declarative-style node. Before you begin, make sure this is the node style you need. Refer to [Choose your node building approach](../plan-your-node/choose-a-node-building-style.md) for more information.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

You need the following installed on your development machine:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7rCdLiI9qnTIK3Afb3NX/" %}

You need some understanding of:

- JavaScript/TypeScript
- REST APIs
- git

## Build your node <a href="#build-your-node" id="build-your-node"></a>

In this section, you'll clone n8n's node starter repository, and build a node that integrates the [NASA API](https://api.nasa.gov/). You'll create a node that uses two of NASA's services: APOD (Astronomy Picture of the Day) and Mars Rover Photos. To keep the code examples short, the node won't implement every available option for the Mars Rover Photos endpoint.

{% hint style="info" %}
**Existing node**

n8n has a built-in NASA node. To avoid clashing with the existing node, you'll give your version a different name.
{% endhint %}
### Step 1: Set up the project <a href="#step-1-set-up-the-project" id="step-1-set-up-the-project"></a>


n8n provides a starter repository for node development. Using the starter ensures you have all necessary dependencies. It also provides a linter. 

Clone the repository and navigate into the directory:

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from the template repository.
2. Clone your new repository:
		```shell
		git clone https://github.com/<your-organization>/<your-repo-name>.git n8n-nodes-nasa-pics
		cd n8n-nodes-nasa-pics
		```

The starter contains example nodes and credentials. Delete the following directories and files:

* `nodes/Example`
* `nodes/GithubIssues`
* `credentials/GithubIssuesApi.credentials.ts`
* `credentials/GithubIssuesOAuth2Api.credentials.ts`

Now create the following directories and files:

`nodes/NasaPics`  
`nodes/NasaPics/NasaPics.node.json`  
`nodes/NasaPics/NasaPics.node.ts`  
`credentials/NasaPicsApi.credentials.ts`  

These are the key files required for any node. Refer to [Node file structure](../plan-your-node/choose-node-file-structure.md) for more information on required files and recommended organization.

Now install the project dependencies:

```shell
npm i
```

### Step 2: Add an icon <a href="#step-2-add-an-icon" id="step-2-add-an-icon"></a>

Save the NASA SVG logo from [here](https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg) as `nasapics.svg` in `nodes/NasaPics/`.


{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/dGOXJYk0OQgOLlRpyJnn/" %}


### Step 3: Create the node <a href="#step-3-create-the-node" id="step-3-create-the-node"></a>

Every node must have a base file. Refer to [Node base file](reference/base-files/README.md) for detailed information about base file parameters.

In this example, the file is `NasaPics.node.ts`. To keep this tutorial short, you'll place all the node functionality in this one file. When building more complex nodes, you should consider splitting out your functionality into modules. Refer to [Node file structure](../plan-your-node/choose-node-file-structure.md) for more information.

#### Step 3.1: Imports <a href="#step-31-imports" id="step-31-imports"></a>

Start by adding the import statements:

```typescript
import { NodeConnectionTypes } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
```

#### Step 3.2: Create the main class <a href="#step-32-create-the-main-class" id="step-32-create-the-main-class"></a>

The node must export an interface that implements INodeType. This interface must include a `description` interface, which in turn contains the `properties` array.

{% hint style="info" %}
**Class names and file names**

Make sure the class name and the file name match. For example, given a class `NasaPics`, the filename must be `NasaPics.node.ts`.
{% endhint %}
```typescript
export class NasaPics implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		properties: [
		// Resources and operations will go here
		]
	};
}
```

#### Step 3.3: Add node details <a href="#step-33-add-node-details" id="step-33-add-node-details"></a>

All nodes need some basic parameters, such as their display name, icon, and the basic information for making a request using the node. Add the following to the `description`:

```typescript
displayName: 'NASA Pics',
name: 'nasaPics',
icon: 'file:nasapics.svg',
group: ['transform'],
version: 1,
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
description: 'Get data from NASAs API',
defaults: {
	name: 'NASA Pics',
},
usableAsTool: true,
inputs: [ NodeConnectionTypes.Main ],
outputs: [ NodeConnectionTypes.Main ],
credentials: [
	{
		name: 'NasaPicsApi',
		required: true,
	},
],
requestDefaults: {
	baseURL: 'https://api.nasa.gov',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
},
```

n8n uses some of the properties set in `description` to render the node in the Editor UI. These properties are `displayName`, `icon`, `description`, and `subtitle`.

#### Step 3.4: Add resources <a href="#step-34-add-resources" id="step-34-add-resources"></a>

The resource object defines the API resource that the node uses. In this tutorial, you're creating a node to access two of NASA's API endpoints: `planetary/apod` and `mars-photos`. This means you need to define two resource options in `NasaPics.node.ts`. Update the `properties` array with the resource object:

```typescript
properties: [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Astronomy Picture of the Day',
				value: 'astronomyPictureOfTheDay',
			},
			{
				name: 'Mars Rover Photos',
				value: 'marsRoverPhotos',
			},
		],
		default: 'astronomyPictureOfTheDay',
	},
	// Operations will go here

]
```

`type` controls which UI element n8n displays for the resource, and tells n8n what type of data to expect from the user. `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](reference/node-ui-elements.md) for more information.

#### Step 3.5: Add operations <a href="#step-35-add-operations" id="step-35-add-operations"></a>

The operations object defines the available operations on a resource.

In a declarative-style node, the operations object includes `routing` (within the `options` array). This sets up the details of the API call.

Add the following to the `properties` array, after the `resource` object:

```typescript
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'astronomyPictureOfTheDay',
			],
		},
	},
	options: [
		{
			name: 'Get',
			value: 'get',
			action: 'Get the APOD',
			description: 'Get the Astronomy Picture of the day',
			routing: {
				request: {
					method: 'GET',
					url: '/planetary/apod',
				},
			},
		},
	],
	default: 'get',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'marsRoverPhotos',
			],
		},
	},
	options: [
		{
			name: 'Get',
			value: 'get',
			action: 'Get Mars Rover photos',
			description: 'Get photos from the Mars Rover',
			routing: {
				request: {
					method: 'GET',
				},
			},
		},
	],
	default: 'get',
},
{
	displayName: 'Rover name',
	description: 'Choose which Mars Rover to get a photo from',
	required: true,
	name: 'roverName',
	type: 'options',
	options: [
		{name: 'Curiosity', value: 'curiosity'},
		{name: 'Opportunity', value: 'opportunity'},
		{name: 'Perseverance', value: 'perseverance'},
		{name: 'Spirit', value: 'spirit'},
	],
	routing: {
		request: {
			url: '=/mars-photos/api/v1/rovers/{{$value}}/photos',
		},
	},
	default: 'curiosity',
	displayOptions: {
		show: {
			resource: [
				'marsRoverPhotos',
			],
		},
	},
},
{
	displayName: 'Date',
	description: 'Earth date',
	required: true,
	name: 'marsRoverDate',
	type: 'dateTime',
	default:'',
	displayOptions: {
		show: {
			resource: [
				'marsRoverPhotos',
			],
		},
	},
	routing: {
		request: {
			// You've already set up the URL. qs appends the value of the field as a query string
			qs: {
				earth_date: '={{ new Date($value).toISOString().substr(0,10) }}',
			},
		},
	},
},
// Optional/additional fields will go here
```

This code creates two operations: one to get today's APOD image, and another to send a get request for photos from one of the Mars Rovers. The object named `roverName` requires the user to choose which Rover they want photos from. The `routing` object in the Mars Rover operation references this to create the URL for the API call.

#### Step 3.6: Optional fields <a href="#step-36-optional-fields" id="step-36-optional-fields"></a>

Most APIs, including the NASA API that you're using in this example, have optional fields you can use to refine your query.

To avoid overwhelming users, n8n displays these under **Additional Fields** in the UI.

For this tutorial, you'll add one additional field, to allow users to pick a date to use with the APOD endpoint. Add the following to the properties array:

```typescript
{
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	default: {},
	placeholder: 'Add Field',
	displayOptions: {
		show: {
			resource: [
				'astronomyPictureOfTheDay',
			],
			operation: [
				'get',
			],
		},
	},
	options: [
		{
			displayName: 'Date',
			name: 'apodDate',
			type: 'dateTime',
			default: '',
			routing: {
				request: {
					// You've already set up the URL. qs appends the value of the field as a query string
					qs: {
						date: '={{ new Date($value).toISOString().substr(0,10) }}',
					},
				},
			},
		},
	],									
}
```


### Step 4: Set up authentication and a credential test <a href="#step-4-set-up-authentication-and-a-credential-test" id="step-4-set-up-authentication-and-a-credential-test"></a>

The NASA API requires users to authenticate with an API key. You can also send a request to check that the API key works.

Add the following to `nasaPicsApi.credentials.ts`:

```typescript
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NasaPicsApi implements ICredentialType {
	name = 'NasaPicsApi';
	displayName = 'NASA Pics API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
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
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.nasa.gov',
			url: '/apod',
		},
	};
}
```

For more information about credentials files and options, refer to [Credentials file](reference/credentials-files.md).


### Step 5: Add node metadata <a href="#step-5-add-node-metadata" id="step-5-add-node-metadata"></a>

Metadata about your node goes in the JSON file at the root of your node. n8n refers to this as the codex file. In this example, the file is `NasaPics.node.json`.

Add the following code to the JSON file:

```json
{
	"node": "n8n-nodes-nasapics",
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

### Step 6: Update the npm package details <a href="#step-6-update-the-npm-package-details" id="step-6-update-the-npm-package-details"></a>

Your npm package details are in the `package.json` at the root of the project. It's essential to include the `n8n` object with links to the credentials and base node file. Update this file to include the following information:

```json
{
	// All node names must start with "n8n-nodes-"
	"name": "n8n-nodes-nasapics",
	"version": "0.1.0",
	"description": "n8n node to call NASA's APOD and Mars Rover Photo services.",
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
			"dist/credentials/NasaPicsApi.credentials.js"
		],
		"nodes": [
			"dist/nodes/NasaPics/NasaPics.node.js"
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

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/WlCAEDxY4EZLDV85eB8C/" %}

## Next steps <a href="#next-steps" id="next-steps"></a>

* [Deploy your node](../deploy-your-node/README.md).
* View an example of a declarative node: n8n's [Brevo node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Brevo). Note that the main node is declarative, while the trigger node is in programmatic style.
* Learn about [node versioning](reference/versioning.md).

