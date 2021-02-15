---
permalink: /credentials/google
description: Learn to configure credentials for the nodes based on Google services in n8n
---

# Google

You can use these credentials to authenticate the following nodes with Google.
- [G Suite Admin](../../nodes-library/nodes/GSuiteAdmin/README.md)
- [Gmail](../../nodes-library/nodes/Gmail/README.md)
- [Google Analytics](../../nodes-library/nodes/GoogleAnalytics/README.md)
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

::: tip ❗️ Note for enabling the API
You'll need to enable the API of the service you want to use. You can enable the API from the Google Cloud Platform. For example, if you want to use the Google Sheets node, enable the Google Sheets API on the Google Cloud Platform. Refer to the [FAQs](#how-to-enable-an-api) to learn how to enable an API.
:::

## Using OAuth

1. Access your [Google Cloud Console](https://console.cloud.google.com).
2. Click on the hamburger menu on the top left.
3. Select 'Credentials' from the ***APIs & Services*** dropdown list.
4. Click on the ***+ CREATE CREDENTIALS*** button.
5. Select 'OAuth client ID' from the dropdown list. If you're creating OAuth credentials for the first time, you will have to verify the configure consent screen. Refer to the [FAQs](#how-to-configure-the-consent-screen) to learn to configure the consent screen.
6. Select 'Web application' from the ***Application type*** dropdown list.
7. Click on the ***+ Add URI*** button under the ***Authorized redirect URIs*** section.
8. Copy the 'OAuth Callback URL' provided in the Google node credentials in n8n.
9. Paste it in the ***URIs*** field in the Create OAuth client ID page.
10. Click on the ***CREATE*** button.
11. Copy ***Your Client ID*** from the Google Cloud Console.
12. Paste it in the ***Client ID*** field in the Google node credentials in n8n.
13. Copy ***Your Client Secret*** from the Google Cloud Console.
14. Paste it in the ***Client Secret*** field in the Google node credentials in n8n.
15. Enter the name for your credentials in the ***Credentials Name*** field in the Google node credentials in n8n.
16. Click on the circle button in the OAuth section to connect a Google account to n8n.
17. Click on the ***Save*** button to save your credentials.
18. On Google Cloud Console, click on ***Library*** in the menu on the left.
19. Search for the API that you want to enable. For example, search for 'Sheets', and click on 'Google Sheets API'.
20. Click on the ***ENABLE*** button.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/gZ6N2H3_vys" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Service Account

1. Access your [Google Cloud Console](https://console.cloud.google.com).
2. Click on the hamburger menu on the top left.
3. Select 'Credentials' from the ***APIs & Services*** dropdown list.
4. Click on the ***+ CREATE CREDENTIALS*** button.
5. Select 'Service account' from the dropdown list.
6. Enter a name in the ***Service account name*** field.
7. Click on the ***CREATE*** button.
8. Based on your use-case, you may want to select a role from the ***Select a role*** dropdown list.
9. Based on your use-case, you may want to grant user access in the ***Grant users access to this service account*** section.
10. Click on the ***Done*** button.
11. Select the newly created service account under the ***Service Accounts*** section.
12. Scroll down to the ***Keys*** section and click on ***ADD KEY***.
13. Select 'Create new key' from the dropdown list.
14. Select ***JSON*** under the ***Key type*** section and click on the ***Create*** button.
15. Save the JSON file on your machine.
16. Enter the name for your credentials in the ***Credentials Name*** field in the Google node credentials in n8n.
17. Copy ***Email*** from the Google Cloud Console.
18. Paste it in the ***Service Account Email*** field in the Google node credentials in n8n.
19. Copy the ***Private Key*** from the JSON file you saved in the previous step.
20. Click on the arrow icon to open the multi-line editor for the ***private_key*** field in the Google node credentials in n8n.
21. Paste the ***private_key*** in the ***Private Key*** field in the Google node credentials in n8n.
22. Click on the ***Save*** button to save your credentials.
23. On the Google Cloud Console, click on the left arrow icon next to the service account name.
24. Click on ***Library*** in the menu on the left.
25. Search for the API that you want to enable. For example, search for 'Sheets', and click on 'Google Sheets API'.
26. Click on the ***ENABLE*** button.


**Note:** Before entering the private_key in n8n, make sure that you replace all the `\n` with new lines.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/ArXVlpo3y1k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## FAQs

### How to enable an API?

To enable an API, follow the steps mentioned below.
1. Access your [Google Cloud Console](https://console.cloud.google.com).
2. Click on the hamburger menu on the top left.
3. Select 'Library' from the ***APIs & Services*** dropdown list.
4. Select the API you want to enable.
5. Click on the ***ENABLE*** button.

### How to configure the consent screen?

If you're creating OAuth credentials for the first time, Google asks you to configure the consent screen. To configure the consent screen, follow the steps mentioned below.

1. Access your [Google Cloud Console](https://console.cloud.google.com).
2. Click on the hamburger menu on the top left.
3. Select 'OAuth consent screen' from the ***APIs & Services*** dropdown list.
4. Based on your use-case, select the user type under the ***User Type*** section and click on the ***CREATE*** button.
5. Enter the name of your app in the ***App name*** field.
6. Select the user support email from the ***User support email*** dropdown list.
7. Scroll down to the ***Developer contact information*** section.
8. Enter the email address of the developer in the ***Email addresses*** field.
9. Click on the ***SAVE AND CONTINUE*** button.
10. On the ***Scopes*** tab, scroll down to the bottom and click on the ***SAVE AND CONTINUE*** button.
11. On the ***Test users*** tab, click on the ***SAVE AND CONTINUE*** button.
12. On the ***Summary*** tab, scroll down to the bottom and click on the ***BACK TO DAShBOARD*** button.
13. Under the ***Testing*** section, click on the ***PUBLISH APP*** button.
14. Click on ***CONFIRM*** on the pop-up screen.

### How to implement user impersonification?

To implement user impersonification, make sure to check the ***Enable G Suite Domain-Wide Delegation*** on your Google Cloud Console.

Refer to the [Delegation domain-wide authority to the service account](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority) documentation to learn more.
