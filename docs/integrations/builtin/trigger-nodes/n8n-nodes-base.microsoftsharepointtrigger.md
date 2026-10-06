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

The node watches one document library or one list on one site. It checks for changes on a schedule you set. Each check starts the workflow at most once. If several items changed since the last check, they all arrive in one execution, with one item for each entry. If nothing changed, the node starts no execution.

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

A change is picked up on the next check. One check reads at most 40 pages of changes, and stops early if it runs out of time. If more changes are waiting, the node saves its place and carries on at the next check. A large burst of changes therefore arrives over several executions, and can take longer to clear than one interval.

## Output

The node outputs each changed entry exactly as Microsoft Graph returns it, with no reshaping. The fields depend on which resource you're watching and on what happened to the item.

An entry with a `deleted` property is a deletion. An entry without one is a change.

Watching a list, an entry carries the item's identity. The node reads Graph's default payload and doesn't expand the item's `fields`, so don't rely on an entry carrying column values. To read a column, add a Microsoft SharePoint node after the trigger and get the item by `id`.

A deletion entry carries much less than a change entry, because Microsoft Graph drops most fields from it. Expect the item's `id` and the `deleted` property, and don't rely on anything else being present. If your workflow needs a deleted item's name, keep your own record of the items you've seen, keyed by `id`.

When watching a document library, don't rely on the entry carrying `parentReference.path`. Use `webUrl` to find where the file is.

## Limits worth knowing

* A created file and an edited file both raise **Changed**. So do renames, moves, and metadata-only edits such as a changed column value.
* Changes are picked up no faster than the **Poll Times** interval.
* When you publish the workflow, the node starts watching from that moment. Files and items that already exist raise no event. To process a library's existing contents, use the Microsoft SharePoint node instead.
* The node collapses repeated changes to the same item within one check only. An item can reach your workflow more than once while a burst drains, so make the workflow safe to run twice for the same item.
* If the node doesn't run for a long time, its saved position can expire on Microsoft's side. The node then starts watching from that moment and logs a warning. Changes made while the position was expired aren't reported.
* Changing the **Authentication** method, **Site**, **Resource**, **Document Library**, or **List** resets the saved position. The node starts watching from that moment, and doesn't report what changed before. Choosing a different credential of the same type keeps the position.
* Testing the node in the editor doesn't move the saved position, so a test never consumes real events. A test lists items that already exist in the library or list, up to one page of them. It doesn't wait for a change, and it never shows a deletion. Use it to see the shape of an entry, not to check your event selection.
* If the watched library or list can no longer be reached, for example after someone deleted it, the node reports an error that names the library or list and the site it looked on. It keeps its saved position, so it resumes if the target comes back. A rename doesn't break the node, because it watches by ID. The exception is a list you typed as a title in **By ID or Title** mode.
* If the credential loses access, Microsoft Graph usually answers with a permission error instead. The node reports that error as it came back, so it doesn't name the library or list. Check the credential's scopes and the signed-in account's access to the site.
* When a check fails, the node reports the failure. While the same failure repeats, it reports it again at most once an hour and writes a warning to the log in between, so a lasting problem doesn't fill your execution list. A different failure reports at once, and a successful check clears the record. A test in the editor always reports the failure.

## Related resources

n8n provides an app node for Microsoft SharePoint. Refer to the [Microsoft SharePoint node documentation](../app-nodes/n8n-nodes-base.microsoftsharepoint.md) for more information.

Refer to [Microsoft's driveItem delta documentation](https://learn.microsoft.com/en-us/graph/api/driveitem-delta) and [listItem delta documentation](https://learn.microsoft.com/en-us/graph/api/listitem-delta) for details about the change feeds this node reads.
