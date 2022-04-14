# Customer.io

You can use these credentials to authenticate the following nodes with Customer.io.
- [Customer.io](/integrations/nodes/n8n-nodes-base.customerIo/)
- [Customer.io Trigger](/integrations/trigger-nodes/n8n-nodes-base.customerIoTrigger/)

## Prerequisites

Create a [Customer.io](https://customer.io/) account.

## Using Access Token

1. Open your Customer.io [dashboard](https://fly.customer.io).
2. Click on the user icon in the top right and select ***Account settings***.
3. Click on ***API Credentials***.
4. Click on the ***Create Tracking API Key*** button.
5. Enter a name for the Tracking API Key in the ***Name***.
6. Select a workspace from the ***Workspace*** dropdown list.
7. Click on the ***Create Tracking API Key*** button.
8. Copy the displayed 'Site ID'.
9. Enter the name for your credentials in the ***Credentials Name*** field in the 'Customer.io API' credentials in n8n.
10. Paste the Site ID in the ***Tracking Site ID*** field in the 'Customer.io API' credentials in n8n.
11. Copy the 'API Key' from the Manage API Credentials page.
12. Paste the API key in the ***Tracking API Key*** field in the 'Customer.io API' credentials in n8n.
13. Click on the ***App API Keys*** tab on the Manage API Credentials page.
14. Click on the ***Create App API Key*** button.
15. Enter a name for the App API Key in the ***Name*** field.
16. Select a workspace from the ***Workspace*** dropdown list.
17. Click on the ***Create App API Key*** button.
18. Copy the displayed API key.
19. Paste the API key in the ***App API Key*** field in the 'Customer.io API' credentials in n8n.
20. Click on the ***Create*** button to create your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/LAFExR62-VA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## FAQs

### Why do I need the Tracking API Key and the App API Key?

Customer.io uses different API Keys for different endpoints. Based on the operation you want to perform, Doc² uses the correct API key to connect to your Customer.io account.
