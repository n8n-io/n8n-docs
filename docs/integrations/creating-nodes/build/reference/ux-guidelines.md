---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# UX guidelines for community nodes

# Credentials

* API key and sensitive credentials should always be password fields

## OAuth

* Always include the OAuth credential if available

---

# Node structure

## Operations to include

* We usually include **CRUD** operations for each type of resource
* We should include some common operations in nodes for each resource. There are CRUD operations that (1) are needed to keep the experience consistent, (2) users will expect to perform the basic operations on the resource. The suggested operations are:
    * **Create**
    * **Create or Update (Upsert)**
    * **Delete**
    * **Get**
    * **Get Many:** to be used also when some filtering or search is available
    * **Update**

    Notes:
    
    1. These operations can apply to the resource itself or an entity inside the resource (e.g. a row inside a Google Sheet). In this case, the **name of the entity** must be specified in the operations naming.
    2. The naming could change depending on the node and the resource. Check the following guidelines for details.

## Resource Locator

* **Whenever possible use a Resource Locator component**, this provides a much better UX to our users. The Resource Locator Component is mostly useful when you have to select a single item.
* **Default option:** The default option for the Resource Locator Component should be ‘From list‘ (if available)

## Consistency with other nodes

* Go for UX consistency: We should keep the overall UX of n8n consistent. This means we follow the UX patterns we previously used, especially those used in the latest new or overhauled nodes
* Check similar nodes: e.g. if you are overhauling the Microsoft SQL node, it is worth checking the Postgres node (that was overhauled recently)

## Sorting options

* Certain “Get Many” operations can be enhanced by providing users with sorting options.
* Add sorting in a dedicated collection (below the “Options” collection). Follow the example of Airtable Record:Search

---

# Node functionality

## Deleting operations output

* When deleting an item (like a record or a row) we return an array with a single object: `{"deleted": true}`. This is a confirmation for the user that the deletion was successful and the item will trigger the following node

## Simplifying output fields

### **Normal nodes: ‘Simplify’ parameter**
* When an endpoint returns data with more than 10 fields we add the ‘Simplify’ boolean parameter to return a simplified version of the output with max 10 fields
* One of the main issues with n8n can be the size of data and the Simplify parameter limits that problem by reducing data size
* When an endpoint returns data with more than 10 fields we add the ‘Simplify’ boolean parameter to return a simplified version of the output with max 10 fields
* We select the most useful fields to output in the simplified node and we sort them to have the most used ones at the top
* In the Simplify mode, we usually flatten nested fields
* Display Name: *“Simplify”*
* Description: “*Whether to return a simplified version of the response instead of the raw data”*
            
### **AI tool nodes: ‘Output’ parameter**
* When an endpoint returns data with more than 10 fields we add the ‘Output’ option parameter with 3 modes
* In the AI tool nodes we allow the user to be more granular and select the fields to output. The rationale behind that is that (1) Tools may run out of context window and (2) Tools can get confused by too many fields and it’s better to pass then only the one they need
* Options
    * **Simplified:** Works the same as the ‘Simplify‘ parameter described below
    * **Raw:** Returns all the available fields
    * **Selected fields:** Shows a multi-option parameter that allows to select the fields to add to the output and send to the AI agent. By default, this option always returns the ID of the record/entity.

---

# Copy

## Text Case

* We use **Title Case** for the node `name`, `parameters display names` (labels), `dropdown titles`. Title Case is when the first letter of each word is capitalized, except for certain small words, such as articles and short prepositions
* We use **Sentence case** for node `action` names, node `descriptions`, `parameters descriptions` (tooltips), `hints`, `dropdown descriptions`

## Terminology

* **Use the third-party service terminology:** Try to use the same terminology as the service you're interfacing with (e.g. Notion 'blocks', not Notion 'paragraphs')
* **Use the terminology used in the UI:** Stick to the terminology used in the user interface of the service, rather than that used in the APIs or technical documentation (for example in Trello you 'archive' cards, but in the API they show up as 'closed'. In this case, you might want to use 'archive').
* **No tech jargon:** Don't use technical jargon where simple words will do, e.g. use 'field' instead of 'key'
* **Consistent naming:** choose one term for something and stick to it. E.g. don't mix 'directory' and 'folder'
* **UI terminology VS APIs:** Use the same terminology as the service you're interfacing with (e.g. Notion 'blocks', not Notion 'paragraphs'). Stick to the terminology used in the **user interface of the service**, rather than that used in the APIs or technical documentation (for example in Trello you 'archive' cards, but in the API they show up as 'closed'. In this case, you might want to use 'archive').
* **APIs copy and documentation vs. UI:** APIs tend to have a much lower usability bar than UIs! Since we're putting an API in a UI, we often need to do some cleaning up. Copying the API exactly is usually not the ideal user experience. it’s usually better to use the copy used by the UI of the service.

## Placeholders

* We usually insert examples of content in parameters placeholders and they start with ‘e.g.’
* **Camel case:** Use camel case for demo content in fields
* Placeholder examples to copy
    * image *“e.g. https://example.com/image.png”*
    * video *“e.g. https://example.com/video.mp4”*
    * search term: *“e.g. automation”*
    * email: *“e.g. nathan@example.com”*
    * Twitter user (or similar): *“e.g. n8n”*
    * Name Lastname: *“e.g. Nathan Smith”*
    * First name: *“e.g. Nathan”*
    * Last name: *“e.g. Smith”*

## Operations name, action, and description

* **Name:** It is the name displayed in the select in the Node Details View, it must be in title case, and doesn’t have to include the resource (e.g. ‘Delete’)
* **Action:** It is the name of the operation displayed in the panel where the user selects the Node, it is in sentence case, must include the resource (e.g. ‘Delete record’)
* **Description:** It is the sub-text displayed below the name in the select in the Node Details View, it is in sentence case, must include the resource, it can add a bit of information and use alternative words than the basic Resource/Operation (e.g. ‘Retrieve a list of users’).
* If the operation acts on an entity that is not the Resource (e.g. a row in a Google Sheet) specify that in the operation name (e.g. ‘Delete Row‘)
    
As a general rule is important to understand what is the **object** of an Operation. In some cases, **the object of an Operation is the Resource itself** (e.g. `Sheet:Delete` when I want to delete a Sheet), in other cases, the object of the Operation is not the Resource, but **something contained inside the Resource** (e.g. `Table:Delete rows` here the Resource is the Table, but what is actually delete are the rows inside of it).

This distinction is important to understand the following guidelines.

### NDV Operation Name → `name`

* It is the name displayed in the select in the Node Details View, parameter: `name`
* Case: Title Case
* Naming Guidelines:
    *  **Don’t repeat the Resource (if there’s the Resource select above):** The Resource is usually displayed above the Operation, so it is not necessary to repeat it in the Operation (especially if the object of the Operation is the Resource itself).
        
        Example `Sheet:Delete` → No need to repeat `Sheet` in `Delete`, because `Sheet` is displayed in the field above and what is deleted is the Sheet.
        
    *  **Specify the Resource if there’s no Resource select above:** In some Nodes we don’t have a Resource select (because there’s only one resource). In these cases, specify the Resource in the operation.
        
        Example `Delete Records` → In Airtable there’s no resource selection, so it is better to specify that the Delete operation will delete records.
        
    *  **Specify the object of the operation, if it is not the Resource:** In some cases, the object of the Operation is not the Resource. In this case, specify the object also in the Operation.
        
        Example: `Table:Get Columns` → We have to specify `“Columns”` because the Resource is Table, while the object of the operation is columns
        

### Nodes Panel Name → `action`

* It is the name of the operation displayed in the panel where the user selects the Node, parameter: `action`
* Case: Sentence case
* Naming Guidelines:
    *  **Omit articles:** to keep the text shorter, get rid of articles (a, an, the…)
        * **correct** `Update row in sheet`
        * **wrong** `Update a row in a sheet`
    *  **Repeat the Resource:** in this case, it is ok to repeat the Resource. Even if the Resource is visible in the list, the user might not notice that and it is useful to repeat it in the Operation label.
    *  **Specify the object of the operation, if it is not the Resource:** same as for the Operation Name. In this case, you don’t need to repeat the Resource.
        
        Example: `Append Rows` → We have to specify `Rows` because what is actually appended by the operations are Rows. We don’t add the Resource (`Sheet`) since this is not what is appended.
        

### NDV Operation Subtitle → `description`

* It is the sub-text displayed below the name in the select in the Node Details View, parameter: `description`
* Case: Sentence case
* Naming Guidelines:
    *  If possible, add more information than that specified in the NDV Operation Name
    *  Use alternative wording, to help users better understand what the operation is doing. Some people might not understand the text used in the operation (maybe English is not their native language), and using alternative working could help them.

### Vocabulary

We have a general vocabulary and some context-specific vocabulary for groups of similar applications (e.g. database, spreadsheet).

The general vocabulary is based on CRUD:

* **`*“Clear”*`**
    * Delete all the contents of the Resource (the resource is emptied)
    * Description: *“Delete all the <CHILD_ELEMENT>s inside the <RESOURCE>”*
* **`*“Create”*`**
    * Create a new instance of the Resource
    * Description: *“Create a new <RESOURCE>”*
* **`“*Create or Update*”`**
    * Create or update an existing instance of the Resource
    * Description: “*Create a new <RESOURCE> or update an existing one (upsert)”*
* **`*“Delete”*`**
    * `“Delete”` can be used in two ways. (This can be a bit misleading but it is how we’re using it.)
        1. Delete a Resource
            * Description: *“Delete a <RESOURCE> permanently”* (use permanently only if the case)
        2. Delete something **inside** the Resource (e.g. a Row)
            * In this case, **always specify the object of the operation**: e.g. `Delete Rows`, `Delete Records`
            * Description: *“Delete a <CHILD_ELEMENT> permanently”*
* **`*“Get”*`**
    * `“Get”` can be used in two ways. (This can be a bit misleading but it is how we’re using it.)
        1. Get a Resource
            * Description: *“Retrieve a <RESOURCE>”*
        2. Get an item **inside** the Resource (e.g. Records)
            * In this case, always specify the object of the operation: e.g. `Get Row`, `Get Record`
            * Description: *“Retrieve a <CHILD_ELEMENT> from the/a <RESOURCE>”*
* **`*“Get Many”*`**
    * `“Get Many”` can be used in two ways. (This can be a bit misleading but it is how we’re using it.)
        1. Get a list of Resources (without filtering)
            * Description: *“Retrieve a list of <RESOURCE>s”*
        2. Get a list of items **inside** the Resource (e.g. Records)
            * In this case, always specify the object of the operation: e.g. `Get Many Rows`, `Get Many Records`
            * `Many` can be omitted: `Get Many Rows` can be `Get Rows`
            * Description: *“List all <CHILD_ELEMENT>s in the/a <RESOURCE>”*
* **`*“Insert”*`** or **`*“Append”*`**
    * Add something inside a Resource
    * Use `insert` for Database Nodes
    * Description: *“Insert <CHILD_ELEMENT>(s) in a <RESOURCE>”*
* **`*“Insert or Update”*`** or **`*“Append or Update”*`**
    * Add or update something inside a Resource
    * Use `insert` for Database Nodes
    * Description: *“Insert <CHILD_ELEMENT>(s) or update an existing one(s) (upsert)”*
* **`“*Update*”`**
    * `“Update”` can be used in two ways. (This can be a bit misleading but it is how we’re using it.)
        1. Update a Resource
            * Description: *“Update one or more <RESOURCE>s”*
        2. Update something **inside** a Resource (e.g. a Row)
            * In this case, always specify the object of the operation: e.g. `Update Rows`, `Update Records`
            * Description: *“Update <CHILD_ELEMENT>(s) inside a <RESOURCE>”*

## Referring to parameter and field name

When we need to refer to parameter names or field names in copy, we wrap them in single quotation marks (e.g. Please fill the `‘name’` parameter)

## Boolean description

Start the description of boolean components with ’Whether…’

---

# Errors

## General philosophy

Errors are source of pain for our users. For this reason, we always want to tell the user:
* **What happened:** description of the error and what went wrong
* **How to solve the problem** or at least how to get unstuck and proceed using n8n successfully. We don’t want the user to be blocked, but rather guide them to keep using n8n successfully

## Error Structure in Output Panel

* **Error Message - What happened:**
    * The message explains to the user what happened, and the current issue that prevents the execution to complete.
    * If we have the displayName of the parameter that triggered the error, we will include it in the error message or description (or both)
    * Item index: if we have the id of the item that triggered the error, we append `[Item X]` to the error message (e.g. `The ID of the release in the parameter “Release ID” for could not be found [item 2]`)
    * Avoid using words like *“error”, “problem”, “failure”, “mistake”.*
* **Error Description - How to solve or get unstuck**
    * The description explains to users how to solve the problem, what to modify in the node configuration (if that’s the case), or how to get unstuck. Here we want to guide them to the next step and unblock them.
    * Avoid using words like *“error”, “problem”, “failure”, “mistake”.*