# Node review checklist

Before submitting a node for review, please make sure you follow the guidelines listed below. This will help our team review your PR easier and faster.

## Preparation

- [ ] Set up your editor for code formatting (indentation, new lines, linting). If you use Visual Studio Code, you can use the TSLint extension for linting.
- [ ] Get credentials (e.g.: Client ID, Client Secret, API key, user login, user password, website URL) for the service you are building a node for.

## Development

- [ ] Ensure complementary operations (e.g. create, delete) have been added.
- [ ] Ensure the node works with multiple inputs.
- [ ] Ensure the parameters have the correct type.
- [ ] Mind the defaults: if the service has a default as true, keep it as true. Changing default values can break the existing workflows of the users.
- [ ] Add handler for `continueOnFail`.
- [ ] Remove `required: false` and `description: ''`.
- [ ] At call site, first `body` and then `qs`.
- [ ] At call site, prepend the endpoint with slash `/`.

## Testing

- [ ] Test create and update operations with all fields/options.
- [ ] Test `continueOnFail` with a Function node.

## Code formatting

- [ ] Ensure the branch lints cleanly by running `npm run tslint`.
- [ ] Ensure the indentation is correct. Check this in the editorconfig.
- [ ] Ensure there are no extra spaces. Check this in the editorconfig.
- [ ] Code comment dividers inside if-branches.
- [ ] Use "create/delete" verbs for operations, except for tags, where you should use "add/remove".

## Errors and Outputs

- [ ] Ensure empty API responses return `{ success: true }`.
- [ ] Ensure the error responses are handled and displayed correctly (e.g.: malformed requests, requests with invalid credentials) and use the current format. You can check this by making failing requests to the API.
- [ ] Check if the response can be simplified.
- [ ] Ensure the response from `Create` is consistent with `Get`.
- [ ] Ensure the response from `Get All` is consistent with `Get`.

## Presentation

- [ ] Ensure the primary menu contains only required parameters.
- [ ] Ensure a JSON object is not shown in a single column in Table view.
- [ ] Make sure all GetAll operations have the fields `return` and `limit`.
- [ ] Ensure the property subtitle is set.
- [ ] Make sure the pagination (if any) is working correctly. Set Limit 1.

## Writing

- [ ] Ensure all descriptions are correct and end with a period.
- [ ] Ensure that most descriptions exist, excluding redundant ones.
- [ ] Ensure IDs in displayNames are capitalized (i.e.: "IDs", not "ids" or "Ids").
- [ ] Ensure that IDs, if multiple, have descriptive qualifiers.
- [ ] Ensure the `name` property in `description` in the node class is written in camelCase.
- [ ] Ensure the file name and the Class name are identical.

## Branding

- [ ] Ensure the name of the service is written correctly (e.g.: "GitHub" not "Github"). If the node is a trigger node, ensure it is named as such, by adding "Trigger" after the service name (e.g. "Trello Trigger").
- [ ] Ensure the logo is either a PNG or SVG, ideally the latter. [Vecta](https://vecta.io/symbols) is a good website to find SVGs of different applications.
    - [ ] If the logo is an SVG, ensure the canvas is a perfect square.
    - [ ] If the logo is PNG, ensure it is 60x60 pixels and compressed.
- [ ] Ensure the border color of the node matches the branding of the service.
