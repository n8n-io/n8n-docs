---
title: Date & Time
description: Documentation for the Date & Time node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Date & Time

The Date & Time node manipulates date and time data and convert it to different formats.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Date & Time integrations](https://n8n.io/integrations/date-and-time/){:target=_blank .external-link} list.

!!! note "Timezone settings"
    The node uses either the timezone of the n8n instance, or the workflow settings timezone. On n8n Cloud, the default timezone is GMT. On self-hosted n8n, the default is America/New_York, unless you've configured the instance to use a different default.
	
    Refer to [Workflow settings](/workflows/settings/) for more information on configuring timezones for individual workflows.
	
    Refer to [Configuration methods | Timezone](/hosting/environment-variables/configuration-methods/#timezone) for information on configuring your self-hosted instance timezone.


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

The Date & Time node uses [Luxon](https://moment.github.io/luxon){:target=_blank .external-link}. 

### Supported date formats

n8n supports all date formats [supported by Luxon](https://moment.github.io/luxon/#/formatting?id=table-of-tokens){:target=_blank .external-link}.
