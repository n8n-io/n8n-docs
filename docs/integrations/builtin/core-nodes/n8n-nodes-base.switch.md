---
title: Switch
description: Documentation for the Switch node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Switch

Use the Switch node to route a workflow conditionally based on comparison operations. It's similar to the [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/) node, but supports up to four conditional routes.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Switch integrations](https://n8n.io/integrations/switch/){:target=_blank .external-link} page.

## Node reference

**Mode**: select whether to define the conditions as rules in the node, or as an expression, programmatically.

**Add Routing Rule**: add comparison conditions using the  dropdown. The available comparison operations vary for each data type:

- Boolean
	- Equal
	- Not Equal
- Number
	- Smaller
	- Smaller Equal
	- Equal
	- Not Equal
	- Larger
	- Larger Equal
- String
	- Contains
	- Equal
	- Not Contains
	- Not Equal
	- Regex

**Fallback Output**: choose how to route the workflow when none of the conditions match.

!!! note "Switch option limits"
	Switch can handle a maximum of four output options.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/switch/){:target=_blank .external-link} on n8n's website.

Refer to [Splitting with conditionals](/flow-logic/splitting/) for more information on using conditionals to create complex logic in n8n.




