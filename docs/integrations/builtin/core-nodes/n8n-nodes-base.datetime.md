---
title: Date & Time
description: Documentation for the Date & Time node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Date & Time

The Date & Time node manipulates date and time data and convert it to different formats.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Date & Time integrations](https://n8n.io/integrations/date-and-time/){:target=_blank .external-link} list.

--8<-- "_snippets/integrations/builtin/core-nodes/schedule/timezone-settings.md"

!!! note "Date and time in other nodes"
	You can work with data and time in the Code node, and in expressions in any node. n8n supports Luxon to help work with date and time in JavaScript. Refer to [Date and time with Luxon](/code/luxon/) for more information.

## Operations

* Add to a Date
* Extract Part of a Date
* Format a Date
* Get Current Date
* Get Time Between Dates
* Round a Date
* Subtract From a Date

## Related resources

View [example workflows and related content](https://n8n.io/integrations/date-and-time/){:target=_blank .external-link} on n8n's website.

The Date & Time node uses [Luxon](https://moment.github.io/luxon){:target=_blank .external-link}. You can also use Luxon in the Code node and expressions. Refer to [Date and time with Luxon](/code/luxon/) for more information.

### Supported date formats

n8n supports all date formats [supported by Luxon](https://moment.github.io/luxon/#/formatting?id=table-of-tokens){:target=_blank .external-link}.
