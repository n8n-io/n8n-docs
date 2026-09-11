---
title: Microsoft SharePoint node documentation
description: >-
  Learn how to use the Microsoft SharePoint node in n8n. Follow technical
  documentation to integrate Microsoft SharePoint node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Microsoft SharePoint node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.microsoftsharepoint.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftsharepoint
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftsharepoint
layout:
  description:
    visible: false
---

# Microsoft SharePoint node <a href="#microsoft-sharepoint-node" id="microsoft-sharepoint-node"></a>

Use the Microsoft SharePoint node to automate work in Microsoft SharePoint and integrate Microsoft SharePoint with other applications. n8n has built-in support for a wide range of Microsoft SharePoint features, which includes downloading, uploading, and updating files, managing items in lists, and getting lists and list items.

On this page, you'll find a list of operations the Microsoft SharePoint node supports, guidance on signing in and choosing a site, what changed in version 2 of the node, and links to more resources.

{% hint style="info" %}
**Feature availability**

From n8n 2.37.0, adding the Microsoft SharePoint node to a workflow creates version 2 of the node, which uses the Microsoft Graph API. Workflows built with version 1 stay on version 1 and keep working unchanged, with the credential they already use. Refer to [What changed from version 1](#what-changed-from-version-1).

{% endhint %}

{% hint style="info" %}
**Credentials**

Version 2 of the node offers two ways to sign in, chosen with the **Authentication** dropdown:

* **Microsoft OAuth2 (Graph)**: sign in as a person with the generic [Microsoft OAuth2 credential](../credentials/microsoft.md). Enter the scopes the node needs in the credential's **Scope** field: `Sites.Read.All` to read, `Sites.ReadWrite.All` to write. Include `openid offline_access` so the credential can refresh its tokens. For example, to perform all the node's operations: `openid offline_access Sites.ReadWrite.All`. If your organization grants access site by site, use `openid offline_access Sites.Selected` instead and refer to [Per-site access](#per-site-access).
* **Microsoft Entra Service Principal (App-Only)**: sign in as an app, for unattended workflows where no user is present, with the [Microsoft Entra Service Principal credential](../credentials/microsoftentraserviceprincipal.md). Grant the app registration the `Sites.Read.All` application permission to read and `Sites.ReadWrite.All` to write, with admin consent. To limit the app to specific sites, grant `Sites.Selected` instead and [grant access per site](../credentials/microsoftentraserviceprincipal.md#grant-access-per-site).

Version 1 of the node uses the node-specific [Microsoft SharePoint credential](../credentials/microsoft.md#sharepoint). Version 2 doesn't offer it: its tokens are issued for the older SharePoint REST API and don't work with Microsoft Graph.
{% endhint %}

## Choosing how to sign in

Both sign-in methods support every operation. Pick based on how the workflow runs:

| | Microsoft OAuth2 (Graph) | Microsoft Entra Service Principal (App-Only) |
|---|---|---|
| Signs in as | A person | An app registration |
| Best for | Workflows that act as you, or trying the node out | Unattended, shared, or production workflows with no user present |
| What it can access | What the signed-in user can access, within the scopes you grant | Every site in the tenant, unless you use [per-site access](#per-site-access) |
| Consent | The signing-in user consents at sign-in (an admin may need to allow it) | An administrator grants admin consent once |
| Stops working when | The user's session is revoked, for example after they leave the organization or reset their password | The client secret or certificate expires |
| Setup guide | [Microsoft OAuth2 credential](../credentials/microsoft.md) | [Microsoft Entra Service Principal credential](../credentials/microsoftentraserviceprincipal.md) |

## Operations <a href="#operations" id="operations"></a>

* **File**:
	* Download: Download a file.
	* Update: Rename a file, replace its contents, or both.
	* Upload: Upload a file to a document library.
* **Item**:
	* Create: Create an item in an existing list.
	* Create or Update: Create a new item, or update the current one if it already exists (upsert).
	* Delete: Delete an item from a list.
	* Get: Retrieve an item from a list.
	* Get Many: Get specific items in a list or list many items.
	* Update: Update an item in an existing list.
* **List**:
	* Get: Retrieve details of a single list.
	* Get Many: Retrieve a list of lists.

## Choosing a site

Every operation starts from a **Site**. Set it in one of three ways:

* **From List**: search your organization's sites by name. Site search needs a tenant-wide read permission (`Sites.Read.All` or `Sites.ReadWrite.All`); it's not available with per-site access.
* **By URL**: paste the full site address, for example `https://contoso.sharepoint.com/sites/mysite`.
* **By ID**: paste the site's ID in any form Microsoft Graph documents: the composite ID returned by the site picker and Graph (`contoso.sharepoint.com,<site-GUID>,<web-GUID>`), a bare site GUID, a hostname (the tenant root site), or `root`. To find a site's composite ID, request it by address: `GET https://graph.microsoft.com/v1.0/sites/contoso.sharepoint.com:/sites/mysite`.

## Per-site access

Some organizations don't grant apps tenant-wide access to SharePoint. Instead, they use the `Sites.Selected` permission and grant the app access to individual sites. The node supports this fully: every operation and picker works, except searching for sites, which Microsoft Graph doesn't support without a tenant-wide read permission. Set the **Site** field to **By URL** or **By ID** instead; neither needs search.

To set up per-site access:

* **Signing in as an app**: grant the app registration the `Sites.Selected` application permission with admin consent, then grant the app `read` or `write` access on each site. Refer to [Grant access per site](../credentials/microsoftentraserviceprincipal.md#grant-access-per-site).
* **Signing in as a person**: set the credential's **Scope** field to `openid offline_access Sites.Selected`. The same per-site grants apply to the app registration, and the signed-in account also needs access to the site.

## What changed from version 1

Version 2 is a rebuild of the node on the Microsoft Graph API. Existing workflows stay on the version they were built with, so nothing changes until you add a new node or switch a workflow over. When you do:

* **The credential changes.** Version 2 signs in with the generic Microsoft OAuth2 credential or, new in version 2, the Microsoft Entra Service Principal credential for unattended, app-only workflows. The version 1 **Microsoft SharePoint** credential isn't offered on version 2: its tokens target the older SharePoint REST API and fail against Microsoft Graph. Version 1 workflows keep using it unchanged.
* **Item updates use Microsoft's documented route.** Version 1 updated items through a route that worked but isn't in Microsoft's documentation. Version 2 sends updates to the documented Microsoft Graph endpoint and returns the same output as before, so your workflows won't notice a difference. Version 2 is also stricter when matching columns identify more than one item: both **Update** and **Create or Update** stop with a clear error, instead of creating a duplicate as version 1's **Create or Update** did.
* **File downloads fetch a download link first.** Version 2 asks Microsoft Graph for the file's metadata and a short-lived, pre-authorized download link, then fetches the contents from that link. n8n doesn't attach your sign-in details to the link request, because the link is already authorized. The downloaded file is identical to version 1's, including its name.

## Common issues

* **Site search fails with per-site permissions.** Microsoft Graph can't list sites for a credential that only has per-site access. Switch the **Site** field to **By URL** or **By ID** mode, or grant a tenant-wide read permission (`Sites.Read.All` or `Sites.ReadWrite.All`) if you need search.
* **A 403 error names a missing permission.** The node's permission errors name the Microsoft Graph permission the operation needs, for example `Sites.ReadWrite.All (or Sites.Selected granted with write access for this site)`. Grant it, with admin consent for application permissions, then retry. With per-site access, also check that the app has been granted access to the site you're using.
* **The Service Principal credential test fails even though operations work.** The connection test reads your organization from Microsoft Graph, so the app registration needs `Organization.Read.All` (or `Directory.Read.All`) in addition to its SharePoint permissions. Refer to the [Microsoft Entra Service Principal credential documentation](../credentials/microsoftentraserviceprincipal.md).
* **Connecting a credential fails with an AADSTS error code.** Microsoft rejected the sign-in or token exchange, for example AADSTS7000215 (invalid client secret), AADSTS7000222 (expired client secret), or AADSTS700027 (rejected certificate assertion). Refer to [Common issues in the Microsoft Entra Service Principal credential documentation](../credentials/microsoftentraserviceprincipal.md#common-issues).
* **Uploads over 250 MB fail.** **File: Upload** and **File: Update** send the contents in a single request, which is capped at 250 MB. Uploading larger files in pieces isn't supported yet.
* **Filtering a large list fails.** SharePoint only filters lists with more than 5,000 items on indexed columns. Add an index in SharePoint (**List settings** > **Indexed columns**) or filter on an indexed column.
* **Creating or updating an item fails with a unique-constraints error.** A column in the list enforces unique values, and the value you're writing already exists on another item. Change the value, or relax **Enforce unique values** for the column in SharePoint.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft SharePoint node documentation integration templates](https://n8n.io/integrations/microsoft-sharepoint) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>


Version 2 of the node uses the Microsoft Graph API. Refer to [Microsoft's Graph documentation for SharePoint](https://learn.microsoft.com/en-us/graph/api/resources/sharepoint) for more information about the service. Version 1 uses the [SharePoint REST API](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service).
