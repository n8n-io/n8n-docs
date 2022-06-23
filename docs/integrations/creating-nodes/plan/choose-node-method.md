# Choose your node building approach

n8n has two node-building styles:

* Declarative: a JSON-based approach. This is simpler to write, and is the recommended option for most cases.
* Programmatic: this style is more verbose. You must use the programmatic style for:
    * Trigger nodes
    * Any node that isn't REST-based. This includes nodes that need to call a GraphQL API and nodes that use external dependencies.
    * Any node that needs to transform incoming data.
    * If you want to use full versioning. Refer to [Node versioning](/integrations/creating-nodes/build/node-versioning/) for more information on types of versioning.

The main difference between the declarative and programmatic styles is how they handle incoming data and build API requests. The programmatic style requires an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the parameters object.

Consider the example from the build your first node tutorials [TODO: add links once they're finalised]. This example creates a simplified version of the SendGrid integration, called "FriendGrid." The following code snippets aren't complete: they emphasize the differences in the node building styles.

In programmatic style:

```js
// Import statements here

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

In declarative style:

```js
// Import statements here

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
                    email: {{$parameter["email"]}}
                    }
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
