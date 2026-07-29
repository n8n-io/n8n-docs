---
title: Set the self-hosted instance timezone
description: Change the default timezone for your self-hosted n8n instance.
contentType: howto
nodeTitle: Set the timezone
originalFilePath: hosting/configuration/configuration-examples/time-zone.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/configuration-examples/time-zone'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-the-timezone
layout:
  description:
    visible: false
---

# Set the self-hosted instance timezone <a href="#set-the-self-hosted-instance-timezone" id="set-the-self-hosted-instance-timezone"></a>

The default timezone is America/New_York. For instance, the Schedule node uses it to know at what time the workflow should start. To set a different default timezone, set `GENERIC_TIMEZONE` to the appropriate value. For example, if you want to set the timezone to Berlin (Germany):

```bash
export GENERIC_TIMEZONE=Europe/Berlin
```

You can find the name of your timezone [here](https://momentjs.com/timezone/).

Refer to [Environment variables reference](../use-environment-variables/timezone-and-localization.md) for more information on this variable.
