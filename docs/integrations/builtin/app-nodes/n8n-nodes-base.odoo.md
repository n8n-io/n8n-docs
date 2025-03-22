---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Odoo node documentation
description: Learn how to use the Odoo node in n8n. Follow technical documentation to integrate Odoo node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Odoo node

Use the Odoo node to automate work in Odoo, and integrate Odoo with other applications. n8n has built-in support for a wide range of Odoo features, including creating, updating, deleting, and getting contracts, resources, and opportunities. 

On this page, you'll find a list of operations the Odoo node supports and links to more resources.

/// note | Credentials
Refer to [Odoo credentials](/integrations/builtin/credentials/odoo.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Contact
    * Create a new contact
    * Delete a contact
    * Get a contact
    * Get all contacts
    * Update a contact
* Note
    * Create a new note
    * Delete a note
    * Get a note
    * Get all notes
    * Update a note
* Opportunity
    * Create a new opportunity
    * Delete an opportunity
    * Get an opportunity
    * Get all opportunities
    * Update an opportunity
* Custom Resource
    * Create a new item
    * Delete an item
    * Get an item
    * Get all items
    * Update an item

## Custom Resources

When calling a custom resource you are able to call any model in Odoo. The call is transformed into a JSON RPC call on the Odoo side of things. This is helpful to keep in mind when building the filters. 


### Adding a filter

Click **Add condition** after selecting **Custom Resource** from the **Resource** dropdown. These filters work well for discrete values. If there are values in your Odoo instance that are falsey or truthy then it might be better
to use a **Domain filter**.

### Using domain filters

The **Domain Filter** field is only available for **Custom Resource**. It takes a JSON object and passes it to Odoo's JSON RPC. Odoo converts this into a Python Tuple to filter the model on upon execution. Below is a table for some Odoo domains and how they would be entered in the string field of **Domain Filter** in the Odoo node on n8n.


| Odoo Domain Filter | n8n Odoo Domain Filter String |
| -------------------- | ------------------------------------------------ |
| `[("intended_use", "=", False)]` | `[["intended_use", "=", false]]` |
| `["&", ("detailed_type", "=", "product"), "&", ("type", "=", "product"), ("reduced_template_price", "!=", False)]` | `["&", ["detailed_type", "=", "product"], "&", ["type", "=", "product"], ["reduced_template_price", "!=", false]]` |

You can "convert" a tuple to a JSON object by copying the Python Tuple and running it with a simple Python script:

```python
import json

tuple = [("intended_use", "=", False)]
json.dumps(tuple)

# outputs: [["intended_use", "=", false]]
```


## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'odoo') ]]

