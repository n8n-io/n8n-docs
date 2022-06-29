# Node review checklist

This checklist helps you build a node that meets the standards for submission to the community nodes collection. It also helps ensure that nodes are consistent and good quality.

## Preparation

<input type="checkbox"> Set up your editor for code formatting (indentation, new lines, linting). If you use Visual Studio Code, you can use the <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin">TSLint extension</a> for linting.</input> <br>
<input type="checkbox"> Get credentials (for example, Client ID, Client Secret, API key, user login, user password, website URL) for the service you are building a node for.</input>

## Development

<input type="checkbox"> If you're' creating a node requested by a community member, make sure to comment on the feature request in the [community forum](https://community.n8n.io/c/feature-requests/5).</input><br>
<input type="checkbox"> Add complementary operations to each resource (for example, create, delete)</input><br>
<input type="checkbox"> Programmatic-style only. Check the node works with more than one input item.</input><br> 
<input type="checkbox"> Ensure the parameters have the correct type.</input><br>
<input type="checkbox"> Mind the defaults: if the service has a default as true, keep it as true. Changing default values can break the existing workflows of the users.</input><br>
<input type="checkbox"> Check if the node disposes of everything. In particular, the node has closed all connections.</input><br>
<input type="checkbox"> Check your code using <a href="https://docs.n8n.io/nodes/creating-nodes/nodelinter.html">Node linter</a>.</input><br>

## Testing

<input type="checkbox"> Test "create" and "update" operations with all fields/operations.</input><br>
<input type="checkbox"> Test the `continueOnFail` option with a Function node. For example, a Widget node has a GET operation that takes a widgetId and returns information on the widget. To test that the workflow continues on fail, set the Widget node to continue on fail, create a Function node, return a valid and an invalid widgetId, connect the Function node to Widget node, and run the workflow. The Widget node should show two items: one with information on the widget and another one with the error from having passed an invalid ID.)</input><br>

## Code formatting

<input type="checkbox"> Ensure the branch lints cleanly by running `npm run lint`.</input><br>
<input type="checkbox"> Ensure the indentation is correct. Check this in the editor configuration.</input><br>
<input type="checkbox"> Ensure there are no extra spaces. Check this in the editor configuration.</input><br>
<input type="checkbox"> Code comment dividers inside if-branches.</input><br>
<input type="checkbox"> Use "create/delete" verbs for operations, except for tags, where you should use "add/remove."</input><br>

## Errors and Outputs

<input type="checkbox"> Ensure empty API responses return `{ success: true }`.</input><br>
<input type="checkbox"> Ensure the node handles and displays error responses (for example, malformed requests, requests with invalid credentials) and use the current format. You can check this by making failing requests to the API.</input><br>
<input type="checkbox"> Check if you can simplify the response. If so, add a simplify function (for example, <a href="https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/SecurityScorecard/GenericFunctions.ts">SecurityScorecard node</a>).</input><br>
<input type="checkbox"> Ensure the response from `Create` is consistent with `Get`.</input><br>
<input type="checkbox"> Ensure the response from `Get All` is consistent with `Get`.</input><br>

## Presentation

<input type="checkbox"> The primary menu shouldn't contain optional parameters.</input><br>
<input type="checkbox"> Ensure a JSON object isn't shown in a single column in Table view.</input><br>
<input type="checkbox"> Make sure all GetAll operations have the fields `return` and `limit`.</input><br>
<input type="checkbox"> Set the property subtitle.</input><br>
<input type="checkbox"> Make sure the pagination (if any) is working. Set Limit 1.</input><br>

## Writing

<input type="checkbox"> Ensure all descriptions are correct and end with a period.</input><br>
<input type="checkbox"> Ensure that most descriptions exist, excluding redundant ones.</input><br>
<input type="checkbox"> Capitalize IDs in displayNames (for example: "IDs" not "ids" or "Ids").</input><br>
<input type="checkbox"> If there is more than one ID, ensure they have descriptive qualifiers.</input><br>
<input type="checkbox"> Ensure the `name` property in `description` in the node class is in camelCase.</input><br>
<input type="checkbox"> Ensure the file name and the class name are identical.</input><br>

## Branding
<!-- vale off -->
<input type="checkbox"> Check that brand names are correct (for example, "GitHub" not "Github"). </input><br>
<input type="checkbox">If the node is a trigger node, show this in the name by adding "Trigger" after the service name (for example, "Trello Trigger").</input><br>
<input type="checkbox"> Ensure the logo is either a PNG or SVG, ideally the latter. <a href="https://vecta.io/symbols">Vecta</a> is a good website to find SVGs of different applications.</input><br>
<input type="checkbox"> If the logo is an SVG, ensure the canvas is a perfect square. If the logo is PNG, ensure it's 60x60 pixels and compressed.</input><br>
<input type="checkbox"> Ensure the border color of the node matches the branding of the service.</input><br>
<!-- vale on -->

## Nice-to-haves (optional)

<input type="checkbox"> Add handler for `continueOnFail`. This handler continues the workflow even if the node's execution fails.</input><br>
<input type="checkbox"> Remove `required: false` and `description: ''` in the node descriptions (for example, <a href="https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Lemlist/descriptions">Lemlist node</a>).</input><br>
<input type="checkbox"> At call site, specify first `body` and then `qs`.</input><br>
<input type="checkbox"> At call site, prepend the endpoint with slash `/` (for example, "/campaign").</input><br>