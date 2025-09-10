---
title: Set the self-hosted instance timezone
description: Change the default timezone for your self-hosted n8n instance.
contentType: howto
---

# Set the self-hosted instance timezone

The default timezone is America/New_York. For instance, the Schedule node uses it to know at what time the workflow should start. To set a different default timezone, set `GENERIC_TIMEZONE` to the appropriate value. For example, if you want to set the timezone to Berlin (Germany):

```bash
export GENERIC_TIMEZONE=Europe/Berlin
```

You can find the name of your timezone [here](https://momentjs.com/timezone/).

Refer to [Environment variables reference](/hosting/configuration/environment-variables/timezone-localization.md) for more information on this variable.
