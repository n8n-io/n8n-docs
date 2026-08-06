---
title: timezone-settings
---
{% hint style="info" %}
**Timezone settings**

The node relies on the timezone setting. n8n uses either:

1. The workflow timezone, if set. Refer to [Workflow settings](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/configure-workflow-settings) for more information.
2. The n8n instance timezone, if the workflow timezone isn't set. The default is `America/New York` for self-hosted instances. n8n Cloud tries to detect the instance owner's timezone when they sign up, falling back to GMT as the default. Self-hosted users can change the instance setting using [Environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/timezone-and-localization). Cloud admins can change the instance timezone in the [Admin dashboard](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/configure-cloud/set-your-timezone).
{% endhint %}
