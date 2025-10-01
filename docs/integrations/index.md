---
title: n8n Integrations Documentation and Guides
description: Access n8n integrations documentation and guides. Find comprehensive resources to help you master app integrations using different types of nodes to improve your automation workflows.
contentType: overview
hide:
  - feedback
  - kapaButton
---

# Integrations

n8n calls integrations nodes.

Nodes are the building blocks of workflows in n8n. They're an entry point for retrieving data, a function to process data, or an exit for sending data. The data process includes filtering, recomposing, and changing data. There can be one or several nodes for your API, service or app. You can connect multiple nodes, which allows you to create complex workflows.

## Built-in nodes

n8n includes a collection of built-in integrations. Refer to [Built-in nodes](/integrations/builtin/node-types.md) for documentation on all n8n's built-in nodes.

## Community nodes

As well as using the built-in nodes, you can also install community-built nodes. Refer to [Community nodes](/integrations/community-nodes/installation/index.md) for more information.

## Credential-only nodes and custom operations

--8<-- "_snippets/integrations/credential-only-intro.md"

Refer to [Custom operations](/integrations/custom-operations.md) for more information.

## Generic integrations

If you need to connect to a service where n8n doesn't have a node, or a credential-only node, you can still use the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node. Refer to the node page for details on how to set up authentication and create your API call.

## Where to go next

* If you want to create your own node, head over to the [Creating Nodes](/integrations/creating-nodes/overview.md) section.
* Check out [Community nodes](/integrations/community-nodes/usage.md) to learn about installing and managing community-built nodes.
* If you'd like to learn more about the different nodes in n8n, their functionalities and example usage, check out n8n's node libraries: [Core nodes](/integrations/builtin/core-nodes/index.md), [Actions](/integrations/builtin/app-nodes/index.md), and [Triggers](/integrations/builtin/trigger-nodes/index.md).
* If you'd like to learn how to add the credentials for the different nodes, head over to the [Credentials](/integrations/builtin/credentials/index.md) section.
