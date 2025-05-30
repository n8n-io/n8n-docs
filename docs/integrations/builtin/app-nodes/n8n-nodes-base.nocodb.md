---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: NocoDB node documentation
description: Learn how to use the NocoDB node in n8n. Follow technical documentation to integrate NocoDB node into your workflows.
contentType: integration
priority: medium
---

# NocoDB node

Use the NocoDB node to automate work in NocoDB, and integrate NocoDB with other applications. n8n has built-in support for a wide range of NocoDB features, including creating, updating, deleting, and retrieving rows.

On this page, you'll find a list of operations the NocoDB node supports and links to more resources.

/// note | Credentials
Refer to [NocoDB credentials](/integrations/builtin/credentials/nocodb/) for guidance on setting up authentication.
///

## Row Operations

These operations interact with rows in your NocoDB tables. The node introduces the following shared properties for all 'Row' operations.

**Shared Properties** (visible for all 'Row' operations):

-   **Workspace Name or ID**: Choose from the list, or specify an ID using an expression.

-   **Base Name or ID**: Choose from the list, or specify an ID using an expression.

-   **Table Name or ID**: The table to operate on. Choose from the list, or specify an ID using an expression.

### Row: Create

Creates a new row in the specified table.

-   **Data to Send**: Whether to insert the input data this node receives in the new row.

-   **Inputs to Ignore**: List of input properties to avoid sending, separated by commas. Leave empty to send all properties. Visible if 'Data to Send' is 'Auto-Map Input Data to Columns'.

-   **Fields to Send**: Specify the data for each column in the new row. Visible if 'Data to Send' is 'Define Below for Each Column'.

    -   **Field Name**: Name of the column.

    -   **Is Binary File**: Whether the field data to set is binary and should be taken from a binary property.

    -   **Field Value**: The value to set for the field. Visible if 'Is Binary File' is false.

    -   **Take Input From Field**: The field containing the binary file data to be uploaded. Visible if 'Is Binary File' is true.

### Row: Delete

Deletes a row from the specified table.

-   **Row ID Value**: The value of the ID field for the row to delete.

### Row: Get

Retrieves a single row from the specified table.

-   **Row ID Value**: The value of the ID field for the row to retrieve.

-   **Download Attachments**: Whether the attachment fields defined in 'Download Fields' will be downloaded.

-   **Download Fields**: Name of the fields of type 'attachment' that should be downloaded. Multiple ones can be defined separated by comma. Case sensitive. Visible if 'Download Attachments' is true.

-   **Options**:

    -   **Fields**: The select fields of the returned row.

### Row: Get Many

Retrieves multiple rows from the specified table.

-   **Download Attachments**: Whether the attachment fields defined in 'Download Fields' will be downloaded.

-   **Download Fields**: Name of the fields of type 'attachment' that should be downloaded. Multiple ones can be defined separated by comma. Case sensitive. Visible if 'Download Attachments' is true.

-   **Return All**: Whether to return all results or only up to a given limit.

-   **Limit**: Max number of results to return. Visible if 'Return All' is false.

-   **Options**:

    -   **View ID**: The ID of a view to use for filtering/ordering.

    -   **Fields**: The select fields of the returned rows.

    -   **Sort**: Define rules for sorting the results:

        -   **Field**: Name of the field to sort on.

        -   **Direction**: Sort direction (Ascending or Descending).

    -   **Filter By Formula**: A formula used to filter rows. Refer to NocoDB documentation for formula syntax.

    -   **Shuffle**: Whether to shuffle the results.

    -   **Offset**: The number of rows to skip from the beginning.

### Row: Update

Updates an existing row in the specified table.

/// note | Important
This operation requires the primary key "Id" to be included for each row.
///

-   **Data to Send**: Whether to insert the input data this node receives in the updated row.

-   **Inputs to Ignore**: List of input properties to avoid sending, separated by commas. Leave empty to send all properties. Visible if 'Data to Send' is 'Auto-Map Input Data to Columns'.

-   **Fields to Send**: Specify the data for each column to be updated. Visible if 'Data to Send' is 'Define Below for Each Column'.

    -   **Field Name**: Name of the column.

    -   **Is Binary File**: Whether the field data to set is binary and should be taken from a binary property.

    -   **Field Value**: The value to set for the field. Visible if 'Is Binary File' is false.

    -   **Take Input From Field**: The field containing the binary file data to be uploaded. Visible if 'Is Binary File' is true.

## Link Operations

These operations manage links between rows in different tables.

**Shared Properties** (visible for all 'Link' operations):

-   **Workspace Name or ID**: Choose from the list, or specify an ID using an expression.

-   **Base Name or ID**: Choose from the list, or specify an ID using an expression.

-   **Table Name or ID**: The source table containing the link field. Choose from the list, or specify an ID.

-   **Field Name or ID**: The link field to operate on. Choose from the list, or specify an ID.

-   **Table Row ID**: The value of the source table row ID field.

### Link: Add

Adds links between a source row and one or more target rows.

-   **Link IDs**: The value of the target table row ID field. Multiple IDs can be defined, separated by a comma.

### Delete

Removes links between a source row and one or more target rows.

-   **Link IDs**: The value of the target table row ID field. Multiple IDs can be defined, separated by a comma.

### Get Many

Retrieves rows linked to a source row via a specified link field.

-   **Download Attachments**: Whether the attachment fields defined in 'Download Fields' will be downloaded.

-   **Download Fields**: Name of the fields of type 'attachment' that should be downloaded. Multiple ones can be defined, separated by a comma. Case sensitive. Visible if 'Download Attachments' is true.

-   **Return All**: Whether to return all results or only up to a given limit.

-   **Limit**: Max number of results to return. Visible if 'Return All' is false.

-   **Options**:

    -   **Fields**: The select fields of the returned linked rows.

    -   **Sort**: Define rules for sorting the results:

        -   **Field**: Name of the field to sort on.

        -   **Direction**: Sort direction (Ascending or Descending).

    -   **Filter By Formula**: A formula used to filter linked rows. Refer to NocoDB documentation for formula syntax.

    -   **Offset**: The number of rows to skip from the beginning.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->

[[templatesWidget(page.title, 'nocodb')]]

## Relates resources

Refer to [NocoDB's documentation](https://docs.nocodb.com/){:target=\_blank .external-link} for more information about the service.

--8<-- "\_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
