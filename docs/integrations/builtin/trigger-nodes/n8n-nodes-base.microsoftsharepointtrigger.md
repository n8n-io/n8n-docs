---
title: Microsoft SharePoint Trigger node documentation
description: >-
  Learn how to use the Microsoft SharePoint Trigger node in n8n. Start a
  workflow when a file or list item changes in Microsoft SharePoint.
layout:
  description:
    visible: false
---

# Microsoft SharePoint Trigger node

Use the Microsoft SharePoint Trigger node to start a workflow when a file or a list item changes in [Microsoft SharePoint](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration).

The node watches one document library or one list on one site. It checks for changes on a schedule you set, and starts the workflow once for each item that changed.

On this page, you'll find what the node watches, the events it produces, and the limits worth knowing before you build on it.

{% hint style="info" %}
**Credentials**

The node offers two ways to sign in, chosen with the **Authentication** dropdown:

* **Microsoft OAuth2 (Graph)**: sign in as a person with the generic [Microsoft OAuth2 credential](../credentials/microsoft.md). Enter `Sites.Read.All` in the credential's **Scope** field, together with `openid offline_access` so the credential can refresh its tokens. For example: `openid offline_access Sites.Read.All`. If your organization grants access site by site, use `openid offline_access Sites.Selected` instead.
* **Microsoft Entra Service Principal (App-Only)**: sign in as an app, for unattended workflows where no user is present, with the [Microsoft Entra Service Principal credential](../credentials/microsoftentraserviceprincipal.md). Grant the app registration the `Sites.Read.All` application permission, with admin consent. To limit the app to specific sites, grant `Sites.Selected` instead and [grant access per site](../credentials/microsoftentraserviceprincipal.md#grant-access-per-site).

A trigger keeps checking for changes when nobody is signed in, so the Service Principal credential suits it better for production workflows. A user credential stops working when that user's session is revoked, for example after they leave the organization or reset their password.

The node-specific Microsoft SharePoint credential isn't offered. Its tokens are issued for the older SharePoint REST API and don't work with Microsoft Graph.
{% endhint %}

{% hint style="info" %}
**Government Cloud Support**

If you're using a government cloud tenant (US Government, US Government DOD, or China), make sure to select the appropriate **Microsoft Graph API Base URL** in your Microsoft credentials configuration.
{% endhint %}

## What the node watches

Choose a **Site**, then set **Resource** to what you want to watch on it:

* **Document Library**: watches the files in one library. Choose the library in **Document Library**.
* **List**: watches the items in one list. Choose the list in **List**.

Each field offers a picker and a typed value. Use the picker unless it can't reach what you need, for example when your organization grants access site by site. The **Site** field also accepts a site address in **By URL** mode.

The node watches the whole library or the whole list. You can't narrow it to one folder. Microsoft Graph's change feed can't be filtered on the server, and it doesn't report the folder path of a changed file, so there's nothing reliable to filter on.

## Events

Select the events in **Events**. Both are on by default.

* **Changed**: a file or item was added, edited, renamed, or moved, or its metadata changed.
* **Deleted**: a file or item was deleted.

Folders produce no events, on either resource.

### Why there's no separate Created event

Microsoft Graph's change feed reports the latest state of each item, not each change. An item that was created and an item that was edited arrive looking the same, so the node reports both as **Changed** rather than guessing.

If you need to tell new items from edited ones, compare `createdDateTime` with `lastModifiedDateTime` in your workflow, and treat the result as a hint rather than a fact. An item created and then edited between two checks arrives once, with the two timestamps different.

## How often the node checks

**Poll Times** sets how often the node checks for changes. It defaults to every minute. n8n supplies this field for every polling trigger, and rejects an interval shorter than one minute when you publish the workflow.

A change is picked up on the next check, so the interval you set is also the longest delay between a change happening and the workflow starting.

## Output

The node outputs each changed entry exactly as Microsoft Graph returns it, with no reshaping. The fields depend on which resource you're watching and on what happened to the item.

An entry with a `deleted` property is a deletion. An entry without one is a change.

A deletion carries very little, because Microsoft Graph drops most fields from a deletion entry:

* Watching a document library, a deletion has the item's `id` but no `name`.
* Watching a list, a deletion has the item's `id` but no `name`, no `webUrl`, and no timestamps.

If your workflow needs a deleted item's name, keep your own record of the items you've seen, keyed by `id`.

When watching a document library, the entry has no `parentReference.path`. Microsoft Graph documents this as deliberate. Use `webUrl` to find where the file is.

## Limits worth knowing

* A created file and an edited file both raise **Changed**. So do renames, moves, and metadata-only edits such as a changed column value.
* Changes are picked up no faster than the **Poll Times** interval.
* If the node doesn't run for a long time, its saved position can expire on Microsoft's side. The node then starts watching from that moment and logs a warning. Changes made while the position was expired aren't reported.
* Changing the **Site**, **Resource**, **Document Library**, or **List** resets the saved position. The node starts watching from that moment, and doesn't report what changed before.
* Testing the node in the editor fetches sample entries without moving the saved position, so a test never consumes real events.
* If the watched library or list is deleted or renamed, or the credential loses access to it, the node reports an error naming what it couldn't reach. It repeats that error at most once an hour while the problem lasts, and keeps its saved position so it resumes if access comes back.

## Related resources

n8n provides an app node for Microsoft SharePoint. Refer to the [Microsoft SharePoint node documentation](../app-nodes/n8n-nodes-base.microsoftsharepoint.md) for more information.

Refer to [Microsoft's driveItem delta documentation](https://learn.microsoft.com/en-us/graph/api/driveitem-delta) and [listItem delta documentation](https://learn.microsoft.com/en-us/graph/api/listitem-delta) for details about the change feeds this node reads.
