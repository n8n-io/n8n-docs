---
title: n8n Integrations Documentation and Guides
contentType: overview
hide:
  - feedback
  - kapaButton
nodeTitle: Integrations
originalFilePath: integrations/index.md
originalUrl: https://docs.n8n.io/integrations
url: https://docs.n8n.io/integrations/
description: >-
  Access n8n integrations documentation and guides. Find comprehensive resources
  to help you master app integrations using different types of nodes to improve
  your automation workflows.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: false
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Nodes

n8n calls integrations nodes.

Nodes are the building blocks of workflows in n8n. They're an entry point for retrieving data, a function to process data, or an exit for sending data. The data process includes filtering, recomposing, and changing data. There can be one or several nodes for your API, service or app. You can connect multiple nodes, which allows you to create complex workflows.

## Built-in nodes <a href="#built-in-nodes" id="built-in-nodes"></a>

n8n includes a collection of built-in integrations. Refer to [Built-in nodes](builtin/node-types.md) for documentation on all n8n's built-in nodes.

## Community nodes <a href="#community-nodes" id="community-nodes"></a>

As well as using the built-in nodes, you can also install community-built nodes. Refer to [Community nodes](community-nodes/installation-and-management/) for more information.

## Credential-only nodes and custom operations <a href="#credential-only-nodes-and-custom-operations" id="credential-only-nodes-and-custom-operations"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/VdlSjndpr14a7NDwfPuF/" %}

Refer to [Custom operations](builtin/custom-api-actions-for-existing-nodes.md) for more information.

## Generic integrations <a href="#generic-integrations" id="generic-integrations"></a>

If you need to connect to a service where n8n doesn't have a node, or a credential-only node, you can still use the [HTTP Request](builtin/core-nodes/n8n-nodes-base.httprequest/) node. Refer to the node page for details on how to set up authentication and create your API call.

## Where to go next <a href="#where-to-go-next" id="where-to-go-next"></a>

* If you want to create your own node, head over to the [Creating Nodes](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/overview) section.
* Check out [Community nodes](community-nodes/using-community-nodes.md) to learn about installing and managing community-built nodes.
* If you'd like to learn more about the different nodes in n8n, their functionalities and example usage, check out n8n's node libraries: [Core nodes](builtin/core-nodes/), [Actions](builtin/app-nodes/), and [Triggers](builtin/trigger-nodes/).
* If you'd like to learn how to add the credentials for the different nodes, head over to the [Credentials](builtin/credentials/) section.
