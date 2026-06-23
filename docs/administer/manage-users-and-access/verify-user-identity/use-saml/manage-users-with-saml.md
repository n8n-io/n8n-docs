---
title: Manage users with SAML
description: How to manage users and user logins with SAML enabled.
contentType: howto
nodeTitle: Manage users with SAML
originalFilePath: user-management/saml/managing.md
originalUrl: 'https://docs.n8n.io/user-management/saml/managing'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/manage-users-with-saml
layout:
  description:
    visible: false
---

# Manage users with SAML <a href="#manage-users-with-saml" id="manage-users-with-saml"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/J0OeWX5WGkynzzMq197K/" %}

There are some user management tasks that are affected by SAML.

## Exempt users from SAML <a href="#exempt-users-from-saml" id="exempt-users-from-saml"></a>

You can allow users to log in without using SAML. To do this:

1. Go to **Settings** > **Users**.
2. Select the menu icon by the user you want to exempt from SAML.
3. Select **Allow Manual Login**.

## Deleting users <a href="#deleting-users" id="deleting-users"></a>

If you remove a user from your IdP, they remain logged in to n8n. You need to manually remove them from n8n as well. Refer to [Manage users](../../add-and-remove-users.md) for guidance on deleting users.
