# Node Review Checklist

If you want to create a new node for a service - that's great, thank you! We recommend you take a look at the [existing nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes) to get an idea of how your code should look and work like.

There are several things to keep in mind when creating the node. To help you, we prepared a checklist that covers the requirements for creating nodes, from preparation to submission.

Make sure you tick the boxes below before submitting a node for review, as this will help our team review your PR easier and faster.

## Preparation
<input type="checkbox"> Set up your editor for code formatting (indentation, new lines, linting). If you use Visual Studio Code, you can use the <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin">TSLint extension</a> for linting.</input> <br>
<input type="checkbox"> Get credentials (e.g., Client ID, Client Secret, API key, user login, user password, website URL) for the service you are building a node for.</input>

## Development

<input type="checkbox"> Open a pull request as early as possible with `WIP` in the pull request title.</input><br>
<input type="checkbox"> If you are creating a node requested by a community member, make sure to comment on the feature request in the [community forum](https://community.n8n.io/c/feature-requests/5).</input><br>
<input type="checkbox"> Ensure complementary operations to each resource (e.g., create, delete) have been added.</input><br>
<input type="checkbox"> Ensure the node works with multiple items via one input.</input><br>
<input type="checkbox"> Ensure the parameters have the correct type.</input><br>
<input type="checkbox"> Mind the defaults: if the service has a default as true, keep it as true. Changing default values can break the existing workflows of the users.</input><br>
<input type="checkbox"> Check if the node disposes of everything properly, in particular, if connections were properly closed.</input><br>
<input type="checkbox"> Check your code using <a href="https://docs.n8n.io/nodes/creating-nodes/nodelinter.html">Nodelinter</a> to ensure a clean lint <strong>before</strong> submitting your pull request</input><br>

## Testing

<input type="checkbox"> Test "create" and "update" operations with all fields/operations.</input><br>
<input type="checkbox"> Test the `continueOnFail` option with a Function node. (For example, a Widget node has a GET operation that takes a widgetId and returns information on the widget. To test that the workflow continues on fail, set the Widget node to continue on fail, create a Function node, return a valid and an invalid widgetId, connect the Function node to Widget node, and run the workflow. The Widget node should show two items: one with information on the widget and another one with the error from having passed an invalid ID.)</input><br>

## Code formatting

<input type="checkbox"> Ensure the branch lints cleanly by running `npm run tslint`.</input><br>
<input type="checkbox"> Ensure the indentation is correct. Check this in the editorconfig.</input><br>
<input type="checkbox"> Ensure there are no extra spaces. Check this in the editorconfig.</input><br>
<input type="checkbox"> Code comment dividers inside if-branches.</input><br>
<input type="checkbox"> Use "create/delete" verbs for operations, except for tags, where you should use "add/remove".</input><br>

## Errors and Outputs

<input type="checkbox"> Ensure empty API responses return `{ success: true }`.</input><br>
<input type="checkbox"> Ensure the error responses are handled and displayed correctly (e.g., malformed requests, requests with invalid credentials) and use the current format. You can check this by making failing requests to the API.</input><br>
<input type="checkbox"> Check if the response can be simplified and add a simplify function (e.g., <a href="https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/SecurityScorecard/GenericFunctions.ts">SecurityScorecard node</a>).</input><br>
<input type="checkbox"> Ensure the response from `Create` is consistent with `Get`.</input><br>
<input type="checkbox"> Ensure the response from `Get All` is consistent with `Get`.</input><br>

## Presentation

<input type="checkbox"> Ensure the primary menu contains only required parameters.</input><br>
<input type="checkbox"> Ensure a JSON object is not shown in a single column in Table view.</input><br>
<input type="checkbox"> Make sure all GetAll operations have the fields `return` and `limit`.</input><br>
<input type="checkbox"> Ensure the property subtitle is set.</input><br>
<input type="checkbox"> Make sure the pagination (if any) is working correctly. Set Limit 1.</input><br>

## Writing

<input type="checkbox"> Ensure all descriptions are correct and end with a period.</input><br>
<input type="checkbox"> Ensure that most descriptions exist, excluding redundant ones.</input><br>
<input type="checkbox"> Ensure IDs in displayNames are capitalized (i.e.: "IDs", not "ids" or "Ids").</input><br>
<input type="checkbox"> Ensure that IDs, if multiple, have descriptive qualifiers.</input><br>
<input type="checkbox"> Ensure the `name` property in `description` in the node class is written in camelCase.</input><br>
<input type="checkbox"> Ensure the file name and the Class name are identical.</input><br>

## Branding

<input type="checkbox"> Ensure the name of the service is written correctly (e.g., "GitHub" not "Github"). If the node is a trigger node, ensure it is named as such, by adding "Trigger" after the service name (e.g., "Trello Trigger").</input><br>
<input type="checkbox"> Ensure the logo is either a PNG or SVG, ideally the latter. <a href="https://vecta.io/symbols">Vecta</a> is a good website to find SVGs of different applications.</input><br>
<input type="checkbox"> If the logo is an SVG, ensure the canvas is a perfect square. If the logo is PNG, ensure it is 60x60 pixels and compressed.</input><br>
<input type="checkbox"> Ensure the border color of the node matches the branding of the service.</input><br>

## Nice-to-haves (optional)
<input type="checkbox"> Add handler for `continueOnFail`. This feature is included in some of the newest nodes (e.g <a href="https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Lemlist/Lemlist.node.ts">Lemlist node</a>) to continue the workflow even if the node's execution fails.</input><br>
<input type="checkbox"> Remove `required: false` and `description: ''` in the node descriptions (e.g., <a href="https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Lemlist/descriptions">Lemlist node</a>).</input><br>
<input type="checkbox"> At call site, specify first `body` and then `qs`.</input><br>
<input type="checkbox"> At call site, prepend the endpoint with slash `/` (e.g., "/campaign").</input><br>
