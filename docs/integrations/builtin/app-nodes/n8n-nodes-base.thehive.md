---
title: TheHive node documentation
description: Learn how to use the TheHive node in n8n. Follow technical documentation to integrate TheHive node into your workflows.
contentType: [integration, reference]
---

# TheHive node

Use the TheHive node to automate work in TheHive, and integrate TheHive with other applications. n8n has built-in support for a wide range of TheHive features, including creating alerts, counting tasks logs, cases, and observables. 

On this page, you'll find a list of operations the TheHive node supports and links to more resources.

/// note | TheHive and TheHive 5
n8n provides two nodes for TheHive. Use this node (TheHive) if you want to use TheHive's version 3 or 4 API. If you want to use version 5, use [TheHive 5](/integrations/builtin/app-nodes/n8n-nodes-base.thehive5.md).
///
/// note | Credentials
Refer to [TheHive credentials](/integrations/builtin/credentials/thehive.md) for guidance on setting up authentication. 
///

## Operations

The available operations depend on your API version. To see the operations list, create your credentials, including selecting your API version. Then return to the node, select the resource you want to use, and n8n displays the available operations for your API version. 

* Alert
* Case
* Log
* Observable
* Task

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'thehive') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Related resources

n8n provides a trigger node for TheHive. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.thehivetrigger.md).

Refer to TheHive's documentation for more information about the service:

* [Version 3](https://docs.thehive-project.org/thehive/legacy/thehive3/api/)
* [Version 4](https://docs.thehive-project.org/cortex/api/api-guide/)
