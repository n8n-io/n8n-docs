# Google

There are two authentication methods available for Google services nodes, [OAuth2](https://developers.google.com/identity/protocols/oauth2) and the [Service Account](https://developers.google.com/identity/protocols/oauth2#serviceaccount) authentication. Refer to the official Google documentation to learn which is appropriate for your case case.

Note that while all nodes are [compatible](#compatible-nodes) with OAuth2 authentication, only some also support Service Account authentication.

## Prerequisites

* [Google Cloud](https://cloud.google.com/) account
* [Google Cloud Platform project](https://developers.google.com/workspace/marketplace/create-gcp-project)
* [Request API Access](https://developers.perspectiveapi.com/s/docs-get-started) (**For Google Perspective Only**)

## Compatible nodes

Once configured, you can use your credentials to authenticate the following nodes:

| Node | OAuth | Service Account |
| :--- | :---: | :-------------: |
| [G Suite Admin](/integrations/nodes/n8n-nodes-base.gSuiteAdmin/) | :white_check_mark: | :x: |
| [Gmail](/integrations/nodes/n8n-nodes-base.gmail/) | :white_check_mark: | :white_check_mark: |
| [Google Analytics](/integrations/nodes/n8n-nodes-base.googleAnalytics/) | :white_check_mark: | :x: |
| [Google BigQuery](/integrations/nodes/n8n-nodes-base.googleBigQuery/) | :white_check_mark: | :x: |
| [Google Books](/integrations/nodes/n8n-nodes-base.googleBooks/) | :white_check_mark: | :white_check_mark: |
| [Google Calendar](/integrations/nodes/n8n-nodes-base.googleCalendar/) | :white_check_mark: | :x: |
| [Google Chat](/integrations/nodes/n8n-nodes-base.googleChat/) | :x: | :white_check_mark: |
| [Google Contacts](/integrations/nodes/n8n-nodes-base.googleContacts/) | :white_check_mark: | :x: |
| [Google Cloud Firestore](/integrations/nodes/n8n-nodes-base.googleCloudFirestore/) | :white_check_mark: | :x: |
| [Google Cloud Natural Language](/integrations/nodes/n8n-nodes-base.googleCloudNaturalLanguage/) | :white_check_mark: | :x: |
| [Google Cloud Realtime Database](/integrations/nodes/n8n-nodes-base.googleCloudRealtimeDatabase/) | :white_check_mark: | :x: |
| [Google Docs](/integrations/nodes/n8n-nodes-base.googleDocs/) | :white_check_mark: | :white_check_mark: |
| [Google Drive](/integrations/nodes/n8n-nodes-base.googleDrive/) | :white_check_mark: | :white_check_mark: |
| [Google Drive Trigger](/integrations/trigger-nodes/n8n-nodes-base.googleDriveTrigger/) | :white_check_mark: | :white_check_mark: |
| [Google Perspective](/integrations/nodes/n8n-nodes-base.googlePerspective/) | :white_check_mark: | :x: |
| [Google Sheets](/integrations/nodes/n8n-nodes-base.googleSheets/) | :white_check_mark: | :white_check_mark: |
| [Google Slides](/integrations/nodes/n8n-nodes-base.googleSlides/) | :white_check_mark: | :white_check_mark: |
| [Google Tasks](/integrations/nodes/n8n-nodes-base.googleTasks/) | :white_check_mark: | :x: |
| [Google Translate](/integrations/nodes/n8n-nodes-base.googleTranslate/) | :white_check_mark: | :white_check_mark: |
| [YouTube](/integrations/nodes/n8n-nodes-base.youTube/) | :white_check_mark: | :x: |

!!! note "Note for n8n.cloud users"
    For the following nodes, you only need to enter the Credentials Name and click on the **Sign in with Google** button in the OAuth section to connect your Google account to n8n:
* [Google Calendar](/integrations/nodes/n8n-nodes-base.googleCalendar/)
* [Google Contacts](/integrations/nodes/n8n-nodes-base.googleContacts/)
* [Google Sheets](/integrations/nodes/n8n-nodes-base.googleSheets/)
* [Google Tasks](/integrations/nodes/n8n-nodes-base.googleTasks/)


## Using OAuth

From your [Google Cloud Console](https://console.cloud.google.com) dashboard:

1. Click on the hamburger menu and select ***APIs & Services > Credentials***.
2. Click on ***+ CREATE CREDENTIALS*** and select ***OAuth client ID***.

    !!! tip ❗️ Note for new users
        If you're creating OAuth credentials for the first time, you will have to [configure the consent screen](https://support.google.com/cloud/answer/10311615?hl=en&ref_topic=3473162).
    

3. From the ***Application type*** dropdown select ***Web application***. A name is automatically generated, change it if desired.
4. From the ***Authorized redirect URIs*** section, select ***+ Add URI***.
5. Enter the ***OAuth Callback URL*** provided in the Google node credential modal:
    ![OAuth Callback URL](/_images/integrations/credentials/google/oauth_callback.png)
6. Click the ***CREATE*** button.

From your n8n instance:

7. Enter your new ***Client ID*** and ***Client Secret*** from Google Cloud Console in the n8n Credentials modal.
8. Enter a ***Credentials Name***.
9. Click on the ***Sign in with Google*** button to complete your Google authentication.
10. ***Save*** your new credentials in n8n.

Now you must [enable](#enable-apis) each Google service (e.g. Sheets, Drive, etc.) API that you want to use.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/gZ6N2H3_vys" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Service Account

From your [Google Cloud Console](https://console.cloud.google.com) dashboard:

1. Click on the hamburger menu and select ***APIs & Services > Credentials***.
2. Click on ***+ CREATE CREDENTIALS*** and select ***Service account***.
3. Enter a name in the ***Service account name*** field.
4. Click on the ***CREATE*** button.
5. Based on your use-case, you may want to ***Select a role*** and ***Grant users access to this service account***  using the corresponding sections.
6. Click ***Done***.
7. Select your newly created service account under the ***Service Accounts*** section and open the ***Keys*** tab.
8. Click on ***ADD KEY*** and select ***Create new key***.
9. In the modal that appears, select ***JSON*** and click ***Create***. The file is saved to your computer.

From you n8n instance:

10. Enter a ***Credentials Name***.
11. In the ***Service Account Email*** field, enter the email associated with your new Service Account (visible in the ***Details*** tab).
12. Enter the ***Private Key*** from the downloaded JSON file. **If you are running an n8n version older than 0.156.0: Replace all instances of `\n` in the JSON file with new lines.**
13. (***Optional***) Click the toggle to enable [***Impersonate a User***](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority) and enter the desired email.
14. ***Save*** your credentials.

Now you must [enable](#enable-apis) each Google service (e.g. Sheets, Drive, etc.) API that you want to use.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/ArXVlpo3y1k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Enable APIs

To enable an API, follow the steps below:

1. Access your [Google Cloud Console](https://console.cloud.google.com).
2. From the hamburger menu select ***APIs & Services > Library***.
3. Search for and select the API(s) you want to enable.
5. Click on the ***ENABLE*** button.

## FAQs

### Google hasn't verified this app

If using the OAuth authentication method, you might come across the warning "Google hasn't verified this app".
To avoid this, you can create OAuth credentials from the same account you want to authenticate. However, if you're using credentials that were generated by another account (by a developer or another third party), you can follow the steps mentioned below:

1. Click on ***Advanced***.
2. Click on ***Go to CREDENTIALS_NAME (unsafe)***. `CREDENTIALS_NAME` is the name of the credentials created by the third party.
3. Grant the requested permissions.
