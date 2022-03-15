# User management

User management in n8n allows you to invite people to work in your n8n instance. It includes:

* Login and password management
* Adding and removing users
* Two account types: owner and member

User management is available for self-hosted n8n. It isn't currently available for Cloud or Desktop.

::: tip Privacy
The user management feature doesn't send personal information, such as email or username, to n8n.
:::

::: warning Breaking change for API users
Upgrading to any n8n version that includes user management will cause calls to the frontend API to break.
:::

## Account types

There are two account types, owner and member. The account type affects the user permissions and access.

* Owner: this is the account that set up user management. There is one owner account for each n8n instance. You can't transfer ownership.
  The owner can:
    * Add and remove users
    * See all workflows
    * Delete tags
* Members: these are normal n8n users.
  Members can:
    * See all workflow tags, create new tags, and assign tags to their workflows. Members can't delete tags.
    * Change their own password.
    * See their own workflows.

::: tip Create a member-level account for the owner
We recommend that owners create a member-level account for themselves. Owners can see all workflows, but there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
:::

## Setup

There are three stages to set up user management in n8n:

1. Configure your n8n instance to use your SMTP server.
2. Start n8n and follow the setup steps in the app.
3. Invite users.

### Step one: SMTP

You need an SMTP server for user management to send invites and password resets. Get the following information from your SMTP provider:

* Server name
* SMTP username
* SMTP password
* SMTP sender name

To set up SMTP with n8n, configure the SMTP environment variables for your n8n instance. For information on how to set environment variables, refer to [Configuration](../getting-started/installation/advanced/configuration.md)

| Variable | Type | Value |
| -------- | ---- | ----- |
| `N8N_EMAIL_MODE` | string | smtp |
| `N8N_SMTP_HOST` | string | _your_server_name_ |
| `N8N_SMTP_USER` | string | _your_smtp_username_ |
| `N8N_SMTP_PASS` | string | _your_smtp_password_ |
| `N8N_SMTP_SENDER` | string | _your_smtp_sender_name_ |

If your n8n instance is already running, you need to restart it to enable the new SMTP settings.

::: tip More configuration options
There are more configuration options available as environment variables. Refer to [Environment variables](environment-variables.md) for a list. These include options to disable tags, workflow templates, and the personalization survey, if you don't want your users to see them.
:::

::: tip New to SMTP?
If you're not familiar with SMTP, this [blog post by SendGrid](https://sendgrid.com/blog/what-is-an-smtp-server/) offers a short introduction, while [Wikipedia's Simple Mail Transfer Protocol article](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) provides more detailed technical background.
:::

### Step two: in-app setup

When you set up user management for the first time, you create an owner account.

1. Open n8n. The app displays a signup screen.
2. Enter your details. Your password must be at least eight characters, including at least one number and one capital letter.
3. Click **Next**. n8n logs you in with your new owner account.

### Step three: invite users

You can now invite other people to your n8n instance.

1. Sign in with your owner account.
2. Click your user icon > **Settings**. n8n opens your **Personal settings** page.
3. Click **Users** to go to the **Users** page.
4. Click **Invite**.
5. Enter the new user's email address.
6. Click **Invite user**. n8n sends an email with a link for the new user to join.

## Manage users

The **Users** page shows all users, including ones with pending invitations. You can:

* Delete a user:
  1. Click the menu icon by the user you want to delete.
  2. Confirm you want to delete them.
  3. If they are an active user, choose whether to copy their workflow data and credentials to a new user, or permanently delete their workflows and credentials.
* Resend an invitation to a pending user: click the menu icon by the user, then click **Resend invite**.


## Skipping or disabling user management

You don't have to use n8n's user management feature. You can:

* Leave it enabled, but choose to skip the setup step. You can use n8n as normal. If you want to set up user management later, go to **Settings** > **Users**.
* Disable the feature completely using the `N8N_USER_MANAGEMENT_DISABLED` environment variable. Setting this environment variable to `true` completely hides the feature in your n8n instance. You can't use this setting if you have already set up an owner account.

## Best practices

This sections contains advice on best practices relating to user management in n8n.

* We recommend that owners create a member-level account for themselves. Owners can see all workflows, but there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
* Users must be careful not to edit the same workflow simultaneously. It is possible to do it, but the users will overwrite each other's changes.
* To move workflows between accounts, export the workflow as JSON, then import it to the new account. Note that this action loses the workflow history.
* Webhook paths must be unique across the entire instance. This means each webhook path must be unique for all workflows and all users. By default, n8n generates a long random value for the webhook path, but users can edit this to their own custom path. If two users set the same path value:
    * The path works for the first workflow that is run or activated.
    * Other workflows will error if they try to run with the same path.
* If you run n8n behind a reverse proxy, set the following environment variables so that emails are generated with the correct URL:
  * `N8N_HOST`
  * `N8N_PORT`
  * `N8N_PROTOCOL`
  * `N8N_EDITOR_BASE_URL`
  More information on these variables is available in [Environment variables](environment-variables.md).
* You can't use n8n's user management with basic auth. If your n8n instance currently uses basic auth to authenticate the user, you must remove this before setting up user management.
