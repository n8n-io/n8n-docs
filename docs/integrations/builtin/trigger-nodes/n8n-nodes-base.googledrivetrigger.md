---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Drive trigger
description: Documentation for the Google Drive trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: medium
---

# Google Drive trigger

[Google Drive](https://drive.google.com) is a file storage and synchronization service developed by Google. It allows users to store files on their servers, synchronize files across devices, and share files.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/google/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Google Drive Trigger integrations](https://n8n.io/integrations/google-drive-trigger/){:target=_blank .external-link} page.
///

/// note | Manual Executions vs. Activation
On manual executions this node will return the last event matching its search criteria. If no event matches the criteria (for example because you are watching for files to be created but no files have been created so far), an error is thrown. Once saved and activated, the node will regularly check for any matching events and will trigger your workflow for each event found.
///
