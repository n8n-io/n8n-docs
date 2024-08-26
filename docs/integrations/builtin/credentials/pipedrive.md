---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Pipedrive credentials
description: Documentation for Pipedrive credentials. Use these credentials to authenticate Pipedrive in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Pipedrive credentials

You can use these credentials to authenticate the following nodes:

- [Pipedrive](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/)
- [Pipedrive Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.pipedrivetrigger/)

## Supported authentication methods

- API token
- OAuth2

## Related resources

Refer to [Pipedrive's developer documentation](https://pipedrive.readme.io/docs/getting-started){:target=_blank .external-link} for more information about the service.

## Using API token

To configure this credential, you'll need a [Pipedrive](https://pipedrive.com/){:target=_blank .external-link} account and:

- An **API Token**

To get your API token:

1. Open your [**API Personal Preferences**](https://app.pipedrive.com/settings/api){:target=_blank .external-link}.
2. Copy **Your personal API token** and enter it in your n8n credential.

If you have multiple companies, you'll need to select the correct company first:

1. Select your account name and be sure you're viewing the correct company.
2. Then select **Company Settings**.
2. Select **Personal Preferences**.
3. Select the **API** tab.
4. Copy **Your personal API token** and enter it in your n8n credential.

Refer to [How to find the API token](https://pipedrive.readme.io/docs/how-to-find-the-api-token){:target=_blank .external-link} for more information.

## Using OAuth2

To configure this credential, you'll need a [Pipedrive developer sandbox account](https://developers.pipedrive.com/){:target=_blank .external-link} and:

- A **Client ID**
- A **Client Secret**

To get both, you'll need to register a new app:

1. Select your profile name in the upper right corner.
2. Find the company name of your sandbox account and select **Developer Hub**.

    /// note | No Developer Hub
    If you don't see **Developer Hub** in your account dropdown, sign up for a [developer sandbox account](https://developers.pipedrive.com/){:target=_blank .external-link}.
    ///

3. Select **Create an app**.
4. Select **Create public app**. The app's **Basic info** tab opens.
5. Enter an **App name** for your app, like `n8n integration`.
6. Copy the **OAuth Redirect URL** from n8n and add it as the app's **Callback URL**.
7. Select **Save**. The app's **OAuth & access scopes** tab opens.
8. Turn on appropriate **Scopes** for your app. Refer to [Pipedrive node scopes](#pipedrive-node-scopes) and [Pipedrive Trigger node scopes](#pipedrive-trigger-node-scopes) below for more guidance.
8. Copy the **Client ID** and enter it in your n8n credential.
9. Copy the **Client Secret** and enter it in your n8n credential.

Refer to [Registering a public app](https://pipedrive.readme.io/docs/marketplace-registering-the-app){:target=_blank .external-link} for more information.

### Pipedrive node scopes

The scopes you add to your app depend on which node(s) you want to use it for in n8n and what actions you want to complete with those.

Scopes you may need for the [Pipedrive](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) node:

| **Object** | **Node action** | **UI scope** | **Actual scope** |
| --- | --- | --- | --- |
| Activity | Get data of an activity <br> Get data of all activities | **Activities: Read only** or <br> **Activities: Full Access** | `activities:read` or <br> `activities:full` |
| Activity | Create <br> Delete <br> Update | **Activities: Full Access** | `activities:full` |
| Deal | Get data of a deal <br> Get data of all deals <br> Search a deal | **Deals: Read only** or <br> **Deals: Full Access** | `deals:read` or <br> `deals:full` |
| Deal | Create <br> Delete <br> Duplicate <br> Update | **Deals: Full Access** | `deals:full` |
| Deal Activity | Get all activities of a deal | **Activities: Read only** or <br> **Activities: Full Access** | `activities:read` or <br> `activities:full` |
| Deal Product | Get all products in a deal |  **Products: Read Only** or <br> **Products: Full Access** | `products:read` or <br> `products:full` |
| File | Download <br> Get data of a file | Refer to note below | Refer to note below |
| File | Create <br> Delete | Refer to note below | Refer to note below |
| Lead | Get data of a lead <br> Get data of all leads | **Leads: Read only** or <br> **Leads: Full access** | `leads:read` or <br> `leads:full` |
| Lead | Create <br> Delete <br> Update | **Leads: Full access** | `leads:full` |
| Note | Get data of a note <br> Get data of all notes | Refer to note below | Refer to note below |
| Note | Create <br> Delete <br> Update | Refer to note below | Refer to note below |
| Organization | Get data of an organization <br> Get data of all organizations <br> Search | **Contacts: Read Only** or <br> **Contacts: Full Access** | `contacts:read` or <br> `contacts:full` |
| Organization | Create <br> Delete <br> Update | **Contacts: Full Access** | `contacts:full` |
| Person | Get data of a person <br> Get data of all persons <br> Search | **Contacts: Read Only** or <br> **Contacts: Full Access** | `contacts:read` or <br> `contacts:full` |
| Person | Create <br> Delete <br> Update | **Contacts: Full Access** | `contacts:full` |
| Product | Get data of all products | **Products: Read Only** | `products:read` |

/// note | Files and Notes
The scopes for Files and Notes depend on which object they relate to:

- Files relate to Deals, Activities, or Contacts.
- Notes relate to Deals or Contacts.

Refer to those objects' scopes.
///

The Pipedrive node also supports Custom API calls. Add relevant scopes for whatever custom API calls you intend to make.

Refer to [Scopes and permissions explanations](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations){:target=_blank .external-link} for more information.

### Pipedrive Trigger node scopes

The [Pipedrive Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.pipedrivetrigger/) node requires the **Webhooks: Full access** (`webhooks:full`) scope.
