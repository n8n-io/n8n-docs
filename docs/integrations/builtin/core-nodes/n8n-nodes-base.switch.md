---
title: Switch
description: Documentation for the Switch node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Switch

Use the Switch node to route a workflow conditionally based on comparison operations. It's similar to the [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/) node, but supports multiple output routes.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Switch integrations](https://n8n.io/integrations/switch/){:target=_blank .external-link} page.
///

## Node parameters

- **Mode**: select whether to define the conditions as rules in the node, or as an expression, programmatically.
- **Routing Rules**: appears when you select **Mode** > **Rules**. Add comparison conditions using the  dropdown. The available comparison operations vary for each data type.
- **Number of Outputs**: appears when you select **Mode** > **Expression**. Set how many outputs the node should have.
- **Output Index**: create an expression to determine which node output to send data to.

## Node options

- **Fallback Output**: choose how to route the workflow when none of the conditions match.
- **Ignore Case**: whether to ignore letter case.
- **Less Strict Type Validation**: enable this if you want n8n to attempt to convert value types based on the operator you choose.
- **Send data to all matching outputs**: enable this to send data to all outputs matching the conditions. When disabled, n8n sends data to the first output matching the conditions.


## Related resources

View [example workflows and related content](https://n8n.io/integrations/switch/){:target=_blank .external-link} on n8n's website.

Refer to [Splitting with conditionals](/flow-logic/splitting/) for more information on using conditionals to create complex logic in n8n.




