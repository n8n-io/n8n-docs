# Discourse

You can use these credentials to authenticate the following nodes with Discourse.
- [Discourse](/integrations/nodes/n8n-nodes-base.discourse/)


## Prerequisites

 - Host an instance of [Discourse](https://discourse.org/)
 - Create an account on your hosted instance and make sure that you are an admin

## Using API Key

1. Open your Discourse dashboard.
2. Click on the ***API*** tab.
3. Click on the ***+ New API Key*** button.
4. Enter a description in the ***Description*** field.
5. Based on your use-case, do one of the following:
    - If you want to create the API key for a single user, select 'Single User' from the ***User Level*** dropdown list. Enter the username in the ***User*** field and select the user from the dropdown list.
    - If you want to create the API key for all your users, select 'All Users' from the ***User Level*** dropdown list.
6. If you want to select all the scopes, check the ***Global Key (allowed all actions)*** checkbox. Otherwise, select scopes individually under the ***Scopes*** section.
7. Click on the ***Save*** button.
8. Copy the displayed API key.
9. Enter the name for your credentials in the ***Credentials Name*** field in the 'Discourse API' credentials in n8n.
10. Enter the URL of your Discourse instance in the ***URL*** field in the 'Discourse API' credentials in n8n. For example, `https://community.n8n.io`.
11. Paste the API key in the ***API Key*** field in the 'Discourse API' credentials in n8n.
12. Enter your Discourse username in the ***Username*** field in the 'Discourse API' credentials in n8n.
13. Click the ***Create*** button to create your credentials in n8n.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/rLdceGB5zoo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
