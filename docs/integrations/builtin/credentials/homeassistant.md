---
title: Home Assistant credentials - n8n Documentation
description: Documentation for Home Assistant credentials. Use these credentials to authenticate Home Assistant in n8n, a workflow automation platform.
---

# Home Assistant credentials

You can use these credentials to authenticate the following nodes with Home Assistant.

- [Home Assistant](/integrations/builtin/app-nodes/n8n-nodes-base.homeassistant/)

## Prerequisites

- [Install](https://www.home-assistant.io/installation/) Home Assistant
- Create a [Home Assistant](https://www.home-assistant.io/getting-started/onboarding) account.
- Review the Home Assistant [Autentication API](https://developers.home-assistant.io/docs/auth_api) documentation

## Using access token

1. Access your Home Assistant UI, for example `homeassistant.local:8123`.
2. Open your user profile page and navigate to the **Long-Lived Access Tokens** section.
3. Generate a new token and copy it.
4. Use that token with your Home Assistant node credentials in n8n.

