---
description: Let each user connect their own account to a credential, so a workflow runs with the credentials of the person who triggers it.
layout:
  description:
    visible: false
---

# End-user credentials

End-user credentials let a workflow run with the credentials of the person who triggers it, rather than a single shared account. A project admin creates one credential as a blueprint, and each user connects their own account to it. When a user runs the workflow, n8n uses that user's connected account and keeps their data private to them.

This solves a common problem with shared credentials: normally, anyone who can run a workflow uses the same fixed credentials, which can expose one person's access and data to everyone else. End-user credentials give each user their own connection and isolate their execution data.

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
* **End-user credential**: each user's credential is used at runtime, and can only be seen and used by that user.

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
* **Controlled creation.** By default, only [project admins](../manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md) can create end-user credentials, but you can grant this to other users through [custom roles](../manage-users-and-access/set-permissions-and-roles-rbac/create-custom-roles.md) with permission to manage them. Limiting who can create them keeps credential management intentional and central: an admin can set up an end-user credential blueprint once and share it to the projects that need it, rather than many users each setting up their own and adding management overhead.
* **OAuth credentials only.** End-user credentials currently support OAuth-based credential types.
* **One connection per user.** Each user has a single connected account per end-user credential.
* **Supported triggers.** End-user credential resolution works with the manual trigger, [Chat Hub](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/chat-hub), and the MCP Server Trigger.

{% hint style="info" %}
**Webhooks**

Webhook triggers can also run workflows on behalf of an external user, but this works differently. It relies on a custom implementation and some setup outside of n8n: your external application sends an access token that identifies the user, which n8n uses to resolve their credentials, rather than the connect flow described here. This is still supported, but n8n is updating the approach to fit the new end-user credential model.
{% endhint %}

## Create an end-user credential

1. Create a credential as usual, or open an existing one you want to change.
2. Under **Credential type**, select **End-user credential**.
3. Configure the connection. For OAuth credentials, this includes the **Client ID** and **Client Secret** for the OAuth app, and the **OAuth Redirect URL** to register with the service.
4. Select **Save**.

The credential is now an end-user credential. Users with access to the project can connect their own account against it.

## Connect your account

Before you can use an end-user credential in a workflow, connect your own account against the end-user credential blueprint. You can do this from a few places:

* **From a node**: when you open a node that uses an end-user credential, it shows whether you've connected your account. If you haven't, select **Connect** there.
* **From the credential**: open the end-user credential and connect your account in the credential modal.
* **From the credentials list**: in a project's **Credentials** list, the end-user credential's card has a **Connect** option.

Whichever route you take, you complete the OAuth flow for your account. Once connected, the node shows your account, for example **Connected as you@example.com**.

Your connection is private to you. Other users connect their own accounts against the same end-user credential and never use yours.

## Execution data and privacy

When a workflow execution uses an end-user credential, the execution is still visible to anyone with access to that workflow's executions. What changes is who can see the data inside it.

Everyone with workflow access can see that the execution happened, which workflow ran, and that it used an end-user credential. Only the credential owner can see the input and output data for nodes that used their connected account, including the data returned from the connected service. For anyone else, including instance admins, those nodes show redacted output.

### Admin visibility

Admin access follows a principle of visibility without access.

An admin can see that an end-user credential (the blueprint) exists and that it has connections attached. For example, when deleting an end-user credential, an admin sees how many user connections are attached to it. That count is all they see: they can't view anything about the individual connections, view a connection's stored tokens, use anyone's connected account in their own workflows, or see the redacted output of executions that ran on someone else's connection.

Sharing works the same as any credential, but it only ever shares the end-user credential itself. An admin can share it into other projects or with other users, and each recipient connects their own account. Sharing never shares a user's connected account with anyone.

{% hint style="warning" %}
**Deleting an end-user credential removes every connection**

Deleting the top-level end-user credential deletes the whole credential, including every user's connection to it, not just your own. Any workflow that relies on it stops resolving for those users until the credential is set up again and they reconnect. n8n warns you before you delete an end-user credential that has connections attached.
{% endhint %}

## Share end-user credentials across projects

You can share an end-user credential into other projects using the standard [credential sharing](share-credentials-securely.md) mechanism. Sharing shares the end-user credential, not a connection: users in the other project see an option to connect their own account, they don't get the original owner's connection.

A good practice is to create your end-user credentials, for example Gmail, Linear, Jira, and Google Sheets, in a single project, then share them into the other projects that need them. Each project gets a connect option for the same end-user credential, and every user connects once.

## Related resources

* [Create and edit credentials](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-edit-credentials)
* [Share credentials securely](share-credentials-securely.md)
* [RBAC role types](../manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md)
