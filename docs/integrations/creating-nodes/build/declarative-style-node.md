# Build a declarative-style node

This tutorial walks through building a declarative-style node. Before you begin, make sure this is the node style you need. Refer to [Choose your node building approach](/integrations/creating-nodes/plan/choose-node-method/) for more information.

## Prerequisites

You need the following installed on your development machine:

--8<-- "_snippets/integrations/creating-nodes/prerequisites.md"

## Build your node

In this section, you'll clone n8n's node starter repository, and build a node that integrates the [NASA API](https://api.nasa.gov/){:target=_blank .external-link}. You'll create a node that uses two of NASA's services: APOD (Astronomy Picture of the Day) and Mars Rover Phots.

!!! note "Existing node"
    n8n has a built-in NASA node. To avoid clashing with the existing node, you'll give your version a different name.

### Step 1: Set up the project

n8n provides a starter repository for node development. Using the starter ensures you have all necessary dependencies. It also provides a linter. 

Clone the repository, navigate into the directory, and install dependencies:

```shell
git clone https://github.com/n8n-io/n8n-nodes-starter.git n8n-nodes-nasa-pics
cd n8n-nodes-nasa-pics
npm i
```

The starter contains example nodes and credentials. Delete the following directories and files:

* `nodes/ExampleNode`
* `nodes/HTTPBin`
* `credentials/ExampleCredentials.credentials.ts`
* `credentials/HttpBinApi.credentials.ts`

Now create the following directories and files:

* `nodes/nasapics`
* `nodes/nasapics/NasaPics.node.json`
* `nodes/nasapics/NasaPics.node.ts`
* `nodes/nasapics/nasapics.svg`
* `credentials/NasaPics.credentials.ts`

### Step 2: Update the npm package details

Your npm package details are in the `package.json` at the root of the project. Update this file to include the following information:

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
    "name": "<your-name>",
    "email": "<your-email>"
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
  "n8n": {
    "credentials": [
      "dist/credentials/NasaPics.credentials.js"
    ],
    "nodes": [
      "dist/nodes/nasapics/NasaPics.node.js"
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

### Step 3: Add node metadata

Metadata about your node goes in the JSON file at the root of your node. n8n refers to this as the codex file. In this example, the file is `NasaPics.node.json`.

Add the following:

```json
{
	"node": "n8n-nodes-base.nasapics",
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

For more information on these parameters, refer to [Node codex files](/integrations/creating-nodes/reference/node-codex-files/).

### Step 4: Create the node

Every node must have a base file. In this example, the file is `NasaPics.node.ts`. To keep this tutorial short, you'll place all the node functionality in this one file. When building more complex nodes, you should consider splitting out your functionality into modules. Refer to [Node file structure](/integrations/creating-nodes/build/node-file-structure/) for more information.

#### Step 4.1: Lint configuration and imports

Start by [TODO: do we always want them to disable that linting?] disabling one of the linter warnings, and adding the import statements:

```js
/* eslint-disable n8n-nodes-base/filesystem-wrong-node-filename */
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
```

#### Step 4.2: Create the main class

The node must export an interface that implements INodeType. This interface must include a `description` object [TODO: think this is also an interface? Technical terminology halp!], which in turn contains the `properties` array.

```js
export class NasaPics implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		properties: [
			// Resources and operations will go here
		]
	};
}
```

#### Step 4.3: Add node details

All nodes need some basic parameters, such as their display name, icon, and the basic information for making a request using the node. Add the following to the `description`:

```js
		displayName: 'NASA Pics',
		name: 'nasapics',
		icon: 'file:nasapics.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from NASAs API',
		defaults: {
			name: 'NASA Pics',
			color: '#0b3d91',
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

#### Step 4.4: Add resource

The resource object defines the API resource that the node uses. In this tutorial, you're creating a node to access two of NASA's API endpoints: `planetary/apod` and `mars-photos`. This means you need to define two resource options in `NasaPics.node.ts`. Add the `properties` array, with the resource object:

```js
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
				value: 'marsRoverPhotos'
			}
		],
		default: 'astronomyPictureOfTheDay',
	},
	// Operations will go here

],
```

`type` controls which UI element n8n displays for the resource, and tells n8n what type of data to expect from the user. `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](/integrations/creating-nodes/reference/ui-elements/) for more information.

#### Step 4.5: Add operations

The operations object defines the available operations on a resource.

In a declarative-style node, the operations object includes `routing` (within the `options` array). This sets up the details of the API call.

Add the following to the `properties` array, after the `resource` object:

```js
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'astronomyPictureOfTheDay'
			]
		}
	},
	options: [
		{
			name: 'Get',
			value: 'get',
			action: 'Get a single picture of the day',
			description: 'Get the Astronomy Picture of the day',
			routing: {
				request: {
					method: 'GET',
					url: '/planetary/apod'
				}
			}
		}
	],
	default: 'get'
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'marsRoverPhotos'
			]
		}
	},
	options: [
		{
			name: 'Get',
			value: 'get',
			description: 'Get photos from the Mars Rover',
			routing: {
				request: {
					method: 'GET',
					url: '/mars-photos/api/v1/{{roverName}}/photos'
				}
			}
		}
	],
	default: 'get'
}
```

#### Step 4.6: Additional fields

Most APIs, including the NASA API that you're using in this example, have optional fields you can use to refine your query.

### Step 5: Add an icon

Copy and paste the NASA SVG logo from [here](view-source:https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg){:target=_blank .external-link} into `nasapics.svg`.


--8<-- "_snippets/integrations/creating-nodes/node-icons.md"

### Step 6: Set up authentication

The NASA API requires users to authenticate with an API key.

Add the following to `NasaPicsApi.credentials.ts`:

```js
import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NasaPicsApi implements ICredentialType {
	name = 'nasapicsApi';
	displayName = 'NASA Pics API';
	documentationUrl = '';
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
			key: 'api_key',
			value: '={{$credentials.apiKey}}',
		},
	} as IAuthenticateGeneric;
}
```



## Test your node

--8<-- "_snippets/integrations/creating-nodes/testing.md"