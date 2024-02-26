---
title: Figma trigger (Beta) node
description: Documentation for the Figma trigger (Beta) node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Figma trigger (Beta)

[Figma](https://www.figma.com/) is a prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows.

/// warning | Supported Figma Plans
Figma doesn't support webhooks on the free "Starter" plan. Your team would need to be on the "Professional" plan to use this node.
///

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/figma/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Figma Trigger integrations](https://n8n.io/integrations/figma-trigger-beta/){:target=_blank .external-link} page.
///

## Trigger Events

- **File Commented**: Triggers when someone comments on a file.
- **File Deleted**: Triggers when an individual file is deleted, but not when an entire folder with all files is deleted.
- **File Updated**: Triggers when a file is saved or deleted. A save occurs when a file is closed or within 30 seconds after changes have been made.
- **File Version Updated**: Triggers when a named version is created in the version history of a file.
- **Library Publish**: Triggers when a library file is published.

