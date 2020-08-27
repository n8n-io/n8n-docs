---
permalink: /credentials/acuityScheduling
---

# Acuity Scheduling

You can find information about the operations supported by the Acuity Scheduling node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.acuitySchedulingTrigger) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/AcuityScheduling).

## Prerequisites

Create an [Acuity Scheduling](https://acuityscheduling.com/) account.

## Using OAuth

1. Visit the [Acuity OAuth2 Account Registration page](https://acuityscheduling.com/oauth2/register)
2. Enter a name in the ***Account Name*** field.
3. Enter your email address in the ***Email Address*** field.
4. Enter your n8n URL in the ***Website*** field.
5. Enter a description in the ***Application Description*** field.
6. Copy your OAuth Callback URL from the 'Create New Credentials' screen in n8n and paste in the ***Callback URIs*** section.
7. Click on the ***Register*** button.
8. Use the provided 'Client ID' and the 'Client secret' with your Acuity Scheduling OAuth2 API credentials in n8n.
9. Click on the circle button in the OAuth section to connect your HubSpot account to n8n.
10. Click the ***Save*** button to save your credentials.

![Getting Acuity Scheduling OAuth2 credentials](./using-oauth.gif)


## Using Access Token

1. Open your Acuity Scheduling dashboard.
2. Click on 'Integrations' in the left sidebar.
3. Scroll down and click 'view credentials' under the API section.
4. Copy the 'User ID' and 'API Key' from the pop-up that is displayed.
5. Use these credentials with your Acuity Scheduling node credentials in n8n.

![Getting Acuity Scheduling credentials](./using-access-token.gif)
