---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set the self-hosted instance timezone
description: Change the default timezone for your self-hosted n8n instance.
contentType: howto
---

# Set the self-hosted instance timezone

The default timezone is America/New_York. For instance, the Schedule node uses it to know at what time the workflow should start. To set a different default timezone, set `GENERIC_TIMEZONE` to the appropriate value. For example, if you want to set the timezone to Berlin (Germany):

```bash
export GENERIC_TIMEZONE=Europe/Berlin
```

You can find the name of your timezone [here](https://momentjs.com/timezone/){:target="_blank" .external-link}.

Refer to [Environment variables reference](/hosting/configuration/environment-variables/timezone-localization/) for more information on this variable.
