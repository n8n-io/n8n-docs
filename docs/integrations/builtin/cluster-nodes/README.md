---
contentType: overview
title: Cluster nodes
description: 'Understand cluster nodes in n8n, and browse the cluster nodes library.'
nodeTitle: Cluster nodes
originalFilePath: integrations/builtin/cluster-nodes/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/cluster-nodes'
url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes'
layout:
  description:
    visible: false
---

# Cluster nodes <a href="#cluster-nodes" id="cluster-nodes"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/zJOwS1oaLPBcpMdYXIs3/" %}


## Root nodes <a href="#root-nodes" id="root-nodes"></a>

Each cluster starts with one [root node](#user-content-fn-1)[^1].

## Sub-nodes <a href="#sub-nodes" id="sub-nodes"></a>

Each root node can have one or more sub-nodes[^2] attached to it.

[^1]: Each n8n cluster node contains a single root nodes that defines the main functionality of the cluster. One or more sub nodes attach to the root node to extend its functionality.
[^2]: n8n cluster nodes consist of one or more sub nodes connected to a root node. Sub nodes extend the functionality of the root node, providing access to specific services or resources or offering specific types of dedicated processing, like calculator functionality, for example.
