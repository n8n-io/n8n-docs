---
title: Google Drive Trigger node documentation
description: Learn how to use the Google Drive Trigger node in n8n. Follow technical documentation to integrate Google Drive Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Google Drive Trigger node

[Google Drive](https://drive.google.com) is a file storage and synchronization service developed by Google. It allows users to store files on their servers, synchronize files across devices, and share files.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/google/index.md).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Google Drive Trigger integrations](https://n8n.io/integrations/google-drive-trigger/) page.
///

/// note | Manual Executions vs. Activation
On manual executions this node will return the last event matching its search criteria. If no event matches the criteria (for example because you are watching for files to be created but no files have been created so far), an error is thrown. Once saved and activated, the node will regularly check for any matching events and will trigger your workflow for each event found.
///

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/trigger-nodes/n8n-nodes-base.googledrivetrigger/common-issues.md).
