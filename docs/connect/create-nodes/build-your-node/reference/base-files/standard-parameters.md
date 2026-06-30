---
title: Standard parameters
description: A reference document listing the standard parameters of the node base file.
contentType: reference
nodeTitle: Standard parameters
originalFilePath: >-
  integrations/creating-nodes/build/reference/node-base-files/standard-parameters.md
originalUrl: >-
  https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/standard-parameters
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/reference/base-files/standard-parameters
layout:
  description:
    visible: false
---

# Standard parameters <a href="#standard-parameters" id="standard-parameters"></a>

These are the standard parameters for the [node base file](README.md). They're the same for all node types.

## `displayName` <a href="#displayname" id="displayname"></a>

_String_ | _Required_

This is the name users see in the n8n GUI.

## `name` <a href="#name" id="name"></a>

_String_ | _Required_

The internal name of the object. Used to reference it from other places in the node.

## `icon` <a href="#icon" id="icon"></a>

_String_ or _Object_ | _Required_

Specifies an icon for a particular node. n8n recommends uploading your own image file. 

You can provide the icon file name as a string, or as an object to handle different icons for light and dark modes.
If the icon works in both light and dark modes, use a string that starts with `file:`, indicating the path to the icon file. For example:

```
icon: 'file:exampleNodeIcon.svg'
```
To provide different icons for light and dark modes, use an object with `light` and `dark` properties. For example:
```
icon: { 
  light: 'file:exampleNodeIcon.svg', 
  dark: 'file:exampleNodeIcon.dark.svg' 
}
```

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/dGOXJYk0OQgOLlRpyJnn/" %}

## `group` <a href="#group" id="group"></a>

_Array of strings_ | _Required_

Tells n8n how the node behaves when the workflow runs. Options are:

* `trigger`: node waits for a trigger.
* `schedule`: node waits for a timer to expire.
* `input`, `output`, `transform`: these currently have no effect.
* An empty array, `[]`. Use this as the default option if you don't need `trigger` or `schedule`.

## `description` <a href="#description" id="description"></a>

_String_ | _Required_

A short description of the node. n8n uses this in the GUI.

## `defaults` <a href="#defaults" id="defaults"></a>

_Object_ | _Required_

Contains essential brand and name settings.

The object can include:

* `name`: String. Used as the node name on the canvas if the `displayName` is too long.
* `color`: String. Hex color code. Provide the brand color of the integration for use in n8n.

## `forceInputNodeExecution` <a href="#forceinputnodeexecution" id="forceinputnodeexecution"></a>

_Boolean_ | _Optional_

When building a multi-input node, you can choose to force all preceding nodes on all branches to execute before the node runs. The default is `false` (requiring only one input branch to run).

## `inputs` <a href="#inputs" id="inputs"></a>

_Array of strings_ | _Required_

Names the input connectors. Controls the number of connectors the node has on the input side. If you need only one connector, use `inputs: [NodeConnectionTypes.Main]`.


## `outputs` <a href="#outputs" id="outputs"></a>

_Array of strings_ | _Required_ 

Names the output connectors. Controls the number of connectors the node has on the output side. If you need only one connector, use `outputs: [NodeConnectionTypes.Main]`.

## `requiredInputs` <a href="#requiredinputs" id="requiredinputs"></a>

_Integer_ or _Array_ | _Optional_

Used for multi-input nodes. Specify inputs by number that must have data (their branches must run) before the node can execute.

## `credentials` <a href="#credentials" id="credentials"></a>

_Array of objects_ | _Required_  

This parameter tells n8n the credential options. Each object defines an authentication type.

The object must include:


* `name`: the credential name. Must match the `name` property in the credential file. For example, `name: 'asanaApi'`  in [`Asana.node.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Asana/Asana.node.ts) links to `name = 'asanaApi'` in [`AsanaApi.credential.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/credentials/AsanaApi.credentials.ts).
* `required`: Boolean. Specify whether authentication is required to use this node.


## `requestDefaults` <a href="#requestdefaults" id="requestdefaults"></a>

_Object_ | _Required_  

Set up the basic information for the API calls the node makes.

This object must include:

* `baseURL`: The API base URL.

You can also add:

* `headers`: an object describing the API call headers, such as content type.
* `url`: string. Appended to the `baseURL`. You can usually leave this out. It's more common to provide this in the `operations`.

## `properties` <a href="#properties" id="properties"></a>

_Array of objects_ | _Required_  

This contains the resource and operations objects that define node behaviors, as well as objects to set up mandatory and optional fields that can receive user input.

### Resource objects <a href="#resource-objects" id="resource-objects"></a>

A resource object includes the following parameters:

* `displayName`: String. This should always be `Resource`.
* `name`: String. This should always be `resource`.
* `type`: String. Tells n8n which UI element to use, and what input type to expect. For example, `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](../node-ui-elements.md) for more information.
* `noDataExpression`: Boolean. Prevents using an expression for the parameter. Must always be `true` for `resource`. 

### Operations objects <a href="#operations-objects" id="operations-objects"></a>

The operations object defines the available operations on a resource.

* `displayName`: String. This should always be `Options`.
* `name`: String. This should always be `option`.
* `type`: String. Tells n8n which UI element to use, and what input type to expect. For example, `dateTime` results in n8n adding a date picker. Refer to [Node UI elements](../node-ui-elements.md) for more information.
* `noDataExpression`: Boolean. Prevents using an expression for the parameter. Must always be `true` for `operation`.
* `options`: Array of objects. Each objects describes an operation's behavior, such as its routing, the REST verb it uses, and so on. An `options` object includes:
	* `name`. String.
	* `value`. String.
	* `action`: String. This parameter combines the resource and operation. You should always include it, as n8n will use it in future versions. For example, given a resource called `"Card"` and an operation `"Get all"`, your action is `"Get all cards"`.
	* `description`: String.
	* `routing`: Object containing request details.

### Additional fields objects <a href="#additional-fields-objects" id="additional-fields-objects"></a>

These objects define optional parameters. n8n displays them under **Additional Fields** in the GUI. Users can choose which parameters to set.

The objects must include:

```js
displayName: 'Additional Fields',
name: 'additionalFields',
// The UI element type
type: ''
placeholder: 'Add Field',
default: {},
displayOptions: {
  // Set which resources and operations this field is available for
  show: {
    resource: [
      // Resource names
    ],
    operation: [
      // Operation names
    ]
  },
}
```

For more information about UI element types, refer to [UI elements](../node-ui-elements.md).
