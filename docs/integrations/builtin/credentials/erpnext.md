# ERPNext

You can use these credentials to authenticate the following nodes with Emelia.

- [ERPNext](/integrations/builtin/app-nodes/n8n-nodes-base.erpNext/)

## Prerequisites

- Create a [ERPNext](https://erpnext.com) account.

## Using API Key

1. Open your ERPNext dashboard page.
2. Click on ***Settings*** on the top and select 'My Settings'.
3. Scroll down to the bottom of the page and click on ***API Access***.
4. Click on the ***Generate Keys*** button.
5. Copy the displayed API Secret.
6. Enter a name for your credentials in the ***Credentials Name*** field in the 'ERPNext API' credentials in n8n.
7. Paste the API Secret in the ***API Secret*** field in the 'ERPNext API' credentials in n8n.
8. Copy the API Key from ERPNext.
**Note:** You might have to refresh the ERPNext window to view the API Key.
9. Paste the API Key in the ***API Key*** field in the 'ERPNext API' credentials in n8n.
10. Enter the subdomain of your ERPNext account in the ***Subdomain*** field in the 'ERPNext API' credentials in n8n. Refer to the [FAQs](#how-to-find-the-subdomain-of-an-erpnext-account) to learn how to get your subdomain.
11. Click on the ***Create*** button to create your credentials in n8n.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/Q12DmHS3FL4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## FAQs

### How to find the subdomain of an ERPNext account?

In the address bar of your browser, you can find the subdomain. The string between `https://` and `.erpnext.com` is your subdomain. For example, if the URL in the address bar is `https://n8n.erpnext.com`, the subdomain will be `n8n`.
