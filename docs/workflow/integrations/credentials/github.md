# GitHub

You can use these credentials to authenticate the following nodes with GitHub.
- [GitHub](/workflow/integrations/nodes/n8n-nodes-base.github/)
- [GitHub Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.githubTrigger/)


## Prerequisites

Create a [GitHub](https://github.com/) account.

## Using OAuth

!!! note "⛅️ Note fordoc2app.cloudintegration.eu users"
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your GitHub account to Workflow².


1. Open your GitHub [dashboard](https://github.com).
2. Click on your user icon in the top right.
3. Click on ***Settings***.
4. Click on ***Developer settings***.
5. Select ***OAuth Apps***.
6. Click on the ***Register a new application*** button.
7. Enter the ***Application name*** and ***Homepage URL***.
8. Copy the ***OAuth Callback URL*** from Doc² and paste it in the ***Authorization callback URL*** field.
9. Click on the ***Register application*** button.
10. Copy the displayed 'Client ID'.
11. Enter the name for your credentials in the ***Credentials Name*** field in the 'Github OAuth2 API' credentials in Workflow².
12. Paste the client ID in the ***Client ID*** field in the 'Github OAuth2 API' credentials in Workflow².
13. On your application page, click on the ***Generate a new client secret*** button.
14. Copy the displayed 'Client Secret'.
15. Paste the client secret in the ***Client Secret*** field in the 'Github OAuth2 API' credentials in Workflow².
16. Click on the circle button in the OAuth section to connect a GitHub account to Workflow².
17. Click the ***Save*** button to save your credentials in Workflow².

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/O1kEes6mQcs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The following video demonstrates the steps to authenticate the GitHub node on [n8n.cloud](https://n8n.cloud).

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/WtjRxIVVCIg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Access Token

1. Open your GitHub [dashboard](https://github.com).
2. Click on your user icon in the top right.
3. Click on ***Settings***.
4. Click on ***Developer settings***.
5. Select ***Personal access tokens***.
6. Click on ***Generate new token***.
7. Enter a note in the ***Note*** field.
8. Select the relevant scopes from the ***Select scopes*** section.
9. Scroll down to the bottom and click on the ***Generate token*** button.
10. Copy the displayed 'Personal access token'.
11. Enter the name for your credentials in the ***Credentials Name*** field in the 'Github API' credentials in Workflow².
12. Enter your GitHub username in the ***User*** field in the 'Github API' credentials in Workflow².
13. Paste the access token in the ***Access Token*** field in the 'Github API' credentials in Workflow².
14. Click the ***Create*** button to save your credentials in Workflow².

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/zookYdMldt4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
