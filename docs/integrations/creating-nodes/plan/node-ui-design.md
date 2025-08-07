---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# Design your node's user interface

Most nodes are a GUI (graphical user interface) representation of an API. Designing the interface means finding a user-friendly way to represent API endpoints and parameters. Directly translating an entire API into form fields in a node may not result in a good user experience.

This document provides design guidance and standards to follow. These guidelines are the same as those used by n8n. This helps provide a smooth and consistent user experience for users mixing community and built-in nodes.

## Design guidance

All node's use n8n's [node UI elements](/integrations/creating-nodes/build/reference/ui-elements.md), so you don't need to consider style details such as colors, borders, and so on. However, it's still useful to go through a basic design process:

* Review the documentation for the API you're integrating. Ask yourself:
    * What can you leave out? 
    * What can you simplify?
    * Which parts of the API are confusing? How can you help users understand them?
* Use a wireframe tool to try out your field layout. If you find your node has a lot of fields and is getting confusing, consider n8n's guidance on [showing and hiding fields](#showing-and-hiding-fields).

## Standards

### UI text style

| Element | Style |
| ------- | ----- |
| Drop-down value | Title case |
| Hint | Sentence case |
| Info box | Sentence case. Don't use a period (`.`) for one-sentence information. Always use a period if there's more than one sentence. This field can include links, which should open in a new tab. |
| Node name | Title case |
| Parameter name | Title case |
| Subtitle | Title case |
| Tooltip | Sentence case. Don't use a period (`.`) for one-sentence tooltips. Always use a period if there's more than one sentence. This field can include links, which should open in a new tab. |

### UI text terminology

* Use the same terminology as the service the node connects to. For example, a Notion node should refer to Notion blocks, not Notion paragraphs, because Notion calls these elements blocks. There are exceptions to this rule, usually to avoid technical terms (for example, refer to the guidance on [name and description for upsert operations](#upsert-operations)).
* Sometimes a service has different terms for something in its API and in its GUI. Use the GUI language in your node, as this is what most users are familiar with. If you think some users may need to refer to the service's API docs, consider including this information in a hint.
* Don't use technical jargon when there are simpler alternatives.
* Be consistent when naming things. For example, choose one of `directory` or `folder` then stick to it. 

### Node naming conventions

| Convention | Correct | Incorrect |
| ---------- | ------- | --------- |
| If a node is a trigger node, <br>the displayed name should have 'Trigger' at the end, <br>with a space before. | Shopify Trigger | ShopifyTrigger, Shopify trigger |
| Don't include 'node' in the name. | Asana | Asana Node, Asana node |

### Showing and hiding fields

Fields can either be:

* Displayed when the node opens: use this for resources and operations, and required fields.
* Hidden in the **Optional fields** section until a user clicks on that section: use this for optional fields.

Progressively disclose complexity: hide a field until any earlier fields it depends on have values. For example, if you have a **Filter by date** toggle, and a **Date to filter by** datepicker, don't display **Date to filter by** until the user enables **Filter by date**.


### Conventions by field type

#### Credentials

n8n automatically displays credential fields as the top fields in the node.

#### Resources and operations

APIs usually involve doing something to data. For example, "get all tasks." In this example, "task" is the resource, and "get all" is the operation.

When your node has this resource and operation pattern, your first field should be **Resource**, and your second field should be **Operation**.

#### Required fields

Order fields by:

* Most important to least important.
* Scope: from broad to narrow. For example, you have fields for **Document**, **Page**, and **Text to insert**, put them in that order.

#### Optional fields

* Order fields alphabetically. To group similar things together, you can rename them. For example, rename **Email** and **Secondary Email** to **Email (primary)** and **Email (secondary)**.
* If an optional field has a default value that the node uses when the value isn't set, load the field with that value. Explain this in the field description. For example, **Defaults to false**.
* Connected fields: if one optional fields is dependent on another, bundle them together. They should both be under a single option that shows both fields when selected.
* If you have a lot of optional fields, consider grouping them by theme.

#### Help

There are five types of help built in to the GUI:

* Info boxes: yellow boxes that appear between fields. Refer to [UI elements | Notice](/integrations/creating-nodes/build/reference/ui-elements.md#notice) for more information.
  * Use info boxes for essential information. Don't over-use them. By making them rare, they stand out more and grab the user's attention.
* Parameter hints: lines of text displayed beneath a user input field. Use this when there's something the user needs to know, but an info box would be excessive.
* Node hints: provide help in the input panel, output panel, or node details view. Refer to [UI elements | Hints](/integrations/creating-nodes/build/reference/ui-elements.md#hints) for more information.
* Tooltips: callouts that appear when the user hovers over the tooltip icon !["Screenshot of the tooltip icon. The icon is a ? in a grey circle"](/_images/common-icons/help-tooltip.png). Use tooltips for extra information that the user might need.
  * You don't have to provide a tooltip for every field. Only add one if it contains useful information. 
  * When writing tooltips, think about what the user needs. Don't just copy-paste API parameter descriptions. If the description doesn't make sense, or has errors, improve it.
* Placeholder text: n8n can display placeholder text in a field where the user hasn't entered a value. This can help the user know what's expected in that field.

Info boxes, hints, and tooltips can contain links to more information.

#### Errors

Make it clear which fields are required.

Add validation rules to fields if possible. For example, check for valid email patterns if the field expects an email.

When displaying errors, make sure only the main error message displays in the red error title. More information should go in **Details**.

Refer to [Node Error Handling](/integrations/creating-nodes/build/reference/error-handling.md) for more information.

#### Toggles

* Tooltips for binary states should start with something like **Whether to . . . **.
* You may need a list rather than a toggle:
    * Use toggles when it's clear what happens in a false state. For example, **Simplify Output?**. The alternative (don't simplify output) is clear.
    * Use a dropdown list with named options when you need more clarity. For example, **Append?**. What happens if you don't append is unclear (it could be that nothing happens, or information is overwritten, or discarded).

#### Lists

* Set default values for lists whenever possible. The default should be the most-used option.
* Sort list options alphabetically.
* You can include list option descriptions. Only add descriptions if they provide useful information.
* If there is an option like **All**, use the word **All**, not shorthand like *****.

#### Trigger node inputs

When a trigger node has a parameter for specifying which events to trigger on:

* Name the parameter **Trigger on**.
* Don't include a tooltip.

#### Subtitles

Set subtitles based on the values of the main parameters. For example:

```js
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
```

#### IDs

When performing an operation on a specific record, such as "update a task comment" you need a way to specify which record you want to change.

* Wherever possible, provide two ways to specify a record:
    * By choosing from a pre-populated list. You can generate this list using the `loadOptions` parameter. Refer to [Base files](/integrations/creating-nodes/build/reference/node-base-files/index.md) for more information.
    * By entering an ID.
* Name the field `<Record name> name or ID`. For example, **Workspace Name or ID**. Add a tooltip saying "Choose a name from the list, or specify an ID using an expression." Link to n8n's [Expressions](/code/expressions.md) documentation.
* Build your node so that it can handle users providing more information than required. For example:
    * If you need a relative path, handle the user pasting in the absolute path.
    * If the user needs to get an ID from a URL, handle the user pasting in the entire URL.

#### Dates and timestamps

n8n uses [ISO timestamp strings](https://en.wikipedia.org/wiki/ISO_8601) for dates and times. Make sure that any date or timestamp field you add supports all ISO 8601 formats.

#### JSON

You should support two ways of specifying the content of a text input that expects JSON:

* Typing JSON directly into the text input: you need to parse the resulting string into a JSON object.
* Using an expression that returns JSON.



#### Node icons

--8<-- "_snippets/integrations/node-icons.md"


### Common patterns and exceptions

This section provides guidance on handling common design patterns, including some edge cases and exceptions to the main standards.

#### Simplify responses

APIs can return a lot of data that isn't useful. Consider adding a toggle that allows users to choose to simplify the response data:

  * Name: **Simplify Response**
  * Description: **Whether to return a simplified version of the response instead of the raw data**

#### Upsert operations

This should always be a separate operation with:

  * Name: **Create or Update**
  * Description: **Create a new record, or update the current one if it already exists (upsert)**

#### Boolean operators
<!-- vale off -->
n8n doesn't have good support for combining boolean operators, such as AND and OR, in the GUI. Whenever possible, provide options for all ANDs or all ORs.
<!-- vale on -->

For example, you have a field called **Must match** to test if values match. Include options to test for **Any** and **All**, as separate options.

#### Source keys or binary properties

Binary data is file data, such as spreadsheets or images. In n8n, you need a named key to reference the data. Don't use the terms "binary data" or "binary property" for this field. Instead, use a more descriptive name: **Input data field name** / **Output data field name**.






