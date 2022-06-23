# Build a declarative-style node

This tutorial walks through building a declarative-style node. Before you begin, make sure this is the node style you need. Refer to [Choose your node building approach](/integrations/creating-nodes/plan/choose-node-method/) for more information.

## Prerequisites

You need the following installed on your development machine:

--8<-- "_snippets/integrations/creating-nodes/prerequisites.md"

## Build your node

In this section, you'll clone n8n's node starter repository, and build a node that integrates the [OpenWeatherMap API](https://openweathermap.org/api){:target=_blank .external-link}.

!!! note "Existing node"
    n8n has a built-in OpenWeatherMap node. To avoid clashing with the existing node, you'll give your version a different name.

### Step 1: Set up the project

n8n provides a starter repository for node development. Using the starter ensures you have all necessary dependencies. It also provides a linter. 

Clone the repository, navigate into the directory, and install dependencies:

```shell
git clone https://github.com/n8n-io/n8n-nodes-starter.git
cd n8n-nodes-starter
npm i
```

The starter contains example nodes and credentials. Delete the following directories and files:

* `nodes/ExampleNode`
* `nodes/HTTPBin`
* `credentials/ExampleCredentials.credentials.ts`
* `credentials/HttpBinApi.credentials.ts`

Now create the following directories and files:

* `nodes/OpenWeatherMap`
* `nodes/OpenWeatherMap/OpenWeatherMap.node.json`
* `nodes/OpenWeatherMap/OpenWeatherMap.node.ts`
* `nodes/OpenWeatherMap/openweathermap.svg`
* `credentials/OpenWeatherMap.credentials.ts`


### Step 2: Add node configuration

Your node configuration goes in the JSON file at the root of your node. In this example: `OpenWeatherMap.node.json`.

Add the following:

```json
{
	"node": "n8n-nodes-base.openweatherapi",
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

Note that:

* `node` must always start with `n8n-nodes-base.`.
* `nodeVersion` is [TODO: how does this interact with our versioning?]
* `codexVersion` refers to the n8n [TODO: what even is this?]
* The `resources` section should contain links to your node documentation. n8n automatically adds help links to credentials and nodes in the GUI.

### Step 3: Create the node

Every node must have a base file. In this example, the file is `OpenWeatherMap.node.ts`. To keep this tutorial short, you'll place all the node functionality in this one file. When building more complex nodes, you should consider splitting out your functionality across modules. Refer to [Node file structure](/integrations/creating-nodes/build/node-file-structure/) for more information.




### Step : Add an icon

Copy and paste this SVG into `openweathermap.svg`:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z"/></svg>
```

--8<-- "_snippets/integrations/creating-nodes/node-icons.md"


## Test your node

--8<-- "_snippets/integrations/creating-nodes/testing.md"