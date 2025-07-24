---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# UX guidelines for community nodes

Your node's UI must conform to these guidelines to be a [verified community node](/integrations/creating-nodes/deploy/submit-community-nodes.md#submit-your-node-for-verification-by-n8n) candidate.

## Credentials

API key and sensitive credentials should always be password fields.

### OAuth

Always include the OAuth credential if available.

## Node structure

### Operations to include

Try to include **CRUD** operations for each resource type.

Try to include common operations in nodes for each resource. n8n uses some CRUD operations to keep the experience consistent and allow users to perform basic operations on the resource. The suggested operations are:

* **Create**
* **Create or Update (Upsert)**
* **Delete**
* **Get**
* **Get Many:** also used when some filtering or search is available
* **Update**

Notes:

1. These operations can apply to the resource itself or an entity inside of the resource (for example, a row inside a Google Sheet). When operating on an entity inside of the resource, you must specify the **name of the entity** in the operations name.
2. The naming could change depending on the node and the resource. Check the following guidelines for details.

### Resource Locator

* Use a Resource Locator component whenever possible. This provides a much better UX for users. The Resource Locator Component is most often useful when you have to select a single item.
* The default option for the Resource Locator Component should be `From list` (if available).

### Consistency with other nodes

* Maintain UX consistency: n8n tries to keep its UX consistent. This means following existing UX patterns, in particular, those used in the latest new or overhauled nodes.
* Check similar nodes: For example, if you're working on a database node, it's worth checking the Postgres node.

### Sorting options

* You can enhance certain "Get Many" operations by providing users with sorting options.
* Add sorting in a dedicated collection (below the "Options" collection). Follow the example of [Airtable Record:Search](https://github.com/n8n-io/n8n/blob/92e2a8e61a4189025e5d4bac8be81576b624fe85/packages/nodes-base/nodes/Airtable/v2/actions/record/search.operation.ts#L85-L135).

## Node functionality

### Deleting operations output

When deleting an item (like a record or a row), return an array with a single object: `{"deleted": true}`. This is a confirmation for the user that the deletion was successful and the item will trigger the following node.

### Simplifying output fields

#### Normal nodes: 'Simplify' parameter

When an endpoint returns data with more than 10 fields, add the "Simplify" boolean parameter to return a simplified version of the output with max 10 fields.

* One of the main issues with n8n can be the size of data and the Simplify parameter limits that problem by reducing data size.
* Select the most useful fields to output in the simplified node and sort them to have the most used ones at the top.
* In the Simplify mode, it's often best to flatten nested fields
* Display Name: `Simplify`
* Description: `Whether to return a simplified version of the response instead of the raw data`

#### AI tool nodes: ‘Output’ parameter

When an endpoint returns data with more than 10 fields, add the 'Output' option parameter with 3 modes.

In AI tool nodes, allow the user to be more granular and select the fields to output. The rationale is that tools may run out of context window and they can get confused by too many fields, so it's better to pass only the ones they need.

Options:

* **Simplified:** Works the same as the "Simplify" parameter described above.
* **Raw:** Returns all the available fields.
* **Selected fields:** Shows a multi-option parameter for selecting the fields to add to the output and send to the AI agent. By default, this option always returns the ID of the record/entity.

## Copy

### Text Case

Use **Title Case** for the node `name`, `parameters display names` (labels), `dropdown titles`. Title Case is when you capitalize the first letter of each word, except for certain small words, such as articles and short prepositions.

Use **Sentence case** for node `action` names, node `descriptions`, `parameters descriptions` (tooltips), `hints`, `dropdown descriptions`.

### Terminology

* **Use the third-party service terminology:** Try to use the same terminology as the service you're interfacing with (for example, Notion 'blocks', not Notion 'paragraphs').
* **Use the terminology used in the UI:** Stick to the terminology used in the user interface of the service, rather than that used in the APIs or technical documentation (for example, in Trello you "archive" cards, but in the API they show up as "closed". In this case, you might want to use "archive").
* **No tech jargon:** Don't use technical jargon where simple words will do. For example, use "field" instead of "key".
* **Consistent naming:** Choose one term for something and stick to it. For example, don't mix "directory" and "folder".

### Placeholders

It's often helpful to insert examples of content in parameters placeholders. These should start with "e.g." and use **camel case** for the demo content in fields.

Placeholder examples to copy:

* image: `e.g. https://example.com/image.png`
* video: `e.g. https://example.com/video.mp4`
* search term: `e.g. automation`
* email: `e.g. nathan@example.com`
* Twitter user (or similar): `e.g. n8n`
* Name and last name: `e.g. Nathan Smith`
* First name: `e.g. Nathan`
* Last name: `e.g. Smith`

### Operations name, action, and description

* **Name:** This is the name displayed in the select when the node is open on the canvas. It must use title case and doesn't have to include the resource (for example, "Delete").
* **Action:** This is the name of the operation displayed in the panel where the user selects the node. It must be in sentence case and must include the resource (for example, "Delete record").
* **Description:** This is the sub-text displayed below the name in the select when the node is open on the canvas. It must use sentence case and must include the resource. It can add a bit of information and use alternative words than the basic resource/operation (for example, "Retrieve a list of users").
* If the operation acts on an entity that's not the Resource (for example, a row in a Google Sheet), specify that in the operation name (for example, "Delete Row").

As a general rule, is important to understand what the **object** of an operation is. Sometimes, the object of an Operation is the resource itself (for example, `Sheet:Delete` to delete a Sheet).

In other cases, the object of the operation isn't the resource, but something contained inside the resource (for example, `Table:Delete rows`, here the resource is the table, but what you are operating on are the rows inside of it).

#### Naming `name`

This is the name displayed in the select when the node is open on the canvas.

* Parameter: `name`
* Case: Title Case

Naming guidelines:

* **Don't repeat the resource (if the resource selection is above):** The resource is often displayed above the operation, so it's not necessary to repeat it in the operation (this is the case if the object of the operation is the resource itself).
	* For example: `Sheet:Delete` → No need to repeat `Sheet` in `Delete`, because n8n displays `Sheet` in the field above and what you're deleting is the Sheet.
* **Specify the resource if there's no resource selection above:** In some nodes, you won't have a resource selection (because there's only one resource). In these cases, specify the resource in the operation.
	* For example: `Delete Records` → In Airtable, there's no resource selection, so it's better to specify that the Delete operation will delete records.
* **Specify the object of the operation if it's not the resource:** Sometimes, the object of the operation isn't the resource. In these cases, specify the object in the operation as well.
	* For example: `Table:Get Columns` → Specify `Columns` because the resource is `Table`, while the object of the operation is `Columns`.

#### Naming `action`

This is the name of the operation displayed in the panel where the user selects the node.
* Parameter: `action`
* Case: Sentence case

Naming guidelines:

* **Omit articles:** To keep the text shorter, get rid of articles (a, an, the…).
	* **correct**: `Update row in sheet`
	* **incorrect**: `Update a row in a sheet`
* **Repeat the resource:** In this case, it's okay to repeat the resource. Even if the resource is visible in the list, the user might not notice and it's useful to repeat it in the operation label.
*  **Specify the object of the operation if it is not the resource:** Same as for the operation name. In this case, you don't need to repeat the resource.
	* For example: `Append Rows` → You have to specify `Rows` because rows are what you're actually appending to. Don't add the resource (`Sheet`) since you aren't appending to the resource.

#### Naming `description`

This is the subtext displayed below the name in the selection when the node is open on the canvas.

* Parameter: `description`
* Case: Sentence case

Naming guidelines:

*  If possible, add more information than that specified in the operation `name`
*  Use alternative wording to help users better understand what the operation is doing. Some people might not understand the text used in the operation (maybe English isn't their native language), and using alternative working could help them.

#### Vocabulary

n8n uses a general vocabulary and some context-specific vocabulary for groups of similar applications (for example, databases or spreadsheets).

The general vocabulary takes inspiration from CRUD operations:

* **Clear**
    * Delete all the contents of the resource (empty the resource).
    * Description: `Delete all the <CHILD_ELEMENT>s inside the <RESOURCE>`
* **Create**
    * Create a new instance of the resource.
    * Description: `Create a new <RESOURCE>`
* **Create or Update**
    * Create or update an existing instance of the resource.
    * Description: `Create a new <RESOURCE> or update an existing one (upsert)`
* **Delete**
    * You can use "Delete" in two different ways:
        1. Delete a resource:
            * Description: `Delete a <RESOURCE> permanently` (use "permanently" only if that's the case)
        2. Delete something **inside** of the resource (for example, a row):
            * In this case, **always specify the object of the operation**: for example, `Delete Rows` or `Delete Records`.
            * Description: `Delete a <CHILD_ELEMENT> permanently`
* **Get**
    * You can use "Get" in two different ways:
        1. Get a resource:
            * Description: `Retrieve a <RESOURCE>`
        2. Get an item **inside** of the resource (for example, records):
            * In this case, **always specify the object of the operation**: for example, `Get Row` or `Get Record`.
            * Description: `Retrieve a <CHILD_ELEMENT> from the/a <RESOURCE>`
* **Get Many**
    * You can use "Get Many" in two different ways:
        1. Get a list of resources (without filtering):
            * Description: `Retrieve a list of <RESOURCE>s`
        2. Get a list of items **inside** of the resource (for example, records):
            * In this case, **always specify the object of the operation**: for example, `Get Many Rows` or `Get Many Records`.
            * You can omit `Many`: `Get Many Rows` can be `Get Rows`.
            * Description: `List all <CHILD_ELEMENT>s in the/a <RESOURCE>`
* **Insert** or **Append**
    * Add something inside of a resource.
    * Use `insert` for database nodes.
    * Description: `Insert <CHILD_ELEMENT>(s) in a <RESOURCE>`
* **Insert or Update** or **Append or Update**
    * Add or update something inside of a resource.
    * Use `insert` for database nodes.
    * Description: `Insert <CHILD_ELEMENT>(s) or update an existing one(s) (upsert)`
* **Update**
    * You can use "Update" in two different ways:
        1. Update a resource:
            * Description: `Update one or more <RESOURCE>s`
        2. Update something **inside** of a resource (for example, a row):
            * In this case, **always specify the object of the operation**: for example, `Update Rows` or `Update Records`.
            * Description: `Update <CHILD_ELEMENT>(s) inside a <RESOURCE>`

### Referring to parameter and field name

When you need to refer to parameter names or field names in copy, wrap them in single quotation marks (for example, "Please fill the `'name'` parameter).

### Boolean description

Start the description of boolean components with 'Whether...'

## Errors

### General philosophy

Errors are sources of pain for users. For this reason, n8n always wants to tell the user:

* **What happened**: a description of the error and what went wrong.
* **How to solve the problem**: or at least how to get unstuck and continue using n8n without problems. n8n doesn't want users to remain blocked, so use this as an opportunity to guide them to success.

### Error structure in the Output panel

#### Error Message - What happened

This message explains to the user what happened, and the current issue that prevents the execution completing.

* If you have the `displayName` of the parameter that triggered the error, include it in the error message or description (or both).
* Item index: if you have the ID of the item that triggered the error, append `[Item X]` to the error message. For example, `The ID of the release in the parameter “Release ID” for could not be found [item 2]`.
* Avoid using words like "error", "problem", "failure", "mistake".

#### Error Description - How to solve or get unstuck

The description explains to users how to solve the problem, what to change in the node configuration (if that's the case), or how to get unstuck. Here, you should guide them to the next step and unblock them.

Avoid using words like "error", "problem", "failure", "mistake".
