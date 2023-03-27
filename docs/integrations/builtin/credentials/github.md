# GitHub

You can use these credentials to authenticate the following nodes with GitHub.

- [GitHub](/integrations/builtin/app-nodes/n8n-nodes-base.github/)
- [GitHub Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger/)


## Prerequisites

Create a [GitHub](https://github.com/){:target=_blank .external-link} account.

## Using OAuth

!!! note "n8n Cloud users"
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your GitHub account to n8n.


1. Open your GitHub [dashboard](https://github.com){:target=_blank .external-link}.
2. Select your user icon in the top right.
3. Select **Settings** > **Developer settings** >**OAuth Apps**.
4. Select **Register a new application** .
5. Enter the **Application name** and **Homepage URL**.
6. Copy the **OAuth Callback URL** from n8n and paste it in the **Authorization callback URL** field.
7. Select **Register application**.
8. Copy the **Client ID**.
9. Enter the name for your credentials in the **Credentials Name** field in **GitHub OAuth2 API** credentials in n8n.
10. Paste the client ID in the **Client ID** field in **GitHub OAuth2 API** credentials in n8n.
11. On your application page, select **Generate a new client secret**.
12. Copy the displayed **Client Secret**.
13. Paste the client secret in the **Client Secret** field in **GitHub OAuth2 API** credentials in n8n.
14. Select the circle button in the OAuth section to connect a GitHub account to n8n.
15. Select **Save** button to save your credentials in n8n.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/O1kEes6mQcs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The following video demonstrates the steps to authenticate the GitHub node on [n8n Cloud](https://n8n.io/cloud/){:target=_blank .external-link}.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/WtjRxIVVCIg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Access Token

1. Open your GitHub [dashboard](https://github.com){:target=_blank .external-link}.
2. Select your user icon in the top right.
3. Select **Settings** > **Developer settings** > **Personal access tokens**.
4. Select **Generate new token**.
5. Choose your token type.
6. Enter a note in the **Note** field.
7. Select scopes in the **Select scopes** section. The scopes you need depend on the resources you're accessing.
8. Scroll down to the bottom and select **Generate token**.
9. Copy the displayed **Personal access token**.
10. Enter the name for your credentials in the **Credentials Name** field in the **GitHub API** credentials in n8n.
11. Enter your GitHub username in the **User** field in the **GitHub API** credentials in n8n.
12. Paste the access token in the **Access Token** field in the **GitHub API** credentials in n8n.
13. Select **Save** to save your credentials in n8n.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/zookYdMldt4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
