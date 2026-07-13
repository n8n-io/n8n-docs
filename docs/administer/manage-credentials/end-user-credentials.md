---
description: Let each user connect their own account to a credential, so a workflow runs with the credentials of the person who triggers it.
layout:
  description:
    visible: false
---

# End-user credentials

End-user credentials let a workflow run with the credentials of the person who triggers it, rather than a single shared account. A project admin creates one credential as a blueprint, and each user connects their own account to it. When a user runs the workflow, n8n uses that user's connected account and keeps their data private to them.

This solves a common problem with shared credentials: normally, anyone who can run a workflow uses the same stored account, which can expose one person's access and data to everyone else. End-user credentials give each user their own connection and isolate their execution data.

{% hint style="info" %}
**Feature availability**

End-user credentials are available on Enterprise plans.
{% endhint %}

{% hint style="info" %}
**This feature is in preview**

Preview features may change in future releases. Avoid relying on them in production workflows.
{% endhint %}

## What are end-user credentials

When you create or edit a credential, you choose a **Credential type**:

* **Fixed credential**: the same credential is used regardless of who runs the workflow. This is the standard behaviour.
* **End-user credential**: each user connects their own account, which is only used when they trigger the workflow.

An end-user credential acts as a blueprint. The person who creates it configures the connection once, for example the OAuth app details for Gmail. Every user who has access then connects their own account against that blueprint. Each connection belongs to the user who made it: only they can use it, and only they can see the data it returns.

### Example

Say you build a workflow with a manual trigger that reads messages from Gmail and sends a summary to Slack. You create an end-user credential for Gmail as the blueprint. When user A runs the workflow, it reads user A's inbox. When user B runs it, it reads user B's inbox. Each user only ever sees their own data.

## How it works

Builders pick a credential on a node the same way as always, using the credential dropdown. There's no separate setting on the node. The node reflects whichever type the chosen credential is:

* With a fixed credential, the node behaves as it always has.
* With an end-user credential, the node shows that it uses the triggering user's own account, and prompts the viewer to connect their account if they haven't yet.

At runtime, n8n resolves the credential to the connected account of the user who triggers the workflow. Every user with workflow access sees the node in the context of their own identity: if they've connected their account, that connection runs; if not, they need to connect before they can trigger the workflow.

A workflow can mix fixed and end-user credentials across nodes. For example, you might read from each user's personal Google Calendar with an end-user credential, but send the result through a shared team Slack account with a fixed credential.

## Requirements and limitations

* **Enterprise only.** End-user credentials are an Enterprise feature.
* **Project admins create them.** Only [project admins](../manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md) can create end-user credentials. They're meant to be set up by someone building a workflow for many people to use.
* **OAuth credentials only.** End-user credentials currently support OAuth-based credential types.
* **One connection per user.** Each user has a single connected account per blueprint.
* **Supported triggers.** End-user credential resolution works with the manual trigger, [Chat Hub](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/chat-hub), and the MCP Server Trigger.

{% hint style="info" %}
**Webhooks**

Webhook triggers can also run workflows on behalf of an external user, but this works differently and relies on a custom implementation rather than the standard connect flow described here.
{% endhint %}

## Create an end-user credential

1. Create a credential as usual, or open an existing one you want to change.
2. Under **Credential type**, select **End-user credential**.
3. Configure the connection. For OAuth credentials, this includes the **Client ID** and **Client Secret** for the OAuth app, and the **OAuth Redirect URL** to register with the service.
4. Select **Save**.

The credential is now a blueprint. Users with access to the project can connect their own account against it.

## Connect your account

To use an end-user credential in a workflow, connect your own account against the blueprint:

1. Open a node that uses the end-user credential.
2. In the credential section, select **Connect** and complete the OAuth flow for your account.
3. Once connected, the node shows your account, for example **Connected as you@example.com**.

Your connection is private to you. Other users connect their own accounts against the same blueprint and never use yours.

## Execution data and privacy

When a workflow execution uses an end-user credential, the execution is still visible to anyone with access to that workflow's executions. What changes is who can see the data inside it.

Everyone with workflow access can see that the execution happened, who triggered it, and which workflow ran. Only the credential owner can see the input and output data for nodes that used their connected account, including the data returned from the connected service. For anyone else, including instance admins, those nodes show redacted output.

### Admin visibility

Admin access follows a principle of visibility without access. Admins know an end-user credential exists and know its connections exist. For example, when deleting a blueprint, an admin sees how many user connections are attached to it. Admins can't view or use those connections anywhere else, can't view the stored tokens, can't use the credential in their own workflows, can't reshare it, and can't see the redacted output of executions that used it.

{% hint style="warning" %}
**Deleting a blueprint removes every connection**

Deleting an end-user credential removes every user's connection to it, not just your own. Any workflow relying on it stops resolving for those users until they reconnect against a new blueprint. n8n warns you before you delete a blueprint with connections attached.
{% endhint %}

## Share end-user credentials across projects

You can share an end-user credential into other projects using the standard [credential sharing](share-credentials-securely.md) mechanism. Sharing shares the blueprint, not a connection: users in the other project see an option to connect their own account, they don't get the original owner's connection.

A good practice is to create your end-user credentials, for example Gmail, Linear, Jira, and Google Sheets, in a single project, then share them into the other projects that need them. Each project gets a connect option for the same blueprint, and every user connects once.

## Related resources

* [Create and edit credentials](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-edit-credentials)
* [Share credentials securely](share-credentials-securely.md)
* [RBAC role types](../manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md)
