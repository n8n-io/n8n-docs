---
contentType: reference
nodeTitle: Code standards
originalFilePath: integrations/creating-nodes/build/reference/code-standards.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards'
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/reference/code-standards
layout:
  description:
    visible: false
---

# Code standards <a href="#code-standards" id="code-standards"></a>

Following defined code standards when building your node makes your code more readable and maintainable, and helps avoid errors. This document provides guidance on good code practices for node building. It focuses on code details. For UI standards and UX guidance, refer to [Node UI design](../../plan-your-node/node-ui-design.md).

## Use the linter <a href="#use-the-linter" id="use-the-linter"></a>

The n8n node linter provides automatic checking for many of the node-building standards. You should ensure your node passes the linter's checks before publishing it. Refer to the [n8n node linter](../../test-your-node/node-linter.md) documentation for more information.

## Use the n8n-node tool <a href="#use-the-n8n-node-tool" id="use-the-n8n-node-tool"></a>

n8n recommends using the [`n8n-node` CLI tool](../using-the-n8n-node-tool.md) to build and test your node. In particular, this is important if you plan on [submitting your node for verification](../../deploy-your-node/submit-community-nodes.md#submit-your-node-for-verification-by-n8n). This ensures that your node has the correct structure and follows community node requirements. It also simplifies linting and testing.

## Write in TypeScript <a href="#write-in-typescript" id="write-in-typescript"></a>

All n8n code is TypeScript. Writing your nodes in TypeScript can speed up development and reduce bugs.

## Detailed guidelines for writing a node <a href="#detailed-guidelines-for-writing-a-node" id="detailed-guidelines-for-writing-a-node"></a>

These guidelines apply to any node you build. 

### Resources and operations <a href="#resources-and-operations" id="resources-and-operations"></a>

If your node can perform several operations, call the parameter that sets the operation `Operation`. If your node can do these operations on more than one resource, create a `Resource` parameter. The following code sample shows a basic resource and operations setup:

```js
export const ExampleNode implements INodeType {
    description: {
        displayName: 'Example Node',
        ...
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Resource One',
                        value: 'resourceOne'
                    },
                    {
                        name: 'Resource Two',
                        value: 'resourceTwo'
                    }
                ],
                default: 'resourceOne'
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                // Only show these operations for Resource One
                displayOptions: {
                    show: {
                        resource: [
                            'resourceOne'
                        ]
                    }
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create an instance of Resource One'
                    }
                ]
            }
        ]
    }
}
```

### Reuse internal parameter names <a href="#reuse-internal-parameter-names" id="reuse-internal-parameter-names"></a>

All resource and operation fields in an n8n node have two settings: a display name, set using the `name` parameter, and an internal name, set using the `value` parameter. Reusing the internal name for fields allows n8n to preserve user-entered data if a user switches operations. 

For example: you're building a node with a resource named 'Order'. This resource has several operations, including Get, Edit, and Delete. Each of these operations uses an order ID to perform the operation on the specified order. You need to display an ID field for the user. This field has a display label, and an internal name. By using the same internal name (set in `value`) for the operation ID field on each resource, a user can enter the ID with the Get operation selected, and not lose it if they switch to Edit.

When reusing the internal name, you must ensure that only one field is visible to the user at a time. You can control this using `displayOptions`.

## Detailed guidelines for writing a programmatic-style node <a href="#detailed-guidelines-for-writing-a-programmatic-style-node" id="detailed-guidelines-for-writing-a-programmatic-style-node"></a>

These guidelines apply when building nodes using the programmatic node-building style. They aren't relevant when using the declarative style. For more information on different node-building styles, refer to [Choose your node building approach](../../plan-your-node/choose-a-node-building-style.md).

### Don't change incoming data <a href="#dont-change-incoming-data" id="dont-change-incoming-data"></a>

Never change the incoming data a node receives (data accessible with `this.getInputData()`) as all nodes share it. If you need to add, change, or delete data, clone the incoming data and return the new data. If you don't do this, sibling nodes that execute after the current one will operate on the altered data and process incorrect data.

It's not necessary to always clone all the data. For example, if a node changes the binary data but not the JSON data, you can create a new item that reuses the reference to the JSON item.


### Use the built in request library <a href="#use-the-built-in-request-library" id="use-the-built-in-request-library"></a>

Some third-party services have their own libraries on npm, which make it easier to create an integration. The problem with these packages is that you add another dependency (plus all the dependencies of the dependencies). This adds more and more code, which has to be loaded, can introduce security vulnerabilities, bugs, and so on. Instead, use the built-in module:

```typescript
// If no auth needed
const response = await this.helpers.httpRequest(options);

// If auth needed
const response = await this.helpers.httpRequestWithAuthentication.call(
	this, 
	'credentialTypeName', // For example: pipedriveApi
	options,
);
```

This uses the npm package [Axios](https://www.npmjs.com/package/axios).

Refer to [HTTP helpers](http-request-helpers.md) for more information, and for migration instructions for the removed `this.helpers.request`.
