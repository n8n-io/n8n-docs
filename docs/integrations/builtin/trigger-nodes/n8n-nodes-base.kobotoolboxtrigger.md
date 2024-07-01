---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: KoboToolbox trigger
description: Documentation for the KoboToolbox trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# KoboToolbox trigger

[KoboToolbox](https://www.kobotoolbox.org/) is a field survey and data collection tool to design interactive forms to be completed offline from mobile devices. It's available both as a free cloud solution or as a self-hosted version.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/kobotoolbox/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [KoboToolbox Trigger integrations](https://n8n.io/integrations/kobotoolbox-trigger/){:target=_blank .external-link} page.
///

This node starts a workflow upon new submissions of a specified form. The trigger node handles the creation/deletion of the hook, so you don't need to do any setup in KoBo Toolbox.

It works the same way as the Get Submission operation in the [KoboToolbox](/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/) node, including supporting the same reformatting options.
