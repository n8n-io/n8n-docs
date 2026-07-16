---
description: Let each user connect their own account to a credential, so a workflow runs with the credentials of the person who triggers it.
layout:
  description:
    visible: false
---

# End-user credentials

End-user credentials let workflows run with the credentials of the person who triggers them, rather than a fixed credential. A project admin creates one credential as a template, and each user connects their own account. n8n uses each user's connected account and keeps their data private.

With fixed credentials, everyone who runs a workflow uses the same account, which can expose one person's access and data to everyone else. End-user credentials give each user their own connection and isolate their execution data.

{% hint style="info" %}
**Available on Enterprise plans**
{% endhint %}

{% hint style="info" %}
**This feature is in preview**

Preview features may change in future releases. Don't rely on them in production workflows.
{% endhint %}

## What are end-user credentials

When you create or edit a credential, select a **Credential type**:

* **Fixed credential:** Uses the same credential regardless of who runs the workflow. This is the default.
* **End-user credential:** Uses each user's credential at runtime. Only that user can see and use their credential.

An end-user credential is a template. The person who creates it configures the connection once, for example the OAuth app details for Gmail. Every user with access connects their own account using that template. Each connection belongs to the user who made it: only they can use it, and only they can see the data it returns.

### Example

You build a workflow with a manual trigger that reads messages from Gmail and sends a summary to Slack. You create an end-user credential for Gmail as the template. When user A runs the workflow, n8n reads user A's inbox. When user B runs it, n8n reads user B's inbox. Each user only sees their own data.

## How it works

Select credentials on nodes using the credential dropdown, the same as always. There's no separate setting on the node. The node behavior depends on the credential type:

* With a fixed credential, the node behaves as it always has.
* With an end-user credential, the node shows it uses the triggering user's account and prompts them to connect if they haven't yet.

At runtime, n8n resolves the credential to the connected account of the user who triggers the workflow. Every user with workflow access sees the node in the context of their own identity. If they've connected their account, that connection runs. If not, they need to connect before triggering the workflow.

You can mix fixed and end-user credentials across nodes in one workflow. For example, read from each user's personal Google Calendar with an end-user credential, but send the result through a shared team Slack account with a fixed credential.

## Requirements and limitations

* **Enterprise only:** End-user credentials require an Enterprise plan.
* **Controlled creation:** By default, only [project admins](../manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md) can create end-user credentials. Grant this permission to other users through [custom roles](../manage-users-and-access/set-permissions-and-roles-rbac/create-custom-roles.md). Limiting who can create them keeps credential management central: an admin sets up a template once and shares it to the projects that need it, rather than many users each setting up their own.
* **OAuth credentials only:** End-user credentials support OAuth-based credential types only.
* **One connection per user:** Each user can connect a single account per end-user credential template.
* **Supported triggers:** End-user credential resolution works with the manual trigger, [Chat Hub](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/chat-hub), and the MCP Server Trigger.

## Create an end-user credential

1. Create a credential or open an existing one.
2. Under **Credential type**, select **End-user credential**.
3. Configure the connection. For OAuth credentials, include the **Client ID**, **Client Secret**, and **OAuth Redirect URL** to register with the service.
4. Select **Save**.

Users with access to the project can now connect their own account to this credential.

## Connect your account

Before you can use an end-user credential in a workflow, connect your account to the template. You can do this from:

* **A node**: when you open a node that uses an end-user credential, it shows whether you've connected your account. If you haven't, select **Connect**.
* **The credential**: open the end-user credential and connect your account in the credential modal.
* **The credentials list**: in a project's **Credentials** list, the end-user credential's card has a **Connect** option.

Complete the OAuth flow for your account. Once connected, the node shows your account, for example **Connected as you@example.com**.

Your connection is private. Other users connect their own accounts to the same template and never use yours.

## Execution data and privacy

When a workflow execution uses an end-user credential, the execution metadata is visible to anyone with access to that workflow's executions: the status, when it ran, and that it used an end-user credential. What changes is who can see the data inside.

Only the user who triggered the workflow with their connected account can see the input and output data for those nodes, including the data returned from the connected service. For everyone else, including instance admins, those nodes show redacted output.

### Admin visibility

An admin can see that an end-user credential template exists and that it has connections attached. For example, when deleting an end-user credential, an admin sees how many user connections are attached. That count is all they see. They can't:

* View anything about individual connections
* View a connection's secrets
* Use anyone's connected account in their own workflows
* See the redacted output of executions that ran on another user's connection

Sharing works the same as any credential, but only shares the template, not the connected accounts. An admin can share it into other projects or with other users, and each recipient connects their own account.

{% hint style="warning" %}
**Deleting an end-user credential removes every connection**

Deleting the credential template deletes the whole credential, including every user's connection, not just your own. Any workflow that relies on it stops resolving for those users until the credential is set up again and they reconnect. n8n warns you before you delete an end-user credential that has connections attached.
{% endhint %}

## Share end-user credentials across projects

Share an end-user credential into other projects using the standard [credential sharing](share-credentials-securely.md) mechanism. Sharing shares the template, not a connection. Users in the other project see an option to connect their own account. They don't get the original owner's connection.

Each user only connects once per template. That single connection then resolves for them in every project the template is shared into, so they don't need to reconnect in each project.

A good practice is to create your end-user credentials (for example Gmail, Linear, Jira, and Google Sheets) in a single project, then share them into the other projects that need them. Each project gets the same template, and each user's one connection works across all of them.

## Related resources

* [Create and edit credentials](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-edit-credentials)
* [Share credentials securely](share-credentials-securely.md)
* [RBAC role types](../manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md)
