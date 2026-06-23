---
contentType: reference
nodeTitle: Node UI design
originalFilePath: integrations/creating-nodes/plan/node-ui-design.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/plan/node-ui-design'
url: 'https://docs.n8n.io/connect/create-nodes/plan-your-node/node-ui-design'
layout:
  description:
    visible: false
---

# Design your node's user interface <a href="#design-your-nodes-user-interface" id="design-your-nodes-user-interface"></a>

Most nodes are a GUI (graphical user interface) representation of an API. Designing the interface means finding a user-friendly way to represent API endpoints and parameters. Directly translating an entire API into form fields in a node may not result in a good user experience.

This document provides design guidance and standards to follow. These guidelines are the same as those used by n8n. This helps provide a smooth and consistent user experience for users mixing community and built-in nodes.

## Design guidance <a href="#design-guidance" id="design-guidance"></a>

All node's use n8n's [node UI elements](../build-your-node/reference/node-ui-elements.md), so you don't need to consider style details such as colors, borders, and so on. However, it's still useful to go through a basic design process:

* Review the documentation for the API you're integrating. Ask yourself:
    * What can you leave out? 
    * What can you simplify?
    * Which parts of the API are confusing? How can you help users understand them?
* Use a wireframe tool to try out your field layout. If you find your node has a lot of fields and is getting confusing, consider n8n's guidance on [showing and hiding fields](#showing-and-hiding-fields).

## Standards <a href="#standards" id="standards"></a>

### UI text style <a href="#ui-text-style" id="ui-text-style"></a>

| Element | Style |
| ------- | ----- |
| Drop-down value | Title case |
| Hint | Sentence case |
| Info box | Sentence case. Don't use a period (`.`) for one-sentence information. Always use a period if there's more than one sentence. This field can include links, which should open in a new tab. |
| Node name | Title case |
| Parameter name | Title case |
| Subtitle | Title case |
| Tooltip | Sentence case. Don't use a period (`.`) for one-sentence tooltips. Always use a period if there's more than one sentence. This field can include links, which should open in a new tab. |

### UI text terminology <a href="#ui-text-terminology" id="ui-text-terminology"></a>

* Use the same terminology as the service the node connects to. For example, a Notion node should refer to Notion blocks, not Notion paragraphs, because Notion calls these elements blocks. There are exceptions to this rule, usually to avoid technical terms (for example, refer to the guidance on [name and description for upsert operations](#upsert-operations)).
* Sometimes a service has different terms for something in its API and in its GUI. Use the GUI language in your node, as this is what most users are familiar with. If you think some users may need to refer to the service's API docs, consider including this information in a hint.
* Don't use technical jargon when there are simpler alternatives.
* Be consistent when naming things. For example, choose one of `directory` or `folder` then stick to it. 

### Node naming conventions <a href="#node-naming-conventions" id="node-naming-conventions"></a>

| Convention | Correct | Incorrect |
| ---------- | ------- | --------- |
| If a node is a trigger node, <br>the displayed name should have 'Trigger' at the end, <br>with a space before. | Shopify Trigger | ShopifyTrigger, Shopify trigger |
| Don't include 'node' in the name. | Asana | Asana Node, Asana node |

### Showing and hiding fields <a href="#showing-and-hiding-fields" id="showing-and-hiding-fields"></a>

Fields can either be:

* Displayed when the node opens: use this for resources and operations, and required fields.
* Hidden in the **Optional fields** section until a user clicks on that section: use this for optional fields.

Progressively disclose complexity: hide a field until any earlier fields it depends on have values. For example, if you have a **Filter by date** toggle, and a **Date to filter by** datepicker, don't display **Date to filter by** until the user enables **Filter by date**.


### Conventions by field type <a href="#conventions-by-field-type" id="conventions-by-field-type"></a>

#### Credentials <a href="#credentials" id="credentials"></a>

n8n automatically displays credential fields as the top fields in the node.

#### Resources and operations <a href="#resources-and-operations" id="resources-and-operations"></a>

APIs usually involve doing something to data. For example, "get all tasks." In this example, "task" is the resource, and "get all" is the operation.

When your node has this resource and operation pattern, your first field should be **Resource**, and your second field should be **Operation**.

#### Required fields <a href="#required-fields" id="required-fields"></a>

Order fields by:

* Most important to least important.
* Scope: from broad to narrow. For example, you have fields for **Document**, **Page**, and **Text to insert**, put them in that order.

#### Optional fields <a href="#optional-fields" id="optional-fields"></a>

* Order fields alphabetically. To group similar things together, you can rename them. For example, rename **Email** and **Secondary Email** to **Email (primary)** and **Email (secondary)**.
* If an optional field has a default value that the node uses when the value isn't set, load the field with that value. Explain this in the field description. For example, **Defaults to false**.
* Connected fields: if one optional fields is dependent on another, bundle them together. They should both be under a single option that shows both fields when selected.
* If you have a lot of optional fields, consider grouping them by theme.

#### Help <a href="#help" id="help"></a>

There are five types of help built in to the GUI:

* Info boxes: yellow boxes that appear between fields. Refer to [UI elements | Notice](../build-your-node/reference/node-ui-elements.md#notice) for more information.
    * Use info boxes for essential information. Don't over-use them. By making them rare, they stand out more and grab the user's attention.
* Parameter hints: lines of text displayed beneath a user input field. Use this when there's something the user needs to know, but an info box would be excessive.
* Node hints: provide help in the input panel, output panel, or node details view. Refer to [UI elements | Hints](../build-your-node/reference/node-ui-elements.md#hints) for more information.
* Tooltips: callouts that appear when the user hovers over the tooltip icon !["Screenshot of the tooltip icon. The icon is a ? in a grey circle"](../../.gitbook/assets/help-tooltip.png). Use tooltips for extra information that the user might need.
    * You don't have to provide a tooltip for every field. Only add one if it contains useful information. 
    * When writing tooltips, think about what the user needs. Don't just copy-paste API parameter descriptions. If the description doesn't make sense, or has errors, improve it.
* Placeholder text: n8n can display placeholder text in a field where the user hasn't entered a value. This can help the user know what's expected in that field.

Info boxes, hints, and tooltips can contain links to more information.

#### Errors <a href="#errors" id="errors"></a>

Make it clear which fields are required.

Add validation rules to fields if possible. For example, check for valid email patterns if the field expects an email.

When displaying errors, make sure only the main error message displays in the red error title. More information should go in **Details**.

Refer to [Node Error Handling](../build-your-node/reference/error-handling.md) for more information.

#### Toggles <a href="#toggles" id="toggles"></a>

* Tooltips for binary states should start with something like **Whether to . . . **.
* You may need a list rather than a toggle:
    * Use toggles when it's clear what happens in a false state. For example, **Simplify Output?**. The alternative (don't simplify output) is clear.
    * Use a dropdown list with named options when you need more clarity. For example, **Append?**. What happens if you don't append is unclear (it could be that nothing happens, or information is overwritten, or discarded).

#### Lists <a href="#lists" id="lists"></a>

* Set default values for lists whenever possible. The default should be the most-used option.
* Sort list options alphabetically.
* You can include list option descriptions. Only add descriptions if they provide useful information.
* If there is an option like **All**, use the word **All**, not shorthand like *****.

#### Trigger node inputs <a href="#trigger-node-inputs" id="trigger-node-inputs"></a>

When a trigger node has a parameter for specifying which events to trigger on:

* Name the parameter **Trigger on**.
* Don't include a tooltip.

#### Subtitles <a href="#subtitles" id="subtitles"></a>

Set subtitles based on the values of the main parameters. For example:

```js
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
```

#### IDs <a href="#ids" id="ids"></a>

When performing an operation on a specific record, such as "update a task comment" you need a way to specify which record you want to change.

* Wherever possible, provide two ways to specify a record:
    * By choosing from a pre-populated list. You can generate this list using the `loadOptions` parameter. Refer to [Base files](../build-your-node/reference/base-files/README.md) for more information.
    * By entering an ID.
* Name the field `<Record name> name or ID`. For example, **Workspace Name or ID**. Add a tooltip saying "Choose a name from the list, or specify an ID using an expression." Link to n8n's [Expressions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes) documentation.
* Build your node so that it can handle users providing more information than required. For example:
    * If you need a relative path, handle the user pasting in the absolute path.
    * If the user needs to get an ID from a URL, handle the user pasting in the entire URL.

#### Dates and timestamps <a href="#dates-and-timestamps" id="dates-and-timestamps"></a>

n8n uses [ISO timestamp strings](https://en.wikipedia.org/wiki/ISO_8601) for dates and times. Make sure that any date or timestamp field you add supports all ISO 8601 formats.

#### JSON <a href="#json" id="json"></a>

You should support two ways of specifying the content of a text input that expects JSON:

* Typing JSON directly into the text input: you need to parse the resulting string into a JSON object.
* Using an expression that returns JSON.



#### Node icons <a href="#node-icons" id="node-icons"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iV21vfNb9w8eJrJxc055/" %}


### Common patterns and exceptions <a href="#common-patterns-and-exceptions" id="common-patterns-and-exceptions"></a>

This section provides guidance on handling common design patterns, including some edge cases and exceptions to the main standards.

#### Simplify responses <a href="#simplify-responses" id="simplify-responses"></a>

APIs can return a lot of data that isn't useful. Consider adding a toggle that allows users to choose to simplify the response data:

  * Name: **Simplify Response**
  * Description: **Whether to return a simplified version of the response instead of the raw data**

#### Upsert operations <a href="#upsert-operations" id="upsert-operations"></a>

This should always be a separate operation with:

  * Name: **Create or Update**
  * Description: **Create a new record, or update the current one if it already exists (upsert)**

#### Boolean operators <a href="#boolean-operators" id="boolean-operators"></a>

n8n doesn't have good support for combining boolean operators, such as AND and OR, in the GUI. Whenever possible, provide options for all ANDs or all ORs.


For example, you have a field called **Must match** to test if values match. Include options to test for **Any** and **All**, as separate options.

#### Source keys or binary properties <a href="#source-keys-or-binary-properties" id="source-keys-or-binary-properties"></a>

Binary data is file data, such as spreadsheets or images. In n8n, you need a named key to reference the data. Don't use the terms "binary data" or "binary property" for this field. Instead, use a more descriptive name: **Input data field name** / **Output data field name**.






