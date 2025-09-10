---
title: Box Trigger node documentation
description: Learn how to use the Box Trigger node in n8n. Follow technical documentation to integrate Box Trigger node into your workflows.
contentType: [integration, reference]
---

# Box Trigger node

[Box](https://www.box.com/) is a cloud computing company which provides file sharing, collaborating, and other tools for working with files uploaded to its servers.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/box.md).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Box Trigger integrations](https://n8n.io/integrations/box-trigger/) page.
///

## Find your Box Target ID

To get your Target ID in Box:

1. Open the file/folder that you would like to monitor.
2. Copy the string of characters after `folder/` in your URL. This is the target ID. For example, if the URL is `https://app.box.com/folder/12345`, then `12345` is the target ID.
3. Paste it in the **Target ID** field in n8n.

