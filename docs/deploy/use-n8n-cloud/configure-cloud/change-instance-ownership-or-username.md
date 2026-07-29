---
title: Change Instance Ownership or Username
Description: Change instance ownership or username.
contentType: howto
nodeTitle: Change instance ownership or username
originalFilePath: manage-cloud/change-ownership-or-username.md
originalUrl: 'https://docs.n8n.io/manage-cloud/change-ownership-or-username'
url: >-
  https://docs.n8n.io/deploy/use-n8n-cloud/configure-cloud/change-instance-ownership-or-username
layout:
  description:
    visible: false
---

## Change instance ownership <a href="#change-instance-ownership" id="change-instance-ownership"></a>

You can change the ownership of an instance by navigating to the **Settings > Personal** page in the owner's account and editing the **Email** field. After making the changes, scroll down and press **Save**.
Note that for the change to be effective, the new email address must not be associated with any other n8n account, as each instance can have only one **unique owner email**. If the intended email is already linked to an existing user, change or delete that user first so the email becomes available.

Changing emails will change the owner of the instance, the email you log in with, and the email your invoices and general communication gets sent to.

If the workspace is deactivated, there will be no **Settings** page and no possibility to change the email address or the owner info.

## Change instance username <a href="#change-instance-username" id="change-instance-username"></a>

It's not currently possible to change usernames.

If you want your instance to have a different name you will need to create a new account and transfer your work into it. [The import/export documentation](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/export-and-import) explains how you can transfer your work to a new n8n instance.
