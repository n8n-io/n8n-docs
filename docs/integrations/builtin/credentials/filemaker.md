---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: FileMaker credentials
description: Documentation for FileMaker credentials. Use these credentials to authenticate FileMaker in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# FileMaker credentials

You can use these credentials to authenticate the following nodes:

- [FileMaker](/integrations/builtin/app-nodes/n8n-nodes-base.filemaker/)

## Prerequisites

- Create a user account on a [FileMaker Server](https://www.claris.com/filemaker/){:target=_blank .external-link} with the `fmrest` extended privilege to [Access via FileMaker Data API](https://help.claris.com/en/data-api-guide/content/enable-access.html){:target=_blank .external-link}.
- Ensure the FileMaker Server can use the [FileMaker Data API](https://help.claris.com/en/data-api-guide/content/index.html){:target=_blank .external-link}.

## Supported authentication methods

- Database connection

## Related resources

Refer to [Filemaker's Data API Guide](https://help.claris.com/en/data-api-guide/content/index.html){:target=_blank .external-link} for more information about the service.

## Using database connection

To configure this credential, you'll need:

- A **Host**: The IP address or host name of your FileMaker Server.
- A **Database**: The database name as it appears in the **Databases** list within Filemaker.
- The **Login** for the account with the `fmrest` extended privilege.
- The **Password** for the account with the `fmrest` extended privilege.

