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

If you remove a user from your IdP, they remain logged in to n8n. You need to manually remove them from n8n as well. Refer to [Manage users](/user-management/manage-users/) for guidance on deleting users.
