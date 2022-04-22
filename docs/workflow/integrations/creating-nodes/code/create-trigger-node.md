# Creating Your First Trigger Node

Today, you will learn how to create your first trigger node for Workflow².

## Prerequisites
You have knowledge of:

- JavaScript/TypeScript
- REST APIs
- [Webhooks](https://www.getvero.com/resources/webhooks/)
- Expressions in n8n

Install the following tools:

- **Git:** You can find instructions on how to install Git [here](https://git-scm.com/downloads).
- **Node.js and npm:** You can find instructions on how to install both using nvm (Node Version Manager) [here](https://github.com/nvm-sh/nvm). The current minimum version is `14.15`. In case you already have Node.js and npm installed, you can check the current version with the following command:
	```bash
	node -v
	npm -v
	```
**NOTE:** Use node version `14.x` and npm version `6.x`

- **Lerna:** Install [lerna](https://lerna.js.org/) globally with the following command:
	```bash
	npm install --global lerna
	```

## Selecting the node

The first thing that we have to do is pick the service we want to create the node for. We will use [Autopilot](https://www.autopilothq.com/) as an example.


Since n8n's repository already has a Autopilot Trigger node, we will name this node **Autofriend Trigger** to avoid conflicts.

## Cloning the repository

In GitHub, fork the [n8n repository](https://github.com/n8n-io/n8n). Clone it by running the following command in your terminal (don't forget to replace `<USERNAME>` with your GitHub username):

```bash
git clone https://github.com/<USERNAME>/n8n.git && cd n8n
```

n8n is built from four main packages:

- cli
- core
- editor-ui
- nodes-base

All these packages are under the `/packages` folder in the main Doc² folder. We will be working in the `nodes-base` folder as it contains everything related to nodes. Specifically, `/packages/nodes-base/nodes`, `packages/nodes-base/credentials`, and `packages/nodes-base/package.json`.

- The folder `nodes`, contains all the nodes in Workflow².
- The folder `credentials` contains all the credentials that the different nodes use. Each node can define multiple credentials. For example, OAuth2 or API Key. Each credential requires different parameters that the user will have to input. The credentials data that the user provides is stored in an encrypted format in n8n's database.
- The file `package.json` contains all the npm packages that the nodes use. It also contains all the nodes and credentials that are loaded when Doc² is started.

![n8n folder structure](/_images/integrations/creating-nodes/code/n8n-folder-structure.png)


## Creating the node

1. Go to `packages/nodes-base/nodes`.
2. Create a folder called `Autofriend` (the folder names are PascalCase).
3. Within the Autofriend folder, create a file called `AutofriendTrigger.node.ts` (YourNodeNameTrigger.node.ts).
4. Download and add the Autofriend [icon](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Autopilot/autopilot.svg) to the folder. Name it `autopilot.svg`.
	- The icon property has to be either a 60x60 pixels PNG or an SVG and must exist in the node’s folder.
	- An SVG is preferable. In case you have to use a PNG, make sure that it is compressed. A good tool for that is [tinypng](https://tinypng.com).
	- A good place to find company icons is [gilbarbara/logos](https://github.com/gilbarbara/logos/tree/master/logos).
5. Paste the following code in the `AutofriendTrigger.node.ts` file.

```typescript
import {
   IHookFunctions,
   IWebhookFunctions,
} from 'n8n-core';

import {
   IDataObject,
   INodeType,
   INodeTypeDescription,
   IWebhookResponseData,
} from 'n8n-workflow';

/*
import {
	autofriendApiRequest,
} from './GenericFunctions';

import {
	snakeCase,
} from 'change-case';
*/


export class AutofriendTrigger implements INodeType {
   description: INodeTypeDescription = {
	   displayName: 'Autofriend Trigger',
	   name: 'autofriendTrigger',
	   icon: 'file:autofriend.svg',
	   group: ['trigger'],
	   version: 1,
	   subtitle: '={{$parameter["event"]}}',
	   description: 'Handle Autofriend events via webhooks',
	   defaults: {
		   name: 'Autofriend Trigger',
		   color: '#6ad7b9',
	   },
	   inputs: [],
	   outputs: ['main'],
	   credentials: [],
	   webhooks: [
		   {
			   name: 'default',
			   httpMethod: 'POST',
			   responseMode: 'onReceived',
			   path: 'webhook',
		   },
	   ],
	   properties: [],
   };
   async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
	   return {
		   workflowData: [],
	   };
   }
}
```

Your directory structure should now look like the following.

![Autofriend's directory structure](/_images/integrations/creating-nodes/code/autopilot-directory-structure.png)


## Adding the node to Editor UI

n8n uses the properties set in the property `description` to render the node in the Editor UI. These properties are `displayName`, `name`, `color`, `icon`, `description`, and `subtitle`.

Check the following figure to see how the properties affect the looks of the node.

![Autofriend's appearance in Editor UI](/_images/integrations/creating-nodes/code/autopilot-appearance.png)

**Note:** The property description conforms to [INodeTypeDescription](https://github.com/n8n-io/n8n/blob/f2666e92ffed2c3983d08e73b1e45a2bd516b90d/packages/workflow/src/Interfaces.ts#L425).

Let's see how the node looks in the UI by following these steps:

1. Go to `/packages/nodes-base/package.json`.
2. Paste `"dist/nodes/Autofriend/AutofriendTrigger.node.js",` in the nodes array to register the node (in an alphabetical order).
3. Go to the project's main folder (n8n) in the terminal and run the following commands (it can take a few minutes).
	- The first command installs all dependencies of all the modules and links them together.
	- The second command builds all the code.
	- The third command starts Doc² in development mode.

```bash
lerna bootstrap --hoist
npm run build
npm run dev
```

4. Open your browser and go to [localhost:8080](http://localhost:8080/) and you should be able to see the Editor UI.
5. Open the ***Create Node*** menu, select the ***Trigger*** tab, type `Autofriend`, and click on it to add the node to the Editor UI.

**Notes**

- On startup, Doc² will load all the nodes and credentials (more about credentials later) that are registered in `/packages/nodes-base/package.json`.
- The property `description.name` uses camelCase.
- The property `description.color` is the company's branding color in hexadecimal. In case the website does not include this information, there are other websites that help you get a company’s branding colors. For example, [brandpalettes.com](https://brandpalettes.com/).


## Creating the UI for the node

Double-clicking on the Autofriend Trigger node will open the Node Editor View. It will be empty since we haven't added any UI components yet. Luckily, Doc² provides predefined JSON-based UI components that we can use to ask the user for different types of data.

Autopilots's [docs](https://autopilot.docs.apiary.io/#reference/rest-hooks/register-rest-hook/register-a-rest-hook) mention that to create a hook, we need to provide the following pieces of information:

- event - Required
- target_url - Required

In the `event` parameter, we provide the name of the event for which we want to be notified. For example, `contact_added`. As the name implies, by providing `contact_added` as the event, we will be notified every time a contact is added to Autofriend.

In the `target_url` parameter, we provide the URL where Autofriend will notify us when the event defined in the event parameter takes place. We don't need to ask the user for this parameter as Doc² provides us with a method to obtain it.


### Adding the fields

Let’s make the Node Editor View ask for these parameters:
1. Add the following under `description.properties` in `packages/nodes-base/nodes/Autofriend/AutofriendTrigger.node.ts.`.

```typescript
{
	displayName: 'Event',
	name: 'event',
	type: 'options',
	required: true,
	default: '',
	options: [
		{
			name: 'Contact Added',
			value: 'contactAdded',
		},
		{
			name: 'Contact Added To List',
			value: 'contactAddedToList',
		},
		{
			name: 'Contact Entered Segment',
			value: 'contactEnteredSegment',
		},
		{
			name: 'Contact Left Segment',
			value: 'contactLeftSegment',
		},
		{
			name: 'Contact Removed From List',
			value: 'contactRemovedFromList',
		},
		{
			name: 'Contact Unsubscribed',
			value: 'contactUnsubscribed',
		},
		{
			name: 'Contact Updated',
			value: 'contactUpdated',
		},
	],
},
```

2. Stop the current Doc² process by pressing `ctrl + c` in the terminal in which you are running Workflow².
3. Run again, by entering the following in the terminal.
```bash
npm run dev
```
4. Go to [localhost:8080](http://localhost:8080/), refresh the page, and open the node again.

The node should now look like in the following image.

![Autofriend's required fields](/_images/integrations/creating-nodes/code/autofriend-fields.png)


## Creating the UI for credentials

Most REST APIs use some sort of authentication mechanism. Autofriend's REST API uses API Keys. The API Key informs them about who is making the request to their system and gives you access to all the functionality that the API provides. Given all the things it can do, this has to be treated as a sensitive piece of information and should be kept private.

n8n gives you the ability to ask for sensitive information using credentials. In the credentials, you can use all the generally available UI elements. Additionally, the data that is stored using the credentials would be encrypted before being saved to the database. In order to do that, Doc² uses an encryption key.

With that in mind, let’s create the UI to ask for the user’s Autofriend API Key. The process of creating and registering credentials is similar to that of creating and registering the node:

1. Go to `packages/nodes-base/credentials`.
2. Within the credentials folder, create a file named `AutofriendApi.credentials.ts`.
3. Paste the following code.

```typescript
import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class AutofriendApi implements ICredentialType {
	name = 'autofriendApi';
	displayName = 'Autofriend API';
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
5. Paste `"dist/credentials/AutofriendApi.credentials.js",` in the credentials array to register the credentials (in an alphabetical order).
6. Got to `packages/nodes-base/nodes/Autofriend/AutofriendTrigger.node.ts`.
7. Associate the credentials with the node by adding the following to `description.credentials`.

```typescript
 credentials: [
	  {
		  name: 'autofriendApi',
		  required: true,
	  },
],
```

8. Stop the current Doc² process by pressing `ctrl + c` in the terminal in which you are running Workflow².
9. Run again, by entering the following in the terminal.
```bash
npm run dev
```

When you go to the Node Editor view, you should see the following.

![Autofriend's create credentials](/_images/integrations/creating-nodes/code/autofriend-create-credentials.png)

![Autofriend's credentials](/_images/integrations/creating-nodes/code/autofriend-credentials.png)


## Understanding the life cycle for the webhook method

When a Trigger node is executed either in test or production mode, the following happens:

### Doc² persists all the webhooks defined in description.webhooks

The persisted data will be used later to verify if the incoming requests to the n8n’s webhook endpoint are valid.

The property webhooks implements the interface **IWebhookDescription**. The interface has four properties.

1. **name:** The property name where Doc² will look for the life cycle methods.
2. **httpMethod:** The HTTP method.
3. **responseMode:** When the trigger will respond. When developing a trigger node, this property must be set to `onReceived`.
4. **path:** The path added to the base URL.

For example, for a Trigger node with the following `webhooks` property, Doc² will create the following webhooks URLs.

```typescript
webhooks: [
	{
		name: 'default',
		httpMethod: 'POST',
		responseMethod: 'onReceived',
		path: 'webhook',
	},
]
```


- **Test:** POST {{WEBHOOK_TUNNEL_URL || localhost}}/webhook-test/{{uuid}}/{{path}}
- **Production:** POST {{WEBHOOK_TUNNEL_URL || localhost}}/webhook/{{uuid}}/{{path}}


These URLs can be found in the node under the `Webhook URLs` label.

These webhook URLs will be used as the notification URL (also known as the callback URL or target URL) when creating the webhook in the external system.

**Note:** In test mode, the webhooks are persisted in memory. In production mode, they are persisted in the database.


### Doc² executes the life cycle methods

The life cycle methods allow us to create, delete, and check if the webhook exists in the external system.

**Methods**

- `checkExist`: This is the first method that gets called. It checks if the webhook with the current path is already registered in the external system or not. If the webhook is already registered, Doc² persists the webhook ID. If the webhook is not registered with the external system, the `create` method gets executed.
- `create`: This method gets called if the `checkExist` method returns false (if the webhook with the current path does not exist in the external system). This method registers the webhook in the external system and stores the webhook ID in Workflow².
- `delete`: This method gets called when the trigger is either stopped manually or when the workflow is deactivated. It uses the ID previously persisted by either the create or the checkExist method to delete the webhook from the external system.

![Lifecycle flowchart](/_images/integrations/creating-nodes/code/lifecycle.png)


### Wait for new events to trigger the workflow

Every time the external system notifies us about a change, by making an HTTP Request to the URL we previously registered in the `create` method, the `execute` method is called. Within this method, we have access to the request object and everything it contains. For example, body, headers, querystring, etc. The data the method returns is the data we want the rest of the workflow to have access to.

Let’s see how this would look for our current use-case:

1. Go to `packages/nodes-base/nodes/Autofriend`, create a file named `GenericFunctions.ts`, and paste the following code.

```typescript
import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	IDataObject,
	IHookFunctions,
	IWebhookFunctions,
} from 'n8n-workflow';

export async function autofriendApiRequest(this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions, method: string, resource: string, body: any = {}, query: IDataObject = {}, uri?: string, option: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any

	const credentials = await this.getCredentials('autofriendApi') as IDataObject;

	const apiKey = credentials.apiKey;

	const endpoint = 'https://api2.autopilothq.com/v1';

	const options: OptionsWithUri = {
		headers: {
			'Content-Type': 'application/json',
			autopilotapikey: apiKey,
		},
		method,
		body,
		qs: query,
		uri: uri || `${endpoint}${resource}`,
		json: true,
	};
	if (!Object.keys(body).length) {
		delete options.body;
	}
	if (!Object.keys(query).length) {
		delete options.qs;
	}

	try {
		return await this.helpers.request!(options);
	} catch (error) {
		if (error.response) {
			const errorMessage = error.response.body.message || error.response.body.description || error.message;
			throw new Error(`Autopilot error response [${error.statusCode}]: ${errorMessage}`);
		}
		throw error;
	}
}
```

2. Go to `packages/nodes-base/nodes/AutofriendTrigger.node.ts` and add the following code after the property description.

```typescript
// @ts-ignore
webhookMethods = {
	default: {
		async checkExists(this: IHookFunctions): Promise<boolean> {
			const webhookData = this.getWorkflowStaticData('node');
			const webhookUrl = this.getNodeWebhookUrl('default');
			const event = this.getNodeParameter('event') as string;
			const { hooks: webhooks } = await autofriendApiRequest.call(this, 'GET', '/hooks');
			for (const webhook of webhooks) {
				if (webhook.target_url === webhookUrl && webhook.event === snakeCase(event)) {
					webhookData.webhookId = webhook.hook_id;
					return true;
				}
			}
			return false;
		},
		async create(this: IHookFunctions): Promise<boolean> {
			const webhookUrl = this.getNodeWebhookUrl('default');
			const webhookData = this.getWorkflowStaticData('node');
			const event = this.getNodeParameter('event') as string;
			const body: IDataObject = {
				event: snakeCase(event),
				target_url: webhookUrl,
			};
			const webhook = await autofriendApiRequest.call(this, 'POST', '/hook', body);
			webhookData.webhookId = webhook.hook_id;
			return true;
		},
		async delete(this: IHookFunctions): Promise<boolean> {
			const webhookData = this.getWorkflowStaticData('node');
			try {
				await autofriendApiRequest.call(this, 'DELETE', `/hook/${webhookData.webhookId}`);
			} catch (error) {
				return false;
			}
			delete webhookData.webhookId;
			return true;
		},
	},
};
}
```
3. Replace the `webhook` function with the following.
```typescript
async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
	const req = this.getRequestObject();
	return {
		workflowData: [
			this.helpers.returnJsonArray(req.body),
		],
};
```
4. In the same file, uncomment the code snippet on the top to import `autoFriendApiRequest` and `snakeCase`.
5. Stop the current Doc² process by pressing `ctrl + c` in the terminal where you are running Workflow².
6. Run the project using a tunnel by entering `./packages/cli/bin/n8n start --tunnel` in the terminal. Access the Doc² Editor UI at [localhost:5678](http://localhost:5678/workflow).
7. Enter the API key in the credentials. Instructions to find the API Key can be found [here](../credentials/autopilot).
8. Go to the workflow editor, save your workflow, and execute the node.

![Executed node](/_images/integrations/creating-nodes/code/executed-node.png)

9. Log into Autopilot and update a contact. Keep in mind that this should be done within two minutes after you executed the node. After that time frame, the webhook will be unregistered automatically and you will not be able to receive the event. If it takes you longer than that, please execute the node and update the contact again.

![Executed node with results](/_images/integrations/creating-nodes/code/executed-node-with-results.png)

The trigger node is now receiving events. Sometimes it might take a bit longer for the payload to arrive.

You probably noticed that this time we did not run the project using `npm run dev`, but instead using `./packages/cli/bin/n8n start --tunnel`.

Since our server is running locally, we need a tool that lets us proxy all requests to our local machine so that Doc² receives and handles the events from the external service (Autopilot). This gets achieved using a tunnel. The details on how a tunnel works are out of the scope of this tutorial. If you want to know about it, you can check this [link](http://localtunnel.github.io/www/). Keep in mind that the tunnel is meant for development purposes only and should not be used in production.


## Summary

In this tutorial, we implemented one functionality of the Autofriend webhook API. We made the node show up in the Editor UI and in the Create Node menu with Autofriend's branding. Then, we added the fields necessary to create a webhook in the external service. We also added the credentials so that the API Key could be stored safely. Finally, we mapped all the parameters to the Autofriend API.

## Next steps

Once you have created the node and want to contribute to Doc², please check the [Node Review Checklist](/workflow/integrations/creating-nodes/code/node-review-checklist/). Make sure you complete the checklist before creating a pull request.