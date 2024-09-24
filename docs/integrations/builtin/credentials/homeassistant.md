---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Home Assistant credentials
description: Documentation for Home Assistant credentials. Use these credentials to authenticate Home Assistant in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Home Assistant credentials

You can use these credentials to authenticate the following nodes:

- [Home Assistant](/integrations/builtin/app-nodes/n8n-nodes-base.homeassistant/)

## Supported authentication methods

- API access token

## Related resources

Refer to [Home Assistant's API documentation](https://developers.home-assistant.io/docs/api/rest){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need to [Install](https://www.home-assistant.io/installation/) Home Assistant, create a [Home Assistant](https://www.home-assistant.io/getting-started/onboarding) account, and have:

- Your **Host**
- The **Port**
- A Long-Lived **Access Token**

To generate an access token and set up the credential:

1. To generate your **Access Token**, log in to Home Assistant and open your [User profile](https://my.home-assistant.io/redirect/profile){:target=_blank .external-link}.
2. In the **Long-Lived Access Tokens** section, generate a new token.
3. Copy this token and enter it in n8n as your **Access Token**.
4. Enter the URL or IP address of your Home Assistant **Host**, without the `http://` or `https://` protocol, for example `your.awesome.home`.
5. For the **Port**, enter the appropriate port:
	- If you've made no port changes and access Home Assistant at `http://`, keep the default of `8123`.
	- If you've made no port changes and access Home Assistant at `https://`, enter `443`.
	- If you've configured Home Assistant to use a specific port, enter that port.
6. If you've enabled SSL in Home Assistant in the [config.yml map key](https://developers.home-assistant.io/docs/add-ons/configuration/?_highlight=ssl#add-on-configuration){:target=_blank .external-link}, turn on the **SSL** toggle in n8n. If you're not sure, it's best to turn this setting on if you access your home assistant UI using `https://` instead of `http://`.

