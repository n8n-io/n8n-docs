---
description: >-
  Learn how to use the Microsoft Excel (SharePoint) node in n8n. Follow
  technical documentation to integrate Microsoft Excel (SharePoint) node into
  your workflows.
layout:
  description:
    visible: false
---

# Microsoft Excel (SharePoint) node

Use the Microsoft Excel (SharePoint) node to read and write Excel workbooks stored in SharePoint document libraries, including workbooks shared through Microsoft Teams sites.

On this page, you'll find a list of operations the Microsoft Excel (SharePoint) node supports, guidance on choosing a workbook, and links to more resources.

{% hint style="info" %}
**Credentials**

The node offers two ways to sign in, chosen with the **Authentication** dropdown:

* **Microsoft OAuth2 (Graph)**: sign in as a person with the generic [Microsoft OAuth2 credential](../credentials/microsoft.md). Enter the scopes the node needs in the credential's **Scope** field: `Sites.Read.All` to browse and read, `Sites.ReadWrite.All` to write. Include `openid offline_access` so the credential can refresh its tokens. For example, to perform all of the node's operations: `openid offline_access Sites.ReadWrite.All`.
* **Microsoft Entra Service Principal (App-Only)**: sign in as an app, for unattended workflows where no user is present, with the [Microsoft Entra Service Principal credential](../credentials/microsoftentraserviceprincipal.md). Grant the app registration `Sites.Read.All` to read and `Sites.ReadWrite.All` to write, with admin consent. To limit the app to specific sites, grant `Sites.Selected` for each site instead.

These are the only credentials the node accepts. The node-specific **Microsoft Excel** and **Microsoft SharePoint** credentials don't work with it: the Excel credential doesn't include the SharePoint (`Sites.*`) scopes, and the SharePoint credential issues tokens for the SharePoint REST API rather than for Microsoft Graph, which this node uses.
{% endhint %}

## Which Excel node should I use?

n8n has two Excel nodes:

* **Microsoft Excel (OneDrive)**: for workbooks stored in a personal or business OneDrive.
* **Microsoft Excel (SharePoint)** (this node): for workbooks stored in SharePoint document libraries, including files that live behind a Teams site. This node also supports app-only sign in, so it suits unattended workflows.

If someone shared a workbook link with you and the link points at a SharePoint site, this is the node to use.

## Choosing a workbook

There are three ways to point the node at a workbook:

* **Paste the workbook's address** (the default): copy the link from SharePoint or Excel (**Share** > **Copy link**) and paste it into the **Workbook** field. The link straight from the copy button works as-is, and you don't need to choose a site or library first.
* **Pick from a list**: choose the **Site** and **Document Library**, then search for the workbook by name.
* **By ID**: paste the workbook's ID directly.

## Operations

* **Sheet**:
  * Append: append rows to the end of a sheet.
  * Append or Update: append a new row or update the current one if it already exists.
  * Clear: clear a sheet or a range.
  * Delete: delete a sheet.
  * Get Many: retrieve a list of the workbook's sheets.
  * Get Rows: read rows from a range or the used range of a sheet.
  * Update: update rows matched by a column value.
* **Table**:
  * Append: append rows to the end of a table.
  * Convert to Range: convert a table to a plain range of cells.
  * Create: create a table from a range of cells.
  * Delete: delete a table.
  * Get Columns: retrieve a list of the table's columns.
  * Get Many: retrieve a list of the workbook's tables.
  * Get Rows: retrieve a list of the table's rows.
  * Lookup: look for a specific column value and then return the matching row.
* **Workbook**:
  * Add Sheet: add a new sheet to the workbook.
  * Delete: delete a workbook.
  * Get Many: retrieve a list of the document library's workbooks.

More operations are on the way. This page is updated as they ship.

## Templates and examples

[Search all templates](https://n8n.io/workflows/) for examples using this node.

## Related resources

Refer to [Microsoft's Excel Graph API documentation](https://learn.microsoft.com/en-us/graph/api/resources/excel) for more information about the service.
