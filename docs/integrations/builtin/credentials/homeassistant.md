---
title: Home Assistant credentials
description: Documentation for Home Assistant credentials. Use these credentials to authenticate Home Assistant in n8n, a workflow automation platform.
contentType: integration
---

# Home Assistant credentials

You can use these credentials to authenticate the following nodes:

- [Home Assistant](/integrations/builtin/app-nodes/n8n-nodes-base.homeassistant/)

## Prerequisites

- [Install](https://www.home-assistant.io/installation/) Home Assistant.
- Create a [Home Assistant](https://www.home-assistant.io/getting-started/onboarding) account.

## Supported authentication methods

- API access token

## Related resources

Refer to [Home Assistant's API documentation](https://developers.home-assistant.io/docs/api/rest){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- Your **Host**: The URL or IP Address of your host. Refer to the [Rest API documentation](https://developers.home-assistant.io/docs/api/rest/){:target=_blank .external-link} for more information.
- The **Port**: Home Assistant defaults to `8123`. Only change this if you've explicitly changed the port used.
- **SSL**: If you've enabled SSL in Home Assistant in the [config.yml map key](https://developers.home-assistant.io/docs/add-ons/configuration/?_highlight=ssl#add-on-configuration){:target=_blank .external-link}, toggle this setting on.
- An **Access Token**: n8n expects a [Long-Lived Access Token](https://developers.home-assistant.io/docs/auth_api#long-lived-access-token){:target=_blank .external-link}), which you can view in Home Assistant through your profile. Refer to the [Rest API documentation introduction](https://developers.home-assistant.io/docs/api/rest/){:target=_blank .external-link} for instructions on generating one.

