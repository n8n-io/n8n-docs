# Creating your first node

## Prerequisites
You have knowledge of:
- JavaScript (basic knowledge of NodeJS and TypeScript would be helpful)
- Git
- npm
- REST APIs
- Expressions in n8n

You have installed:
- GitHub CLI: You can find instructions on how to install it [here](https://cli.github.com/).
- NodeJS and npm (Current minimum version: 14.15): You can find instructions how to install both using nvm (Node Version Manager) [here](https://github.com/nvm-sh/nvm). In case you already have installed NodeJS you can check your current version by running the following command:
```bash
node -v
```
- Lerna: You can install lerna globally using the following command:
```bash
npm install --global lerna
```

## Picking the node

The first thing that we have to do is pick the service we want to create the node for. We will use [SendGrid](https://sendgrid.com/) as an example.

For the sake of brevity, we are only going to showcase how to add the functionality to create a contact. Since n8n's repository already has a SendGrid node, we are going to name this node FriendGrid to avoid any conflicts.

## Downloading the project

Now that we know which features we want to implement, let’s download the project. To do so, run the following command in your terminal:

```bash
gh repo fork n8n-io/n8n --remote=true --clone=true && cd n8n
```

n8n is built from four main packages:
- cli
- core
- editor-ui
- nodes-base

All these packages are under the folder `/packages` in the n8n folder. We will be working in the `nodes-base` folder as it contains everything related to nodes. Specifically, `/packages/nodes-base/nodes`, `packages/nodes-base/credentials`, and `packages/nodes-base/package.json`.
- The folder `nodes`, contains all the nodes in n8n.
- The folder `credentials` contains all the credentials that the different nodes use. Each node can define multiple credentials, for example, OAuth2 or API Key and each credential requires different parameters that will be asked to the user. Keep in mind that the data the user provides when setting credentials is not stored in files but in an encrypted format in the database.
- The file `package.json` contains all the npm packages that the nodes use along with  all the nodes and credentials that will be loaded when n8n is started.

![n8n folder structure](./images/n8n-folder-structure.png)

## Setting up the scaffolding

1. Go to `packages/nodes-base/nodes`.
2. Create a folder called FriendGrid (name uses PascalCase).
3. Within the folder create a file called `FriendGrid.node.ts` (YourNodeName.node.ts).
4. Download and add the FriendGrid icon to the folder.
	- The icon property has to be either a 60x60 pixels PNG or an SVG and must exist in the node’s folder.
	- An SVG is always preferable, but in case you go with a PNG, make sure that it's compressed. A good tool to do that is [tinypng](https://tinypng.com).
	- In case you do not have the logo at this point, a good place to find company logos is https://github.com/gilbarbara/logos/tree/master/logos
5. Paste the following code in the `FriendGrid.node.ts` file.

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

export class FriendGrid implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'FriendGrid',
        name: 'friendGrid',
        icon: 'file:friendGrid.svg',
        group: ['transform'],
        version: 1,
        description: 'Consume FriendGrid API',
        defaults: {
            name: 'FriendGrid',
            color: '#1A82e2',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
        ],
        properties: [
            // Node properties which the user gets displayed and
            // can change on the node.
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        return [[]];
    }
}
```

Your directory structure should now look like the following.

![FriendGrid's directory structure](./images/friendgrid-directory-structure.png)

In case you are following the tutorial with another API, make sure to change the following properties for your API name:
1. Class name (PascalCase)
2. displayName (PascalCase)
3. default.name (PascalCase)
4. name (camelCase)
5. Description


## Making the node show up in the Editor UI

n8n uses the properties set in the property `description` to render the node in the Editor UI. These properties are `displayName`, `name`, `color`, `icon`, `description`, and `subtitle`.

Check the following figure to see how the properties affect the node’s looks.

![FriendGrid's appearance in Editor UI](./images/friendgrid-appearance.png)

**Note:** The property description conforms to [INodeTypeDescription](https://github.com/n8n-io/n8n/blob/f2666e92ffed2c3983d08e73b1e45a2bd516b90d/packages/workflow/src/Interfaces.ts#L425).

Let's see how the node looks in the UI by doing the following:
1. Go to `/packages/nodes-base/package.json`.
2. Paste `“dist/nodes/FriendGrid/FriendGrid.node.js”,` in the nodes array to register the node (in an alphabetical order).
3. Go to the project's main folder (n8n) in the terminal and run the following commands (it can take a few minutes, don’t worry).

```bash
//Install all dependencies of all modules and link them together
lerna bootstrap --hoist

//Build all the code
npm run build

//Start n8n in development mode
npm run dev
```

4. Open your browser and go to [localhost:8080](http://localhost:8080/). You should be able to see the Editor UI.
5. Open the Create Node menu, type FriendGrid, and click on it to add it to the Editor UI.

**Notes**
- On startup, n8n will load all the nodes and credentials (more about credentials later) that are registered in `/packages/nodes-base/package.json`.
- The property `description.name` uses camelCase.
- The property `description.color` is the company branding's hexadecimal color. This is commonly placed on the company's website under the style guide. In case the website does not include this information, there are many websites that allow you to get a company’s branding colors. For example, [brandpalettes.com](https://brandpalettes.com/).


## Creating the UI for "Create a contact" functionality

Double-clicking on the node will open the Node Editor View, which will be empty since we have not added any UI components yet. Luckily, n8n provides predefined JSON based UI components that we can use to ask the user for different types of data.

FriendGrid's [docs](https://sendgrid.com/docs/api-reference/) mention that to create a contact, we need to provide the following:
- email - Required
- first_name - Optional
- last_name - Optional

There are more parameters that can be provided to create a contact in FriendGrid, but for the sake of this tutorial, only these three will be used.

That’s FriendGrid, but n8n requires a couple of parameters as well.
- resource - Required
- operation - Required

Technically, you can get the node to work without these two parameters, but these should be added for the sake of consistency with the other nodes.

These are used to organize all the functionalities of a node. It ensures that as the node grows, all the functionalities of a node are highly findable by the users.

- The resource value is always singular and its value is the name of the API resource we want to use. Since we are working with contacts, the resource value would be `contact`.
- The operation value is always singular as well and it is the name of the operation to perform over the resource. Since we are creating contacts, the operation value would be `create`.

You might say that you can “Add a contact” and you are right, but we try to use the same operations (create, delete, get, getAll and update) across all the nodes.

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
					Required: true,
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
4. Go to [localhost:8080](http://localhost:8080/), refresh the page, and open the node.

The node should now look like in the following image.

![FriendGrid's required fields](./images/friendgrid-required-fields.png)

We have given the node the possibility to ask for all the required parameters needed to create a contact. But, what about the optional parameters? We can certainly add them below the email parameter and set `required: false`. However, if we had more than two optional parameters, and most APIs do, the UI would become overwhelming for the users. To avoid this, we use a UI element named **collection** (usually called Additional Fields) to group all optional parameters.

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
4. Go to [localhost:8080](http://localhost:8080/), refresh the page, and open the node.

The node should now look like in the following image.

![FriendGrid's all fields](./images/friendgrid-all-fields.png)

Now all our optional fields are presented in the UI and can be set individually depending on the user’s use-case.

## Creating the UI for user credentials

We are going to use FriendGrid's REST API. Most REST APIs use some type of authentication mechanism. FriendGrid uses API Keys. The API Key informs them about who is making the request to their system and gives you access to all the functionality that the API provides. Given all the things it can do, this has to be treated as a sensitive piece of information and should be kept private.

n8n gives you the ability to ask for sensitive information using credentials. In the credentials, you can use all the generally available UI elements. Additionally, The data stored using credentials would be encrypted before being saved to the database. In order to do that, n8n uses an encryption key.

With that in mind, let’s create the UI to ask for the user’s FriendGrid API Key.

The process of creating and registering credentials is similar to that of creating and registering the node:
1. Go to `packages/nodes-base/credentials`.
2. Create a file with the name `FriendGridApi.credentials.ts`.
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

4. Register the credentials in `packages/nodes-base/package.json` by adding `"dist/credentials/FriendGridApi.credentials.js",` (alphabetically) to the `credentials` array.
5. Associate the credentials with the node by adding the following to `description.credentials` in `packages/nodes-base/nodes/FriendGrid/FriendGrid.node.ts`.

```typescript
      {
          name: 'friendGridApi',
          required: true,
      },
```

6. Stop the current n8n process by pressing ctrl + c in the terminal in which you are running n8n.
7. Run again, by entering the following in the terminal.
```bash
npm run dev
```

When you go to the Node Editor view, you should see the following.

![FriendGrid's create credentials](./images/friendgrid-create-credentials.png)

![FriendGrid's credentials](./images/friendgrid-credentials.png)


## Mapping the UI fields to the API

We have all the data that we need to make a request to the FriendGrid API and start creating contacts.

This is where the `execute` method comes into play. Every time the node is executed, this method will be run. Within this method, we can have access to the input items and to the parameters that the user set in the UI, including the credentials.
To map the fields to the API, perform the following steps:
1. Replace the current `execute` method in `package/nodes-base/nodes/FriendGrid.node.ts` with the following code.

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        let responseData;
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;
        //Get credentials the user provided for this node
        const credentials = this.getCredentials('friendGridApi') as IDataObject;

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
}
```

2. Stop the current n8n process by pressing ctrl + c in the terminal in which you are running n8n.
3. Run again, by entering the following in the terminal.
```bash
npm run dev
```
4. Enter the credentials (FriendGrid API Key), contact parameters, and execute the node.
	- Instructions to find the FriendGrid API Key can be found [here](https://sendgrid.com/docs/ui/account-and-settings/api-keys/).

If everything went well, you should see the following:

![Creating a contact in FriendGrid with n8n](./images/create-contact-friendgrid.png)

Now we can successfully create contacts in FriendGrid from n8n.

## Processing multiples items

The example above works, but in real life, you'll probably have a workflow with more than one node. Our current implementation does not play well with the other nodes. If the data is coming into our FriendGrid node from  another node, and that outputs for example, two contacts, our node will process just the first contact. We want our node to process as many items as it receives.

This is when the `this.getInputData()` function comes into play.

Let's try this out:
1. In the Editor UI, create a new workflow. Add a Function node to the workflow and connect it to the FriendGrid node.

![Testing the FriendGrid node](./images/testing-friendgrid.png)

2. Open the function node and paste the following code.

```javascript
 return [
  {
    json: {
      name: 'ricardo@gmail.com'
    }
  },
    {
    json: {
      name: 'jhon@gmail.com'
    }
  },
]
```

3. Execute the Function node. We're using the function node for testing, but you can think of it as any node that is returning “two people” (or more). These two people need to be added to FriendGrid as contacts.

![Output of the Function node](./images/function-node-output.png)

4. Add an expression in the ***Email*** field of the FriendGrid node and reference the name property that the function node outputs.

![Using expressions in the FriendGrid node](./images/expressions-friendgrid.png)

5. Replace the existing `execute` method with the following:

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        let responseData;
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;
        //Get credentials the user provided for this node
        const credentials = this.getCredentials('friendGridApi') as IDataObject;

        for (let i = 0; i < items.length; i++) {
            if (resource === 'contact') {
                if (operation === 'create') {
                    // get email input
                    const email = this.getNodeParameter('email', i) as string;

               		// i = 1 print ricardo@gmail.com
               		// i = 2 print jhon@gmail.com

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
}
```

6. Save and execute the workflow.

If you open the FriendGrid node, you should see the following:

![Output of the FriendGrid node](./images/final-friendgrid.png)

As showcased above, both the items were processed. That’s how all (with a few exceptions) nodes in n8n work. They will automatically iterate over all the items and process them.

Let’s go over the final version of the `execute` method. We are getting the items returned by the `this.getInputData()` function and iterating over all of them. Additionally, while doing so, we use the item index to get the correct parameter value using the function `this.getNodeParameters()`. For example, with the following input:

```javascript
[
  {
    json: {
      name: 'ricardo@gmail.com'
    }
  },
    {
    json: {
      name: 'jhon@gmail.com'
    }
  },
]
```

The `this.getNodeParameters(ParameterName, index)`function outputs the following:

| Index | Parameter Name | Output            |
|-------|----------------|-------------------|
| 0     | email          | ricardo@gmail.com |
| 1     | email          | jhon@gmail.com    |

We used the `this.helpers.request(options)` method to make the HTTP Request that creates the contact in FriendGrid. The FriendGrid endpoint returns the following:

```javascript
{
   job_id: "b82aca74-3640-4097-85ec-7801d833c2cb"
}
```

Finally, we used the `this.helpers.returnJsonArray()` method to map the API’s output data to n8n's data structure. The node ends up returning the data like the following:

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

This is just the tip of the iceberg. We built a regular node that consumes a REST API, but a regular node can do everything that can be done with NodeJS. Aside from regular nodes you can also build Trigger nodes.
