---
description: Secure, manage, and operate your n8n instance.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Administer

Administer n8n by controlling access, securing credentials, managing changes, and monitoring activity.

This section helps you run n8n securely and reliably as usage grows.

{% hint style="info" %}
Enterprise teams often spend more time in this section. SSO, directory integration, change control, and centralized logging become more important at scale. Many features covered here are also useful outside Enterprise, including user management basics, credential security, and operational monitoring.
{% endhint %}

### A typical administration workflow

{% stepper %}
{% step %}
### Control access

Decide who can sign in, what they can do, and how work is organized. Start with [Manage users and access](manage-users-and-access/).
{% endstep %}

{% step %}
### Protect secrets

Store and share credentials safely. Use [Manage credentials](manage-credentials/) to reduce secret sprawl.
{% endstep %}

{% step %}
### Move changes safely

Use Git-backed workflows to promote changes between environments. See [Use source control and environments](use-source-control-and-environments/).
{% endstep %}

{% step %}
### Monitor activity

Track usage and send signals to your logging tools. Use [Observe and log](observe-and-log/) to improve visibility.
{% endstep %}
{% endstepper %}