---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Block access to nodes
description: "Prevent your n8n users from accessing specific nodes."
contentType: howto
---

# Block access to nodes

For security reasons, you may want to block your users from accessing or working with specific n8n nodes. This is helpful if your users might be untrustworthy.

Use the `NODES_EXCLUDE` environment variable to prevent your users from accessing specific nodes.

## Exclude nodes

Update your `NODES_EXCLUDE` environment variable to include an array of strings, containing any nodes you want to block your users from using.

For example:

```
NODES_EXCLUDE: "[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.filesreadwrite\"]"
```

## Suggested nodes to block

<!-- TODO: Check with nodes/dev team as to what nodes we should include here-->

The nodes that can pose security risks vary based on your use case and user profile. Here are some nodes you might want to start with:

* [Execute Command](/integrations/builtin/core-nodes/n8n-nodes-base.executecommand/)
* [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite/)

## Related resources

Refer to [Nodes environment variables](/hosting/configuration/environment-variables/nodes/) for more information on this environment variables.

Refer to [Configuration](/hosting/configuration/configuration-methods/) for more information on setting environment variables.