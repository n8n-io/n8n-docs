---
permalink: /credentials/philipshue
---

# Philips Hue

You can find information about the operations supported by the Philips Hue node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.philipsHue) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/PhilipsHue).

## Prerequisites

Create a [Philips Hue Developer](https://developers.meethue.com/) account.

## Using OAuth

1. Access the [Add new Hue Remote API app](https://developers.meethue.com/add-new-hue-remote-api-app/) page.
2. Enter a name in the ***App name*** field.
3. Enter a description in the ***Application description*** field.
4. Copy the 'OAuth Callback URL' provided in the Philips Hue OAuth2 API credentials in n8n.
5. Back on the Add new Hue Remote API app page, paste the URL in the ***Callback URL*** field.
6. Click on the ***Submit*** button.
Click on the displayed 'AppId' to reveal the credentials.
7. Return to n8n and enter the displayed Client ID and Client Secret in your Philips Hue OAuth2 API credentials.

![Getting Philips Hue credentials](./using-oauth.gif)
