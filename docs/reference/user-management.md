# User management

User management in n8n allows you to invite people to work in your n8n instance. It includes:

* Login and password management
* Support for adding and removing users
* Two account types: owner and member

User management is available for self-hosted n8n. It isn't currently available for Cloud.

## Setup

There are three stages to set up user management in n8n:

1. Configure your n8n instance to use your SMTP server.
2. Start n8n and follow the setup steps in the app.
3. Invite users

### Step one: SMTP

You need an SMTP server for user management, in order to send invites and password resets. Make sure you have the following information from your SMTP provider:

* Server name
* Port
* SMTP username
* SMTP password
* SMTP sender name

To set up SMTP with n8n, configure the follwing environment variables for your n8n instance:

| Variable | Type | Description |
| -------- | ---- | ----------- |
| `N8N_SMTP_EMAIL_MODE` | string | smtp |
| `N8N_SMTP_HOST` | string | _your_server_name_:_your_smtp_port_ |
| `N8N_SMTP_USER` | string | _your_smtp_username_ |
| `N8N_SMTP_PASSWORD` | string | _your_smtp_password_ |
| `N8N_SMTP_SENDER` | string | _your_smtp_sender_name_ |

If your n8n instance is already running, you need to restart it to enable SMTP.

::: tip New to SMTP?
If you're not familiar with SMTP, this [blog post by SendGrid](https://sendgrid.com/blog/what-is-an-smtp-server/) offers a short introduction, while [Wikipedia's Simple Mail Transfer Protocol article](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) provides more detailed information.
:::

### Step two: in-app setup

When you set up user management for the first time, you create an owner account.

1. Open n8n. The app displays a signup screen.
2. Enter your details. Your password must be at least eight characters, including at least one number and one capital letter.
3. Click **Next**. n8n logs you in with your new owner account.

### Step three: invite users

You can now invite other people to your n8n instance. 

1. Sign in with your owner account.
2. Click your user icon. This is a round icon with your initials in.
3. Click **Settings**. n8n opens your **Personal settings** page.
4. Click **Users** to go to the **Users** page.
5. Click **Invite**.

## Account types

There are two account types, owner and member. The account type affects the user permissions and access.

* Owner: this is the account that set up user management. There is one owner account for each n8n instance. You can't transfer ownership. 
  The owner can:
    * Add and remove users
    * See all workflows
    * Delete tags
* Members: normal n8n users. 
  Members can:
    * See all workflow tags, create new tags, and assign tags to their workflows. Members can't delete tags.
    * Change their own password.
    * See their own workflows.

::: tip Create a member-level account for the owner
We recommend that owners create a member-level account for themselves. Owners can see all workflows, but there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
:::

## Skipping or disabling user management

You don't have to use n8n's user management feature. You can:

* Leave it enabled, but choose to skip the setup step. You can use n8n as normal. If you want to set up user management later, go to **Settings** > **Users**.
* Disable the feature completely using the `N8N_USER_MANAGEMENT_DISABLED` environment variable. Setting this environment variable to `true` completely hides the feature in your n8n instance.