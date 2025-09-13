---
title: n8n Form node documentation
description: Documentation for the n8n Form node in n8n, a workflow automation platform. Includes guidance on usage and links to examples.
contentType: [integration, reference]
---

# n8n Form node

Use the n8n Form node to create user-facing forms with multiple steps. You can add other nodes with custom logic between to process user input. You must start the workflow with the [n8n Form Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md).

[[ workflowDemo("file:///integrations/builtin/core-nodes/n8n-nodes-base.form/mutually-exclusive-branching.json") ]]

## Setting up the node

### Set default selections with query parameters

You can set the initial values for fields by using [query parameters](https://en.wikipedia.org/wiki/Query_string#Web_forms) with the initial URL provided by the [n8n Form Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md). Every page in the form receives the same query parameters sent to the n8n Form Trigger node URL.

/// note | Only for production
Query parameters are only available when using the form in production mode. n8n won't populate field values from query parameters in testing mode.
///

<!-- vale from-microsoft.Percentages = NO -->
When using query parameters, [percent-encode](https://en.wikipedia.org/wiki/Percent-encoding) any field names or values that use special characters. This ensures n8n uses the initial values for the given fields. You can use tools like [URL Encode/Decode](https://www.url-encode-decode.com/) to format your query parameters using percent-encoding.

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

### Displaying custom HTML

You can display custom HTML on your form by adding a **Custom HTML** field to your form. This provides an **HTML** box where you can insert arbitrary HTML code to display as part of the form page.

You can use the HTML field to enrich your form page by including things like links, images, videos, and more. n8n will render the content with the rest of the form fields in the normal document flow.

Because custom HTML content is read-only, these fields aren't included in the form output data by default. To include the raw HTML content in the node output, provide a name for the data using the **Element Name** field.

The HTML field doesn't support `<script>`, `<style>`, or `<input>` elements.

### Including hidden fields

It's possible to include fields in a form without displaying them to users. This is useful when you want to pass extra data to the form that doesn't require interactive user input.

To add fields that won't show up on the form, use the **Hidden Field** form element. There, you can define the **Field Name** and optionally provide a default value by filling out the **Field Value**.

When serving the form, you can pass values for hidden fields using [query parameters](#set-default-selections-with-query-parameters).

### Defining the form using JSON

Use **Define Form** > **Using JSON** to define the fields of your form with a [JSON array of objects](/data/data-structure.md). Each object defines a single field by using a combination of these keys:

- `fieldLabel`: The label that appears above the input field. 
- `fieldType`: Choose from `checkbox`, `date`, `dropdown`, `email`, `file`, `hiddenField`, `html`, `number`, `password`, `radio`, `text`, or `textarea`.
    - Use `date` to include a date picker in the form. Refer to [Date and time with Luxon](/code/cookbook/luxon.md) for more information on formatting dates.
	- When using `dropdown`, set the choices with `fieldOptions` (reference the example below). By default, the dropdown is single-choice. To make it multiple-choice, set `multiselect` to `true`. As an alternative, you can use `checkbox` or `radio` together with `fieldOptions` too.
	- When using `file`, set `multipleFiles` to `true` to allow users to select more than one file. To define the file types to allow, set `acceptFileTypes` to a string containing a comma-separated list of file extensions (reference the example below).
	- Use `hiddenField` to add a hidden field to your form. Refer to [Including hidden fields](#including-hidden-fields) for more information.
	- Use `html` to display custom HTML on your form. Refer to [Displaying custom HTML](#displaying-custom-html) for more information.
- `placeholder`: Specify placeholder data for the field. You can use this for every `fieldType` except `dropdown`, `date`, and `file`.
- `requiredField`: Require users to complete this field on the form.

An example JSON that shows the general format required and the keys available:

```javascript
// Use the "requiredField" key on any field to mark it as mandatory
// Use the "placeholder" key to specify placeholder data for all fields
// except 'dropdown', 'date' and 'file'

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
  },
  {
    "fieldType": "html",
    "elementName": "content", // Optional field. It can be used to include the html in the output.
    "html": "<div>Custom element</div>"
  },
  {
    "fieldLabel": "Checkboxes",
    "fieldType": "checkbox",
    "fieldOptions": {
      "values": [
        {
          "option": "option 1"
        },
        {
          "option": "option 2"
        }
      ]
    }
  },
  {
    "fieldLabel": "Radio",
    "fieldType": "radio",
    "fieldOptions": {
      "values": [
        {
          "option": "option 1"
        },
        {
          "option": "option 2"
        }
      ]
    }
  },
  {
    "fieldLabel": "hidden label",
    "fieldType": "hiddenField",
    "fieldValue": "extra form data"
  }
]
```

### Form Ending

Use the **Form Ending** Page Type to end a form and either show a completion page, redirect the user to a URL, or display custom HTML or text. Only one Form Ending page displays per execution, even when n8n executes [multiple branches](#forms-with-branches) that contain Form Ending nodes.

Choose between these options when using **On n8n Form Submission**:

- **Show Completion Screen**: Shows users a final screen to confirm that they submitted the form.
	- Fill in **Completion Title** to set the `h1` title on the form.
	- n8n displays the **Completion Message** as a subtitle below the main `h1` title on the form. Use `\n` or `<br>` to add a line break. 
	- Select **Add option** and fill in **Completion Page Title** to set the page's title in the browser tab.
- **Redirect to URL**: Redirect the user to a specified URL when the form completes.
	- Fill in the **URL** field with the page you want to redirect to when users complete the form.
- **Show Text**: Display a final page defined by arbitrary plain text and HTML.
	- Fill in the **Text** field with the HTML or plain text content you wish to show.
- **Return Binary File**: Return a binary file upon completion.
	- Fill in **Completion Title** to set the `h1` title on the form.
	- n8n displays the **Completion Message** as a subtitle below the main `h1` title on the form. Use `\n` or `<br>` to add a line break. 
	- Provide the **Input Data Field Name** containing the binary file to return to the user.

### Forms with branches

The n8n Form node executes and displays its associated form page whenever it receives data from a previous node. When building forms with n8n, to avoid confusion, it's important to understand how forms behave when branching occurs.

#### Workflows with mutually exclusive branches

Form workflows containing mutually exclusive branches work as expected. n8n will execute a single branch according to the submitted data and conditions you outline. As it executes, n8n will display each page in the branch, ending with an n8n Form node with the **Form Ending** page type.

This workflow demonstrates mutually exclusive branching. Each selection can only execute a single branch.

[[ workflowDemo("file:///integrations/builtin/core-nodes/n8n-nodes-base.form/mutually-exclusive-branching.json") ]]

#### Workflows that may execute multiple branches

Form workflows that send data to multiple branches at the same time require more care. When multiple branches receive data during an execution (for example, from a [switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md) node), n8n executes each branch that receives data [sequentially](/flow-logic/execution-order.md). Upon reaching the end of one branch, the execution will move to the next branch with data.

n8n only executes a single **Form Ending** n8n Form node for each execution. When multiple branches of a form workflow receive data, n8n ignores all Form Ending nodes except for the one associated with the final branch.

This workflow may execute more than one branch during an execution. Here, n8n executes all valid branches sequentially. This impacts which n8n Form nodes n8n executes (in particular, which **Form Ending** node displays):

[[ workflowDemo("file:///integrations/builtin/core-nodes/n8n-nodes-base.form/multiple-branch-execution.json") ]]

### Node options

Select **Add Option** to view more configuration options: 

- **Form Title**: The title for your form. n8n displays the **Form Title** as the webpage title and main `h1` title on the form.
- **Form Description**: The description for your form. n8n displays the **Form Description** as a subtitle below the main `h1` title on the form. This field supports HTML. Use `\n` or `<br>` to add a line break. The Form Description also populates the [HTML meta description](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#standard_metadata_names_defined_in_the_html_specification) for the page.
- **Button Label**: The label to use for your form's submit button. n8n displays the **Button Label** as the name of the submit button.
- **Custom Form Styling**: Override the default styling of the public form interface with CSS. The field pre-populates with the default styling so you can change only what you need to.
- **Completion Page Title**: The title for the final completion page of the form.

## Running the node

### Build and test workflows

While building or testing a workflow, use the **Test URL** in the [n8n Form Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md). Using a test URL ensures that you can view the incoming data in the editor UI, which is useful for debugging. 

There are two ways to test:

- Select **Execute Step**. n8n opens the form. When you submit the form, n8n runs the node and any previous nodes, but not the rest of the workflow.
- Select **Execute Workflow**. n8n opens the form. When you submit the form, n8n runs the workflow.

### Production workflows

When your workflow is ready, switch to using the n8n Form Trigger's **Production URL** by opening the trigger node and selecting the **Production URL** in the **From URLS** selector. You can then activate your workflow, and n8n runs it automatically when a user submits the form.

When working with a production URL, ensure that you have saved and activated the workflow. Data flowing through the Form trigger isn't visible in the editor UI with the production URL.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'n8n-form') ]]
