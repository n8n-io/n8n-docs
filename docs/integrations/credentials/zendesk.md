# Zendesk

You can use these credentials to authenticate the following nodes with Zendesk.
- [Zendesk](/integrations/nodes/n8n-nodes-base.zendesk/)
- [Zendesk Trigger](/integrations/trigger-nodes/n8n-nodes-base.zendeskTrigger/)

## Prerequisites

Create a [Zendesk](https://zendesk.com/) account.

## Using OAuth

1. Open your Zendesk dashboard.
2. Click on the gear icon on the left.
3. Click on 'API' under the ***CHANNELS*** section in the sidebar.
4. Click on the ***OAuth Clients*** tab.
5. Click on the ***Add OAuth client*** button.
6. Enter the client name in the ***Client Name*** field.
7. Enter a description in the ***Description*** field.
8. Copy the 'OAuth Callback URL' provided in the 'Zendesk OAuth2 API' credentials in n8n.
9. Paste it in the ***Redirect URLs*** field on the Zendesk API credentials page.
10. Click on the ***Save*** button.
11. Click on the ***OK*** button on the ***Please store the secret that will appear*** pop-up.
12. Scroll down to the ***Secret*** section and copy the displayed ***Secret***.
13. Paste this secret in the ***Client Secret*** field in the 'Zendesk OAuth2 API' credentials in n8n.
14. Copy the ***Unique identifier*** from the Zendesk API credentials page.
15. Paste it in the ***Client ID*** field in the 'Zendesk OAuth2 API' credentials in n8n.
16. Enter your Zendesk subdomain in the ***Subdomain*** field in the 'Zendesk OAuth2 API' credentials in n8n. Refer to the [FAQs](#how-do-i-get-my-zendesk-subdomain) to learn more about subdomain.
17. Enter the name for your credentials in the ***Credentials Name*** field in the 'Zendesk OAuth2 API' credentials in n8n.
18. Click on the circle button in the OAuth section to connect a Zendesk account to n8n.
19. Click on the ***Save*** button to save your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/ieNHkgUVNhM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Access Token

1. Open your Zendesk dashboard.
2. Click on the gear icon on the left.
3. Click on 'API' under the ***CHANNELS*** section in the sidebar.
4. If ***Token access*** is disabled, click on the switch to toggle it to 'Enabled'.
5. Click on the ***Add API token*** button.
6. Enter a description in the ***API token description*** field.
7. Click on the ***Copy*** button to copy the API token.
8. Click on the ***Save*** button.
9. Enter the name for your credentials in the ***Credentials Name*** field in the 'Zendesk API' credentials in n8n.
10. Enter your Zendesk subdomain in the ***Subdomain*** field. Refer to the [FAQs](#how-do-i-get-my-zendesk-subdomain) to learn more about subdomain.
11. Enter your Zendesk email address in the ***Email*** field.
12. Paste the ***API token*** in the ***API Token*** field.
13. Click on the ***Save*** button to save your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/AvduoHrFJdQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## FAQs

### How do I get my Zendesk subdomain?

To get your Zendesk subdomain, follow the steps mentioned below.
1. Access your Zendesk dashboard.
2. Copy the string of characters located between `https://` and `.zendesk.com/agent/dashboard` in your Zendesk URL. This string is the subdomain. For example, if your Zendesk URL is `https://example.zendesk.com/agent/dashboard`, the subdomain will be `example`.
