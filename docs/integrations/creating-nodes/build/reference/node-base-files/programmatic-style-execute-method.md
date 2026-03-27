---
title: Programmatic-style execute() method
description: A reference document for the programmatic-style execute() method of the node base file.
contentType: reference
---

# Programmatic-style execute() method

The main difference between the declarative and programmatic styles is how they handle incoming data and build API requests. The programmatic style requires an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles requests using the `routing` key in the `operations` object.

The `execute()` method creates and returns an instance of `INodeExecutionData`.

/// warning | Paired items
You must include input and output item pairing information in the data you return. For more information, refer to [Paired items](/integrations/creating-nodes/build/reference/paired-items.md).
///