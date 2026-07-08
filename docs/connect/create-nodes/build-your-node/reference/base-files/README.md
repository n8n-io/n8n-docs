---
contentType: overview
nodeTitle: Base files
originalFilePath: integrations/creating-nodes/build/reference/node-base-files/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files
url: 'https://docs.n8n.io/connect/create-nodes/build-your-node/reference/base-files'
layout:
  description:
    visible: false
---

# Node base file <a href="#node-base-file" id="node-base-file"></a>

The node base file contains the core code of your node. All nodes must have a base file. The contents of this file are different depending on whether you're building a declarative-style or programmatic-style node. For guidance on which style to use, refer to [Choose your node building approach](../../../plan-your-node/choose-a-node-building-style.md).

These documents give short code snippets to help understand the code structure and concepts. For full walk-throughs of building a node, including real-world code examples, refer to [Build a declarative-style node](../../tutorial-build-a-declarative-style-node.md) or [Build a programmatic-style node](../../tutorial-build-a-programmatic-style-node.md).

You can also explore the [n8n-nodes-starter](https://github.com/n8n-io/n8n-nodes-starter) and n8n's own [nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes) for a wider range of examples. The starter contains basic examples that you can build on. The n8n [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost) is a good example of a more complex programmatic-style node, including versioning.

For all nodes, refer to the:

* [Structure of the node base file](structure.md)
* [Standard parameters](standard-parameters.md)

For declarative-style nodes, refer to the:

* [Declarative-style parameters](declarative-style-parameters.md)

For programmatic-style nodes, refer to the:

* [Programmatic-style parameters](programmatic-style-parameters.md)
* [Programmatic-style execute() method](programmatic-style-execute-method.md)
