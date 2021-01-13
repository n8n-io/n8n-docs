---
permalink: /credentials/google
description: Learn to configure credentials for the nodes based on Google services in n8n
---

# Google

You can use these credentials to authenticate the following nodes with Google.
- [G Suite Admin](../../nodes-library/nodes/GSuiteAdmin/README.md)
- [Gmail](../../nodes-library/nodes/Gmail/README.md)
- [Google Books](../../nodes-library/nodes/GoogleBooks/README.md)
- [Google Calendar](../../nodes-library/nodes/GoogleCalendar/README.md)
- [Google Cloud Firestore](../../nodes-library/nodes/GoogleCloudFirestore/README.md)
- [Google Cloud Natural Language](../../nodes-library/nodes/GoogleCloudNaturalLanguage/README.md)
- [Google Cloud Realtime Database](../../nodes-library/nodes/GoogleCloudRealtimeDatabase/README.md)
- [Google Drive](../../nodes-library/nodes/GoogleDrive/README.md)
- [Google Sheets](../../nodes-library/nodes/GoogleSheets/README.md)
- [Google Tasks](../../nodes-library/nodes/GoogleTasks/README.md)
- [Google Translate](../../nodes-library/nodes/GoogleTranslate/README.md)
- [YouTube](../../nodes-library/nodes/YouTube/README.md)


## Prerequisites

Create a [Google Cloud](https://cloud.google.com/) account.

<!-- ### API Key

1. Access your Google dashboard.
2. Click on your user icon on the top left.
3. Click on API & Services.
4. Click on Credentials.
5. Click on Create Credentials.
6. Click on API Key.
7. Use provided API Key with your Google node credentials in n8n.
![Getting Google credentials](https://i.imgur.com/r9KX5Gh.gif)  -->

## Using OAuth

1. Access your [Google Cloud Console](https://console.cloud.google.com).
2. Click on the hamburger menu on the top left.
3. Select 'Credentials' from the ***APIs & Services*** dropdown list.
4. Click on the ***+ CREATE CREDENTIALS*** button.
5. Select 'OAuth client ID' from the dropdown list.
6. Select 'Web application' from the ***Application type*** dropdown list.
7. Click on the ***+ Add URI*** button under the ***Authorized redirect URIs*** section.
8. Copy the 'OAuth Callback URL' provided in the 'Google OAuth2 API' credentials in n8n and paste it in the ***URIs*** field in the Create OAuth client ID page.
9. Click on the ***CREATE*** button.
10. Use provided ***Client Secret*** and ***Client ID*** with your Google node credentials in n8n.
11. Click on the circle button in the OAuth section to connect a Google account to n8n.
12. Click on the ***Save*** button to save your credentials.
13. On Google Cloud Console, click on ***Library*** in the menu on the left.
14. Search for the API that you want to enable. For example, search for 'Calendar', and click on 'Google Calendar API'.
15. Click on the ***ENABLE*** button.

<iframe width="560" height="315" src="https://www.youtube.com/embed/y-XHQbFOUww" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Using Service Account

1. Access your [Google Cloud Console](https://console.cloud.google.com).
2. Click on the hamburger menu on the top left.
3. Select 'Credentials' from the ***APIs & Services*** dropdown list.
4. Click on the ***+ CREATE CREDENTIALS*** button.
5. Select 'Service account' from the dropdown list.
6. Enter the required information and click on the ***CREATE*** button.
7. Based on your use-case, you may want to select a role from the ***Select a role*** dropdown list.
8. Based on your use-case, you may want to grant user access in the ***Grant users access to this service account*** section.
9. Click on the ***Done*** button.
10. Select the newly created service account under the ***Service Accounts*** section.
11. Under the ***Keys*** section, click on ***ADD KEY*** and select 'Create new key'.
12. Click on the ***Create*** button.
13. Save the JSON file on your machine.
14. Use the ***client_email*** and ***private_key*** from the JSON file you downloaded for your Google Credentials in the n8n node.

**Note:** Before entering the private_key in n8n, make sure that you replace all the `\n` with new lines.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Druffw8Afro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## FAQs

### How to implement user impersonification?

To implement user impersonification make sure to check the ***Enable G Suite Domain-Wide Delegation*** on your Google Cloud Console.

Refer to the [Delegation domain-wide authority to the service account](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority) documentation to learn more.
