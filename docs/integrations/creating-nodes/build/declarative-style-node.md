# Build a declarative-style node

This tutorial walks through building a declarative-style node. Before you begin, make sure this is the node style you need. Refer to [Choose your node building approach](/integrations/creating-nodes/plan/choose-node-method/) for more information.

## Prerequisites

You need the following installed on your development machine:

--8<-- "_snippets/integrations/creating-nodes/prerequisites.md"

You need some understanding of:

- JavaScript/TypeScript
- REST APIs
- git

## Build your node

In this section, you'll clone n8n's node starter repository, and build a node that integrates the [NASA API](https://api.nasa.gov/){:target=_blank .external-link}. You'll create a node that uses two of NASA's services: APOD (Astronomy Picture of the Day) and Mars Rover Photos. To keep the code examples short, the node won't implement every available option for the Mars Rover Photos endpoint.

!!! note "Existing node"
    n8n has a built-in NASA node. To avoid clashing with the existing node, you'll give your version a different name.

### Step 1: Set up the project


n8n provides a starter repository for node development. Using the starter ensures you have all necessary dependencies. It also provides a linter. 

Clone the repository and navigate into the directory:

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from the template repository.
2. Clone your new repository:
		```shell
		git clone https://github.com/<your-organization>/<your-repo-name>.git n8n-nodes-nasa-pics
		cd n8n-nodes-nasa-pics
		```

The starter contains example nodes and credentials. Delete the following directories and files:

* `nodes/ExampleNode`
* `nodes/HTTPBin`
* `credentials/ExampleCredentials.credentials.ts`
* `credentials/HttpBinApi.credentials.ts`

Now create the following directories and files:

* `nodes/NasaPics`
* `nodes/NasaPics/NasaPics.node.json`
* `nodes/NasaPics/NasaPics.node.ts`
* `nodes/NasaPics/nasapics.svg`
* `credentials/NasaPicsApi.credentials.ts`

These are the key files required for any node. Refer to [Node file structure](/integrations/creating-nodes/build/reference/node-file-structure/) for more information on required files and recommended organization.

Now install the project dependencies:

```shell
npm i
```

### Step 2: Add an icon

Copy and paste the NASA SVG logo from [here](https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg){:target=_blank .external-link} into `nasapics.svg`. To get the SVG source, right-click the image then select **View page source**.


--8<-- "_snippets/integrations/creating-nodes/node-icons.md"

### Step 3: Update the npm package details

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
	"dependencies": {
		// don't change
	}
}

```

### Step 4: Add node metadata

Metadata about your node goes in the JSON file at the root of your node. n8n refers to this as the codex file. In this example, the file is `NasaPics.node.json`.

Add the following code to the JSON file:

```json
{
	"node": "n8n-nodes-base.NasaPics",
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

Every node must have a base file. In this example, the file is `NasaPics.node.ts`. To keep this tutorial short, you'll place all the node functionality in this one file. When building more complex nodes, you should consider splitting out your functionality into modules. Refer to [Node file structure](/integrations/creating-nodes/build/reference/node-file-structure/) for more information.

#### Step 5.1: Imports

Start by adding the import statements:

```typescript
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
```

#### Step 5.2: Create the main class

The node must export an interface that implements INodeType. This interface must include a `description` interface, which in turn contains the `properties` array.

!!! note "Class names and file names"
		Make sure the class name and the file name match. For example, given a class `NasaPics`, the filename must be `NasaPics.node.ts`.

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

#### Step 5.3: Add node details

All nodes need some basic parameters, such as their display name, icon, and the basic information for making a request using the node. Add the following to the `description`:

```typescript
displayName: 'NASA Pics',
name: 'NasaPics',
icon: 'file:nasapics.svg',
group: ['transform'],
version: 1,
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
description: 'Get data from NASAs API',
defaults: {
	name: 'NASA Pics',
},
inputs: ['main'],
outputs: ['main'],
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

#### Step 5.4: Add resources

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

`type` controls which UI element n8n displays for the resource, and tells n8n what type of data to expect from the user. `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](/integrations/creating-nodes/build/reference/ui-elements/) for more information.

#### Step 5.5: Add operations

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
					url: '=/mars-photos/api/v1/rovers/{{$parameter.roverName}}/photos',
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

#### Step 5.6: Optional fields

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


### Step 6: Set up authentication

The NASA API requires users to authenticate with an API key.

Add the following to `nasaPicsApi.credentials.ts`:

```typescript
import {
	IAuthenticateGeneric,
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
	authenticate = {
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	} as IAuthenticateGeneric;
}
```

For more information about credentials files and options, refer to [Credentials file](/integrations/creating-nodes/build/reference/credentials-files/).



## Test your node

--8<-- "_snippets/integrations/creating-nodes/testing.md"

## Next steps

* [Deploy your node](/integrations/creating-nodes/deploy/).
* View an example of a declarative node: n8n's [SendInBlue node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/SendInBlue){:target=_blank .external-link}. Note that the main node is declarative, while the trigger node is in programmatic style.
* Learn about [node versioning](/integrations/creating-nodes/build/reference/node-versioning/).

