---
title: Programmatic-style execute() method
description: >-
  A reference document for the programmatic-style execute() method of the node
  base file.
contentType: reference
nodeTitle: Programmatic-style execute method
originalFilePath: >-
  integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method.md
originalUrl: >-
  https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/reference/base-files/programmatic-style-execute-method
layout:
  description:
    visible: false
---

# Programmatic-style execute() method <a href="#programmatic-style-execute-method" id="programmatic-style-execute-method"></a>

The main difference between the declarative and programmatic styles is how they handle incoming data and build API requests. The programmatic style requires an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles requests using the `routing` key in the `operations` object.

The `execute()` method creates and returns an instance of `INodeExecutionData`.

{% hint style="warning" %}
**Paired items**

You must include input and output item pairing information in the data you return. For more information, refer to [Paired items](../item-linking.md).
{% endhint %}
