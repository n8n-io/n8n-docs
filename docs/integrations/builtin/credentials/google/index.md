# Google

There are two authentication methods available for Google services nodes, [OAuth2](https://developers.google.com/identity/protocols/oauth2){:target=_blank .external-link} and [Service Account](https://cloud.google.com/iam/docs/understanding-service-accounts){:target=_blank .external-link}. Usually, n8n recommends using OAuth. It's more widely available, and easier to set up. Refer to the [Google documentation: Understanding service accounts](https://cloud.google.com/iam/docs/understanding-service-accounts){:target=_blank .external-link} for guidance on when you need service account.



## Compatible nodes

Once configured, you can use your credentials to authenticate the following nodes. Most nodes are compatible with OAuth2 authentication. Support for Service Account authentication is limited.

??? Details "Compatibility"
	| Node | OAuth | Service Account |
	| :--- | :---: | :-------------: |
	| [G Suite Admin](/integrations/builtin/app-nodes/n8n-nodes-base.gSuiteAdmin/) | :white_check_mark: | :x: |
	| [Google Ads](/integrations/builtin/app-nodes/n8n-nodes-base.googleAds/) | :white_check_mark: | :x: |
	| [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/) | :white_check_mark: | :white_check_mark: |
	| [Google Analytics](/integrations/builtin/app-nodes/n8n-nodes-base.googleAnalytics/) | :white_check_mark: | :x: |
	| [Google BigQuery](/integrations/builtin/app-nodes/n8n-nodes-base.googleBigQuery/) | :white_check_mark: | :x: |
	| [Google Books](/integrations/builtin/app-nodes/n8n-nodes-base.googleBooks/) | :white_check_mark: | :white_check_mark: |
	| [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googleCalendar/) | :white_check_mark: | :x: |
	| [Google Chat](/integrations/builtin/app-nodes/n8n-nodes-base.googleChat/) | :x: | :white_check_mark: |
	| [Google Cloud Storage](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudStorage/) | :white_check_mark: | :x: |
	| [Google Contacts](/integrations/builtin/app-nodes/n8n-nodes-base.googleContacts/) | :white_check_mark: | :x: |
	| [Google Cloud Firestore](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudFirestore/) | :white_check_mark: | :x: |
	| [Google Cloud Natural Language](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudNaturalLanguage/) | :white_check_mark: | :x: |
	| [Google Cloud Realtime Database](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudRealtimeDatabase/) | :white_check_mark: | :x: |
	| [Google Docs](/integrations/builtin/app-nodes/n8n-nodes-base.googleDocs/) | :white_check_mark: | :white_check_mark: |
	| [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/) | :white_check_mark: | :white_check_mark: |
	| [Google Drive Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.googleDriveTrigger/) | :white_check_mark: | :white_check_mark: |
	| [Google Perspective](/integrations/builtin/app-nodes/n8n-nodes-base.googlePerspective/) | :white_check_mark: | :x: |
	| [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/) | :white_check_mark: | :white_check_mark: |
	| [Google Slides](/integrations/builtin/app-nodes/n8n-nodes-base.googleSlides/) | :white_check_mark: | :white_check_mark: |
	| [Google Tasks](/integrations/builtin/app-nodes/n8n-nodes-base.googleTasks/) | :white_check_mark: | :x: |
	| [Google Translate](/integrations/builtin/app-nodes/n8n-nodes-base.googleTranslate/) | :white_check_mark: | :white_check_mark: |
	| [YouTube](/integrations/builtin/app-nodes/n8n-nodes-base.youTube/) | :white_check_mark: | :x: |

!!! note "Note for n8n Cloud users"
    For the following nodes, you can authenticate by entering the **Credentials Name** and selecting **Sign in with Google** in the OAuth section to connect your Google account to n8n:

    * [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googleCalendar/)
    * [Google Contacts](/integrations/builtin/app-nodes/n8n-nodes-base.googleContacts/)
    * [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/)
    * [Google Tasks](/integrations/builtin/app-nodes/n8n-nodes-base.googleTasks/)




