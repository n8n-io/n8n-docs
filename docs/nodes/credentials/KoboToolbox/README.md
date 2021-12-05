---
permalink: /credentials/koboToolbox
description: Learn to configure credentials for the KoboToolbox node in n8n
---

# KoboToolbox

You can use these credentials to authenticate the following nodes with KoboToolbox.

- [KoboToolbox](../../nodes-library/nodes/KoboToolbox/README.md)

## Prerequisites

- Have a [KoboToolbox](https://www.kobotoolbox.org/) account, either from one of the available cloud services, or self-hosted.

## Getting your API token

- Create an API token for your user by navigating to https://[your-kobotoolbox-domain]/token/?format=json from a browser that has an authenticated session with your server. You should get a JSON response that looks like `{"token":"751348babd1e7fe3c1aa0562f6041c746b071f11"}`. Copy the token value and enter it in the n8n credentials page.
- For more details on getting API tokens, please refer to the [KoboToolbox docs](https://support.kobotoolbox.org/api.html).
