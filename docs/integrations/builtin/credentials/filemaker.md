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

- Create a user account on a [FileMaker Server](https://www.claris.com/filemaker/){:target=_blank .external-link} with the `fmrest` extended privilege to [Access the FileMaker Data API](https://help.claris.com/en/data-api-guide/content/enable-access.html){:target=_blank .external-link}.
- Ensure the FileMaker Server can use the [FileMaker Data API](https://help.claris.com/en/data-api-guide/content/index.html){:target=_blank .external-link}:
    1. Prepare your database for FileMaker Data API access using FileMaker Pro. You can create a database or prepare an existing database.
        - Refer to [Prepare databases for FileMaker Data API access](https://help.claris.com/en/data-api-guide/content/prepare-databases-for-access.html){:target=_blank .external-link} for more information.
    1. Write code that calls FileMaker Data API methods to find, create, edit, duplicate, and delete records in a hosted database.
        - Refer to [Write FileMaker Data API calls](https://help.claris.com/en/data-api-guide/content/write-data-api-calls.html){:target=_blank .external-link} for more information.
    1. Host your solution with FileMaker Data API access enabled.
        - Refer to [Host a FileMaker Data API solution](https://help.claris.com/en/data-api-guide/content/host-data-api-app.html){:target=_blank .external-link} for more information.
    1. Test that FileMaker Data API access is working.
        - Refer to [Test the FileMaker Data API solution](https://help.claris.com/en/data-api-guide/content/test-data-api-app.html){:target=_blank .external-link} for more information.
    1. Monitor your hosted solution using Admin Console.
        - Refer to [Monitor FileMaker Data API solutions](https://help.claris.com/en/data-api-guide/content/monitor-data-api-app.html){:target=_blank .external-link} for more information.

## Supported authentication methods

- Database connection

## Related resources

Refer to [FileMaker's Data API Guide](https://help.claris.com/en/data-api-guide/content/index.html){:target=_blank .external-link} for more information about the service.

## Using database connection

To configure this credential:

1. Enter the **Host** name or IP address of your FileMaker Server.
2. Enter the **Database** name. This should match the database name as it appears in the **Databases** list within FileMaker.
3. Enter the user account **Login** for the account with the `fmrest` extended privilege. Refer to the previous [Prerequisites](#prerequisites) section for more information.
4. Enter the **Password** for that user account.

