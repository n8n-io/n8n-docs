---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n Form node documentation
description: Documentation for the n8n Form node in n8n, a workflow automation platform. Includes guidance on usage and links to examples.
contentType: integration
---

# n8n Form node

Use the n8n Form node to create user-facing forms with multiple steps. You can add other nodes with custom logic between to process user input. You must start the workflow with the [n8n Form Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/).

[[ workflowDemo("file:///integrations/builtin/core-nodes/n8n-nodes-base.form/mutually-exclusive-branching.json") ]]

## Setting up the node

### Set default selections with query parameters

You can set the initial values for fields by using [query parameters](https://en.wikipedia.org/wiki/Query_string#Web_forms){:target=_blank .external-link} with the initial URL provided by the [n8n Form Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/). Every page in the form receives the same query parameters sent to the n8n Form Trigger URL.

/// note | Only for production
Query parameters are only available when using the form in production mode. n8n won't populate field values from query parameters in testing mode.
///

<!-- vale from-microsoft.Percentages = NO -->
When using query parameters, [percent-encode](https://en.wikipedia.org/wiki/Percent-encoding){:target=_blank .external-link} any field names or values that use special characters. This ensures n8n uses the initial values for the given fields. You can use tools like [URL Encode/Decode](https://www.url-encode-decode.com/) to format your query parameters using percent-encoding.

As an example, imagine you have a form with the following properties:

* Production URL: `https://my-account.n8n.cloud/form/my-form`
* Fields:
	* `name`: `Jane Doe`
	* `email`: `jane.doe@example.com`

With query parameters and percent-encoding, you could use the following URL to set initial field values to the data above:

```
https://my-account.n8n.cloud/form/my-form?email=jane.doe%40example.com&name=Jane%20Doe
```

Here, percent-encoding replaces the at-symbol (`@`) with the string `%40` and the space character (` `) with the string `%20`. This will set the initial value for these fields no matter which page of the form they appear on.
<!-- vale from-microsoft.Percentages = YES -->

### Defining the form using JSON

Use **Define Form** > **Using JSON** to define the fields of your form with a [JSON array of objects](/data/data-structure). Each object defines a single field by using a combination of these keys:

- `fieldLabel`: The label that appears above the input field. 
- `fieldType`: Choose from `date`, `dropdown`, `email`, `file`, `number`, `password`, `text`, or `textarea`.
    - Use `date` to include a date picker in the form. Refer to [Date and time with Luxon](/code/cookbook/luxon/) for more information on formatting dates.
	- When using `dropdown`, set the choices with `fieldOptions` (reference the example below). By default, the dropdown is single-choice. To make it multiple-choice, set `multiselect` to `true`.
	- When using `file`, set `multipleFiles` to `true` to allow users to select more than one file. To define the file types to allow, set `acceptFileTypes` to a string containing a comma-separated list of file extensions (reference the example below).
- `placeholder`: Specify placeholder data for the field. You can use this for every `fieldType` except `dropdown`, `date`, and `file`.
- `requiredField`: Require users to complete this field on the form.

An example JSON that shows the general format required and the keys available:

```javascript
// Use the "requiredField" key on any field to mark it as mandatory
// Use the "placeholder" key to specify placeholder data for all fields
//     except 'dropdown', 'date' and 'file'

[
	{
		"fieldLabel": "Date Field",
		"fieldType": "date",
		"formatDate": "mm/dd/yyyy", // how to format received date in n8n
		"requiredField": true
	},
	{
		"fieldLabel": "Dropdown Options",
		"fieldType": "dropdown",
		"fieldOptions": {
			"values": [
				{
					"option": "option 1"
				},
				{
					"option": "option 2"
				}
			]
		},
		"requiredField": true
	},
	{
		"fieldLabel": "Multiselect",
		"fieldType": "dropdown",
		"fieldOptions": {
			"values": [
				{
					"option": "option 1"
				},
				{
					"option": "option 2"
				}
			]
		},
		"multiselect": true // setting to true allows multi-select
	},
	{
		"fieldLabel": "Email",
		"fieldType": "email",
		"placeholder": "me@mail.con"
	},
	{
		"fieldLabel": "File",
		"fieldType": "file",
		"multipleFiles": true, // setting to true allows multiple files selection
		"acceptFileTypes": ".jpg, .png" // allowed file types
	},
	{
		"fieldLabel": "Number",
		"fieldType": "number"
	},
	{
		"fieldLabel": "Password",
		"fieldType": "password"
	},
	{
		// "fieldType": "text" can be omitted since it's the default type
		"fieldLabel": "Text"
	},
	{
		"fieldLabel": "Textarea",
		"fieldType": "textarea"
	}
]
```

### Form Ending

Use the **Form Ending** Page Type to end a form and either show a completion page or redirect the user to a URL. Only one Form Ending page is displayed per execution, even when n8n executes [multiple branches](#forms-with-branches) that contain Form Ending nodes.

Choose between these options when using **On n8n Form Submission**:

- **Show Completion Screen**: Shows users a final screen to confirm that they submitted the form.
	- Fill in **Completion Title** to set the `h1` title on the form.
	- n8n displays the **Completion Message** as a subtitle below the main `h1` title on the form. Use `\n` or `<br>` to add a line break. 
	- Select **Add option** and fill in **Completion Page Title** to set the page's title in the browser tab.

When using **Redirect to URL**, fill in the **URL** field with the page you want to redirect to when users complete the form.

### Forms with branches

The n8n Form node executes and displays its associated form page whenever it receives data from a previous node. When building forms with n8n, to avoid confusion, it's important to understand how forms behave when branching occurs.

#### Workflows with mutually exclusive branches

Form workflows containing mutually exclusive branches work as expected. n8n will execute a single branch according to the submitted data and conditions you outline. As it executes, n8n will display each page in the branch, ending with an n8n Form node with the **Form Ending** page type.

This workflow demonstrates mutually exclusive branching. Each selection can only execute a single branch.

[[ workflowDemo("file:///integrations/builtin/core-nodes/n8n-nodes-base.form/mutually-exclusive-branching.json") ]]

#### Workflows that may execute multiple branches

Form workflows that send data to multiple branches at the same time require more care. When multiple branches receive data during an execution (for example, from a [switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch/) node), n8n executes each branch that receives data [sequentially](/flow-logic/execution-order/). Upon reaching the end of one branch, the execution will move to the next branch with data.

n8n only executes a single **Form Ending** n8n Form node for each execution. When multiple branches of a form workflow receive data, n8n ignores all Form Ending nodes except for the one associated with the final branch.

This workflow may execute more than one branch during an execution. Here, n8n executes all valid branches sequentially. This impacts which n8n Form nodes n8n executes (in particular, which **Form Ending** node displays):

[[ workflowDemo("file:///integrations/builtin/core-nodes/n8n-nodes-base.form/multiple-branch-execution.json") ]]

### Node options

Select **Add Option** to view more configuration options: 

- **Form Title**: The title for your form. n8n displays the **Form Title** as the webpage title and main `h1` title on the form.
- **Form Description**: The description for your form. n8n displays the **Form Description** as a subtitle below the main `h1` title on the form. Use `\n` or `<br>` to add a line break. 
- **Button Label**: The label to use for your form's submit button. n8n displays the **Button Label** as the name of the submit button.

## Running the node

### Build and test workflows

While building or testing a workflow, use the **Test URL** in the [n8n Form Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/). Using a test URL ensures that you can view the incoming data in the editor UI, which is useful for debugging. 

There are two ways to test:

- Select **Test Step**. n8n opens the form. When you submit the form, n8n runs the node and any previous nodes, but not the rest of the workflow.
- Select **Test Workflow**. n8n opens the form. When you submit the form, n8n runs the workflow.

### Production workflows

When your workflow is ready, switch to using the n8n Form Trigger's **Production URL** by opening the trigger node and selecting the **Production URL** in the **From URLS** selector. You can then activate your workflow, and n8n runs it automatically when a user submits the form.

When working with a production URL, ensure that you have saved and activated the workflow. Data flowing through the Form trigger isn't visible in the editor UI with the production URL.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'n8n-form') ]]
