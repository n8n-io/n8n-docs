---
contentType: explanation
nodeTitle: Choose a node building style
originalFilePath: integrations/creating-nodes/plan/choose-node-method.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method'
url: >-
  https://docs.n8n.io/connect/create-nodes/plan-your-node/choose-a-node-building-style
layout:
  description:
    visible: false
---

# Choose your node building approach <a href="#choose-your-node-building-approach" id="choose-your-node-building-approach"></a>

n8n has two node-building styles, declarative and programmatic. Build your node in the declarative style. It's the default for new nodes.

The declarative style:

* Uses a JSON-based syntax, making it simpler to write, with less risk of introducing bugs.
* Is more future-proof.
* Supports integration with REST APIs.
* Needs no `execute()` method, so there's less code to write and maintain.

If you're not sure which style your node needs, start declarative. The [`n8n-node` tool](../build-your-node/using-the-n8n-node-tool.md) scaffolds a declarative node for you, and [Build a declarative-style node](../build-your-node/tutorial-build-a-declarative-style-node.md) walks through a complete example.

## When you need the programmatic style

The programmatic style is more verbose, and it puts your node's behavior in code that you have to maintain. Treat it as the exception. Use the programmatic style when your node is one of these:

* A trigger node.
* A node that isn't REST-based. This includes nodes that need to call a GraphQL API and nodes that use external dependencies.
* A node that needs to transform data beyond what routing handles. The declarative style can change the request with `routing.request.preSend` and the API response with `routing.output.postReceive`. Use the programmatic style when your node needs to work on incoming items independently of a single API call.
* A node that needs feature-based versioning to branch its behavior in code, using `this.isNodeFeatureEnabled()`. Declarative nodes can still use light versioning, and can read feature flags with `@feature` in `displayOptions`. Refer to [Node versioning](../build-your-node/reference/versioning.md) for more information on types of versioning.

If your node isn't on this list, build it in the declarative style.

## Data handling differences <a href="#data-handling-differences" id="data-handling-differences"></a>

The main difference between the declarative and programmatic styles is how they handle incoming data and build API requests. The programmatic style requires an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the `operations` object. Refer to [Node base file](../build-your-node/reference/base-files/README.md) for more information on node parameters and the `execute()` method.

## Syntax differences <a href="#syntax-differences" id="syntax-differences"></a>

To understand the difference between the declarative and programmatic styles, compare the two code snippets below. This example creates a simplified version of the SendGrid integration, called "FriendGrid." The following code snippets aren't complete: they emphasize the differences in the node building styles.

FriendGrid calls a REST API and doesn't transform its input, so the declarative style is the right choice for it. In declarative style:

```js
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

// Create the FriendGrid class
export class FriendGrid implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'FriendGrid',
    name: 'friendGrid',
    . . .
    // Set up the basic request configuration
    requestDefaults: {
      baseURL: 'https://api.sendgrid.com/v3/marketing'
    },
    properties: [
      {
        displayName: 'Resource',
        . . .
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
            // Add the routing object
            routing: {
              request: {
                method: 'POST',
                url: '=/contacts',
                send: {
                  type: 'body',
                  properties: {
                    email: '={{$parameter["email"]}}'
                  }
                }
              },
              // Handle the response to contact creation
              output: {
                postReceive: [
                  {
                    type: 'set',
                    properties: {
                      value: '={{ { "success": $response } }}'
                    }
                  }
                ]
              }
            }
          },
        ],
        default: 'create',
        description: 'The operation to perform.',
      },
      {
        displayName: 'Email',
        . . .
      },
      {
        displayName: 'Additional Fields',
        // Sets up optional fields
      },
    ],
  }
  // No execute method needed
}
```

The same node in programmatic style needs an `execute()` method to read the parameters and build the request by hand:

```js
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IRequestOptions,
} from 'n8n-workflow';

// Create the FriendGrid class
export class FriendGrid implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'FriendGrid',
    name: 'friendGrid',
    . . .
    properties: [
      {
        displayName: 'Resource',
        . . .
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
        . . .
      },
      {
        displayName: 'Additional Fields',
        // Sets up optional fields
      },
    ],
};

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    let responseData;
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;
    //Get credentials the user provided for this node
    const credentials = await this.getCredentials('friendGridApi') as IDataObject;

    if (resource === 'contact') {
      if (operation === 'create') {
      // Get email input
      const email = this.getNodeParameter('email', 0) as string;
      // Get additional fields input
      const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;
      const data: IDataObject = {
          email,
      };

      Object.assign(data, additionalFields);

      // Make HTTP request as defined in https://sendgrid.com/docs/api-reference/
      const options: IRequestOptions = {
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
        url: `https://api.sendgrid.com/v3/marketing/contacts`,
        json: true,
      };
      responseData = await this.helpers.httpRequest(options);
      }
    }
    // Map data to n8n data
    return [this.helpers.returnJsonArray(responseData)];
  }
}
```
