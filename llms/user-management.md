

# user-management/account-types.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n account types
contentType: reference
---

# Account types

There are three account types: owner, admin, and member. The account type affects the user permissions and access.

/// info | Feature availability
To use admin accounts, you need a pro or enterprise plan.
///

/// note | Account types and role types
Account types and role types are different things. Role types are part of [RBAC](/user-management/rbac/index.md). 

Every account has one type. The account can have different [role types](/user-management/rbac/role-types.md) for different [projects](/user-management/rbac/projects.md).
///

/// note | Create a member-level account for the owner
n8n recommends that owners create a member-level account for themselves. Owners can see and edit all workflows, credentials, and projects. However, there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
///


| Permission | Owner | Admin | Member |
| ---------- |------ | ----- | ------ |
| Manage own email and password | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Manage own workflows | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| View, create, and use tags | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Delete tags | :white_check_mark: | :white_check_mark: | :x: |
| View and share all workflows | :white_check_mark: | :white_check_mark: | :x: |
| View, edit, and share all credentials | :white_check_mark: | :white_check_mark: | :x: |
| Set up and use [Source control](/source-control-environments/index.md) | :white_check_mark: | :white_check_mark: | :x: |
| Create [projects](/user-management/rbac/projects.md) | :white_check_mark: | :white_check_mark: | :x: |
| View all projects | :white_check_mark: | :white_check_mark: | :x: |
| Add and remove users | :white_check_mark: | :white_check_mark: | :x: |
| Access the Cloud dashboard | :white_check_mark: | :x: | :x: |




# user-management/best-practices.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: User management best practices.
contentType: explanation
---

# Best practices for user management

This page contains advice on best practices relating to user management in n8n.

## All platforms

* n8n recommends that owners create a member-level account for themselves. Owners can see all workflows, but there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
* Users must be careful not to edit the same workflow simultaneously. It's possible to do it, but the users will overwrite each other's changes.
* To move workflows between accounts, export the workflow as JSON, then import it to the new account. Note that this action loses the workflow history.
* Webhook paths must be unique across the entire instance. This means each webhook path must be unique for all workflows and all users. By default, n8n generates a long random value for the webhook path, but users can edit this to their own custom path. If two users set the same path value:
    * The path works for the first workflow that's run or activated.
    * Other workflows will error if they try to run with the same path.

## Self-hosted

If you run n8n behind a reverse proxy, set the following environment variables so that n8n generates emails with the correct URL:

* `N8N_HOST`
* `N8N_PORT`
* `N8N_PROTOCOL`
* `N8N_EDITOR_BASE_URL`  

More information on these variables is available in [Environment variables](/hosting/configuration/environment-variables/index.md).



# user-management/cloud-setup.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Set up user management on n8n Cloud
contentType: howto
---

# Set up user management on n8n Cloud

To access user management, upgrade to version 0.195.0 or newer.

/// warning | Irreversible upgrade
Once you upgrade your Cloud instance to an n8n version with user management, you can't downgrade your version.
///

## Step one: In-app setup

--8<-- "_snippets/user-management/in-app-setup.md"

## Step two: Invite users

--8<-- "_snippets/user-management/invite-users.md"


# user-management/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: User management in n8n
contentType: overview
---

# User management

User management in n8n allows you to invite people to work in your n8n instance. It includes:

* Login and password management
* Adding and removing users
* Three [account types](/user-management/account-types.md): **Owner** and **Member** (and **Admin** for Pro & Enterprise plans)

/// note | Privacy
The user management feature doesn't send personal information, such as email or username, to n8n.
///
## Setup guides
<!-- vale off -->
This section contains most usage information for user management, and the [Cloud setup guide](/user-management/cloud-setup.md). If you self-host n8n, there are extra steps to configure your n8n instance. Refer to the [Self-hosted guide](/hosting/configuration/user-management-self-hosted.md).
<!-- vale on -->
This section includes guides to configuring [LDAP](/user-management/ldap.md) and [SAML](/user-management/saml/index.md) in n8n.


# user-management/ldap.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Using LDAP with n8n.
contentType: howto
---

# Lightweight Directory Access Protocol (LDAP)

/// info | Feature availability
* Available on Self-hosted Enterprise and Cloud Enterprise plans.
* You need access to the n8n instance owner account.
///

This page tells you how to enable LDAP in n8n. It assumes you're familiar with LDAP, and have an existing LDAP server set up.

LDAP allows users to sign in to n8n with their organization credentials, instead of an n8n login.

## Enable LDAP

1. Log in to n8n as the instance owner.
2. Select **Settings** <span class="inline-image">![Settings icon](/_images/common-icons/settings.png){.off-glb}</span> > **LDAP**.
3. Toggle on **Enable LDAP Login**.
4. Complete the fields with details from your LDAP server.
5. Select **Test connection** to check your connection setup, or **Save connection** to create the connection.

After enabling LDAP, anyone on your LDAP server can sign in to the n8n instance, unless you exclude them using the **User Filter** setting.

You can still create non-LDAP users (email users) on the **Settings** > **Users** page.

## Merging n8n and LDAP accounts

If n8n finds matching accounts (matching emails) for email users and LDAP users, the user must sign in with their LDAP account. n8n instance owner accounts are excluded from this: n8n never converts owner accounts to LDAP users.

## LDAP user accounts in n8n

On first sign in, n8n creates a user account in n8n for the LDAP user.

You must manage user details on the LDAP server, not in n8n. If you update or delete a user on your LDAP server, the n8n account updates at the next scheduled sync, or when the user next tries to log in, whichever happens first.

/// note | User deletion
If you remove a user from your LDAP server, they lose n8n access on the next sync.
///
## Turn LDAP off

To turn LDAP off:

1. Log in to n8n as the instance owner.
2. Select **Settings** <span class="inline-image">![Settings icon](/_images/common-icons/settings.png){.off-glb}</span> > **LDAP**.
3. Toggle off **Enable LDAP Login**.

If you turn LDAP off, n8n converts existing LDAP users to email users on their next login. The users must reset their password.


# user-management/manage-users.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Manage users

The **Settings** > **Users** page shows all users, including ones with pending invitations.

## Delete a user

1. Select the menu icon by the user you want to delete.
2. Confirm you want to delete them.
3. If they're an active user, choose whether to copy their workflow data and credentials to a new user, or permanently delete their workflows and credentials.

## Resend an invitation to a pending user

Click the menu icon by the user, then click **Resend invite**.


# user-management/rbac/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
title: Role-based access control (RBAC)
description: Set up and use role-based access control (RBAC) in n8n.
---

# Role-based access control (RBAC)

/// info | Feature availability
RBAC is available on all plans except the Community edition. Different plans have different numbers of projects and roles. Refer to n8n's [pricing page](https://n8n.io/pricing/){:target=_blank .external-link} for plan details.
///

/// note | Role types and account types
Role types and [account types](/user-management/account-types.md) are different things. Every account has one type. The account can have different role types for different [projects](/user-management/rbac/projects.md).
///

RBAC is a way of managing access to workflows and [credentials](/glossary.md#credential-n8n) based on user roles and projects. You group workflows into projects, and user access depends on the user's project role. This section provides guidance on using RBAC in n8n.

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]







# user-management/rbac/projects.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: RBAC projects
description: Understand how n8n uses project for RBAC. Learn how to create and manage projects.
contentType: howto
---

/// info | Feature availability
RBAC is available on all plans except the Community edition. Different plans have different numbers of projects and roles. Refer to n8n's [pricing page](https://n8n.io/pricing/){:target=_blank .external-link} for plan details.
///

n8n uses projects to group workflows and [credentials](/glossary.md#credential-n8n), and assigns [roles](/user-management/rbac/role-types.md) to users in each project. This means that a single user can have different roles in different projects, giving them different levels of access.

## Create a project

Instance owners and instance admins can create projects.

To create a project:

1. Select <span class="inline-image">![Plus icon](/_images/common-icons/plus.png)</span> **Add project**.
1. Fill out the project settings.
1. Select **Save**.

## Add and remove users in a project

Project admins can add and remove users.

To add a user to a project:

1. Select the project.
1. Select **Project settings**.
1. Under **Project members**, browse for users or search by username or email address.
1. Select the user you want to add.
1. Check the [role type](/user-management/rbac/role-types.md) and change it if needed.
1. Select **Save**.

To remove a user from a project:

1. Select the project.
1. Select **Project settings**.
1. In the role type dropdown for the user you want to remove, select **Remove access**.
1. Select **Save**.

## Delete a project

To delete a project:

1. Select the project.
1. Select **Project settings**.
1. Select **Delete project**.
1. Choose what to do with the workflows and credentials. You can select:
	* **Transfer its workflows and credentials to another project**: n8n prompts you to choose a project to move the data to.
	* **Delete its workflows and credentials**: n8n prompts you to confirm that you want to delete all the data in the project.

## Move workflows and credentials between projects or users

Workflow and credential owners can move workflows or credentials (changing ownership) to other users or projects they have access to.

/// warning | Moving revokes sharing
Moving workflows or credentials removes all existing sharing. Be aware that this could impact other workflows currently sharing these resources.
///

1. Select **Workflow menu** <span class="inline-image">![Workflow menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> or **Credential menu** <span class="inline-image">![Workflow menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> > **Move**.

	/// info | Moving workflows with credentials
	When moving a workflow with credentials you have permission to share, you can choose to share the credentials as well. This ensures that the workflow continues to have access to the credentials it needs to execute. n8n will note any credentials that can't be moved (credentials you don't have permission to share).
	///

1. Select the project or user you want to move to.
1. Select **Next**.
1. Confirm you understand the impact of the move: workflows may stop working if the credentials they need aren't available in the target project, and n8n removes any current individual sharing.
1. Select **Confirm move to new project**.

## Using external secrets in projects

To use [external secrets](/external-secrets.md) in a project, you must have an [instance owner or instance admin](/user-management/account-types.md) as a member of the project.


# user-management/rbac/role-types.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: RBAC role types
description: Understand the RBAC roles available in n8n, and the access they have.
contentType: reference
---

# RBAC role types

/// info | Feature availability
* The Project Editor role is available on Pro Cloud and Self-hosted Enterprise plans. 
* The Project Viewer role is only available on Self-hosted Enterprise and Cloud Enterprise plans.
///

Within projects, there are three user roles: Admin, Editor, and Viewer. These roles control what the user can do in a project. A user can have different roles within different projects.

## Project Admin

A Project Admin role has the highest level of permissions. Project admins can:

* Manage project settings: Change name, delete project.
* Manage project members: Invite members and remove members, change members' roles.
* View, create, update, and delete any workflows, credentials, or executions within a project. 

## Project Editor

A Project Editor can view, create, update, and delete any workflows, credentials, or executions within a project. 

## Project Viewer

A Project Viewer is effectively a `read-only` role with access to all workflows, credentials, and executions within a project.

Viewers aren't able to manually execute any workflows that exist in a project. 

/// note | Role types and account types
Role types and [account types](/user-management/account-types.md) are different things. Every account has one type. The account can have different role types for different [projects](/user-management/rbac/projects.md).
///

| Permission | Admin | Editor | Viewer | 
| ---------- |------ | ------ | ------ | 
| View workflows in the project | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| View credentials in the project | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| View executions | :white_check_mark: | :white_check_mark: | :white_check_mark: | 
| Edit credentials and workflows | :white_check_mark: | :white_check_mark: | :x: | 
| Add workflows and credentials | :white_check_mark: | :white_check_mark: | :x: | 
| Execute workflows | :white_check_mark: | :white_check_mark: | :x: | 
| Manage members | :white_check_mark: | :x: | :x: | 
| Modify the project | :white_check_mark: | :x: | :x: | 

[Variables](/code/variables.md) and [tags](/workflows/tags.md) aren't affected by RBAC: they're global across the n8n instance.


# user-management/saml/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Security Assertion Markup Language (SAML)

--8<-- "_snippets/user-management/saml-overview.md"


# user-management/saml/managing.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Manage users with SAML
description: How to manage users and user logins with SAML enabled.
contentType: howto
---

# Manage users with SAML

There are some user management tasks that are affected by SAML.

## Exempt users from SAML

You can allow users to log in without using SAML. To do this:

1. Go to **Settings** > **Users**.
2. Select the menu icon by the user you want to exempt from SAML.
3. Select **Allow Manual Login**.

## Deleting users

If you remove a user from your IdP, they remain logged in to n8n. You need to manually remove them from n8n as well. Refer to [Manage users](/user-management/manage-users.md) for guidance on deleting users.


# user-management/saml/okta.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Okta Workforce Identity SAML setup
description: Use Okta Workforce Identity with n8n.
contentType: tutorial
---

# Okta Workforce Identity SAML setup

Set up SAML SSO in n8n with Okta.

/// note | Workforce Identity and Customer Identity
This guide covers setting up Workforce Identity. This is the original Okta product. Customer Identity is Okta's name for Auth0, which they've acquired.
///
## Prerequisites

You need an Okta Workforce Identity account, and the redirect URL and entity ID from n8n's SAML settings.

Okta Workforce may enforce two factor authentication for users, depending on your Okta configuration.

Read the [Set up SAML](/user-management/saml/setup.md) guide first.

## Setup

1. In your Okta admin panel, select **Applications** > **Applications**.
1. Select **Create App Integration**. Okta opens the app creation modal.
1. Select **SAML 2.0**, then select **Next**.
1. On the **General Settings** tab, enter `n8n` as the **App name**. 
1. Select **Next** .
1. On the **Configure SAML** tab, complete the following **General** fields:
	* **Single sign-on URL**: the **Redirect URL** from n8n.
	* **Audience URI (SP Entity ID)**: the **Entity ID** from n8n.
	* **Default RelayState**: leave this empty.
	* **Name ID format**: `EmailAddress`.
	* **Application username**: `Okta username`.
	* **Update application username on**: `Create and update`.
1. Create **Attribute Statements**:
	
	| **Name** | **Name format** | **Value** |
	| -------- | --------------- | --------- |
	| http://schemas.xmlsoap.org/ws/2005/05/identity/claims/firstname | URI Reference | user.firstName |
	| http://schemas.xmlsoap.org/ws/2005/05/identity/claims/lastname | URI Reference | user.lastName |
	| http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn | URI Reference | user.login |
	| http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress | URI Reference | user.email |
	
1. Select **Next**. Okta may prompt you to complete a marketing form, or may take you directly to your new n8n Okta app.
1. Assign the n8n app to people:
	1. On the n8n app dashboard in Okta, select **Assignments**.
	1. Select **Assign** > **Assign to People**. Okta displays a modal with a list of available people.
	1. Select **Assign** next to the person you want to add. Okta displays a prompt to confirm the username.
	1. Leave the username as email address. Select **Save and Go Back**.
	1. Select **Done**.
1. Get the metadata XML: on the **Sign On** tab, copy the Metadata URL. Navigate to it, and copy the XML. Paste this into **Identity Provider Settings** in n8n.
1. Select **Save settings**.
1. Select **Test settings**. n8n opens a new tab. If you're not currently logged in, Okta prompts you to sign in. n8n then displays a success message confirming the attributes returned by Okta.



# user-management/saml/setup.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set up SAML
description: Generic setup instructions for using SAML SSO with n8n.
contentType: howto
---

# Set up SAML

/// info | Feature availability
* Available on Enterprise plans.
* You need access to the n8n instance owner account to enable and configure SAML

Available from version 0.225.0.
///	

This page tells you how to enable SAML SSO (single sign-on) in n8n. It assumes you're familiar with SAML. If you're not, [SAML Explained in Plain English](https://www.onelogin.com/learn/saml){:target=_blank .external-link} can help you understand how SAML works, and its benefits.

## Enable SAML

1. In n8n, go to **Settings** > **SSO**.
1. Make a note of the n8n **Redirect URL** and **Entity ID**.
	1. **Optional**: if your IdP allows you to set up SAML from imported metadata, navigate to the **Entity ID** URL and save the XML. 
	2. **Optional**: if you are running n8n behind a load balancer make sure you have `N8N_EDITOR_BASE_URL` configured. 
1. Set up SAML with your IdP (identity provider). You need the redirect URL and entity ID. You may also need an email address and name for the IdP user.
1. After completing setup in your IdP, load the metadata XML into n8n. You can use a metadata URL or raw XML:
	1. **Metadata URL**: Copy the metadata URL from your IdP into the **Identity Provider Settings** field in n8n.
	1. **Raw XML**: Download the metadata XML from your IdP, toggle **Identiy Provider Settings** to **XML**, then copy the raw XML into **Identity Provider Settings**.
1. Select **Save settings**.
1. Select **Test settings** to check your SAML setup is working.
1. Set SAML 2.0 to **Activated**.

/// note | SAML Request Type
Please note, n8n currently doesn't support `POST` binding. Please configure your IdP to use `HTTP` request binding instead. 
///

## Generic IdP setup

The steps to configure the IdP vary depending on your chosen IdP. These are some common setup tasks:

* Create an app for n8n in your IdP.
* Map n8n attributes to IdP attributes:

	| Name | Name format | Value (IdP side) |
	| ---- | ----------- | ---------------- |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` | URI Reference | User email       |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/firstname`    | URI Reference | User First Name  |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/lastname`     | URI Reference | User Last Name   |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn`          | URI Reference | User Email       |

## Setup resources for common IdPs

Documentation links for common IdPs.

| IdP | Documentation |
| --- | ------------- |
| Auth0 | [Configure Auth0 as SAML Identity Provider: Manually configure SSO integrations](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider#manually-configure-sso-integrations){:target=_blank .external-link} |
| Authentik | [Applications](https://goauthentik.io/docs/applications){:target=_blank .external-link} and the [SAML Provider](https://goauthentik.io/docs/providers/saml/){:target=_blank .external-link} |
| Azure AD | [SAML authentication with Azure Active Directory](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml){:target=_blank .external-link} |
| JumpCloud | [How to setup SAML (SSO) applications with JumpCloud](https://jumpcloud.com/support/integrate-with-zoom#configuring-the-sso-integration){:target=_blank .external-link} (using `Zoom` as an example) |
| Keycloak | Choose a [Getting Started](https://www.keycloak.org/guides#getting-started){:target=_blank .external-link} guide depending on your hosting. |
| Okta | n8n provides a [Workforce Identity setup guide](/user-management/saml/okta.md) |
| PingIdentity | [PingOne SSO](https://docs.pingidentity.com/pingone/getting_started_with_pingone/p1_p1sso_start.html){:target=_blank .external-link} |



# user-management/saml/troubleshooting.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Troubleshooting SAML SSO
description: A list of things to check if you encounter issues with SAML.
contentType: howto
---

# Troubleshooting SAML SSO

If you get an error when testing your SAML setup, check the following:

* Does the app you created in your IdP support SAML?
* Did you enter the n8n redirect URL and entity ID in the correct fields in your IdP?
* Is the metadata XML correct? Check that the metadata you copied into n8n is formatted correctly.

For more support, use the [forum](https://community.n8n.io/){:target=_blank .external-link}, or contact your support representative if you have a paid support plan.


# user-management/two-factor-auth.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to enable 2FA for your n8n account
contentType: howto
---

# Two-factor authentication (2FA)

Two-factor authentication (2FA) adds a second authentication method on top of username and password. This increases account security. n8n supports 2FA using an authenticator app.

## Enable 2FA

You need an authenticator app on your phone.

To enable 2FA in n8n:

1. Go to you **Settings** > **Personal**.
2. Select **Enable 2FA**. n8n opens a modal with a QR code.
3. Scan the QR code in your authenticator app.
4. Enter the code from your app in **Code from authenticator app**.
5. Select **Continue**. n8n displays recovery codes.
6. Save the recovery codes. You need these to regain access to your account if you lose your authenticator.

## Disable 2FA for your instance

Self-hosted users can configure their n8n instance to disable 2FA for all users by setting `N8N_MFA_ENABLED` to false. Note that n8n ignores this if existing users have 2FA enabled. Refer to [Configuration methods](/hosting/configuration/configuration-methods.md) for more information on configuring your n8n instance with environment variables.
