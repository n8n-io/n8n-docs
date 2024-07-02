---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Box trigger
description: Documentation for the Box trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Box trigger

[Box](https://www.box.com/) is a cloud computing company which provides file sharing, collaborating, and other tools for working with files that are uploaded to its servers.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/box/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Box Trigger integrations](https://n8n.io/integrations/box-trigger/){:target=_blank .external-link} page.
///

## FAQs

### How do I find my Target ID in Box?
1. Open the file/folder that you would like to monitor.
2. Copy the string of characters after `folder/` in your URL. This is the target ID. For example, if the URL is `https://app.box.com/folder/12345`, then `12345` is the target ID.
3. Paste it in the *Target ID* field in n8n.

