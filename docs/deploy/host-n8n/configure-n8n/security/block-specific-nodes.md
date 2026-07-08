---
title: Block access to nodes
description: Prevent your n8n users from accessing specific nodes.
contentType: howto
nodeTitle: Block specific nodes
originalFilePath: hosting/securing/blocking-nodes.md
originalUrl: 'https://docs.n8n.io/hosting/securing/blocking-nodes'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/block-specific-nodes
layout:
  description:
    visible: false
---

# Block access to nodes <a href="#block-access-to-nodes" id="block-access-to-nodes"></a>

For security reasons, you may want to block your users from accessing or working with specific n8n nodes. This is helpful if your users might be untrustworthy.

Use the `NODES_EXCLUDE` environment variable to prevent your users from accessing specific nodes.

## Exclude nodes <a href="#exclude-nodes" id="exclude-nodes"></a>

Update your `NODES_EXCLUDE` environment variable to include an array of strings containing any nodes you want to block your users from using.

For example, setting the variable this way:

```
NODES_EXCLUDE: "[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.readWriteFile\"]"
```

Blocks the [Execute Command](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executecommand) and [Read/Write Files from Disk](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.readwritefile) nodes.

Your n8n users won't be able to search for or use these nodes.

## Suggested nodes to block <a href="#suggested-nodes-to-block" id="suggested-nodes-to-block"></a>

The nodes that can pose security risks vary based on your use case and user profile. Here are some nodes you might want to start with:

* [Execute Command](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executecommand)
* [Read/Write Files from Disk](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.readwritefile)

## Enable nodes that are blocked by default <a href="#enable-nodes-that-are-blocked-by-default" id="enable-nodes-that-are-blocked-by-default"></a>

Some nodes, like Execute Command, are blocked by default. Remove them from the exclude list to enable them:

```
NODES_EXCLUDE: "[]"
```

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Nodes environment variables](../basic-configuration/use-environment-variables/nodes.md) for more information on this environment variable.

Refer to [Configuration](../basic-configuration.md) for more information on setting environment variables.
