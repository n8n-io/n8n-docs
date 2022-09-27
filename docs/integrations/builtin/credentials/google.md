# Google

There are two authentication methods available for Google services nodes, [OAuth2](https://developers.google.com/identity/protocols/oauth2){:target=_blank .external-link} and [Service Account](https://cloud.google.com/iam/docs/understanding-service-accounts){:target=_blank .external-link}. Usually, n8n recommends using OAuth. It's more widely available, and easier to set up. Refer to the [Google documentation: Understanding service accounts](https://cloud.google.com/iam/docs/understanding-service-accounts){:target=_blank .external-link} for guidance on when you need service account.

## Prerequisites

* [Google Cloud](https://cloud.google.com/){:targe=_blank .external-link} account
* [Google Cloud Platform project](https://developers.google.com/workspace/marketplace/create-gcp-project){:targe=_blank .external-link}
* If using Google Perspective: [Request API Access](https://developers.perspectiveapi.com/s/docs-get-started){:targe=_blank .external-link}
* If using Google Ads: [Developer Token](https://developers.google.com/google-ads/api/docs/first-call/dev-token){:targe=_blank .external-link}

## Compatible nodes

Once configured, you can use your credentials to authenticate the following nodes. Most nodes are compatible with OAuth2 authentication. Support for Service Account authentication is limited.

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


## Using OAuth

### Create a new credential in n8n

1. Follow the steps to [Create a credential](/credentials/add-edit-credentials/). If you create a credential by selecting **Create new** in the credentials dropdown in a node, n8n automatically creates the correct credential type for that node. If you select **Credentials > New**, you must browse for the credential type:
	* To connect with a specific service, using resources and operations supported by n8n, choose that service. For example, to create a credential for use in the Gmail node, search for `Gmail`.
	* To create a credential for a [custom API call](/integrations/custom-operations/), select **Google OAuth2 API**. This allows you to create a generic credential, then set its scopes.
2. Note the **OAuth Redirect URL** from the node credential modal. You'll need this in the next section.
![OAuth Callback URL](/_images/integrations/builtin/credentials/google/oauth_callback.png)
3. If you're creating a generic Google OAuth2 API credential (rather than a credential for a specific service), you must provide the scopes for this credential. Refer to [Scopes](#scopes) for more information.

### Set up OAuth in Google Cloud

In your [Google Cloud Console](https://console.cloud.google.com){:targe=_blank .external-link} dashboard:

1. Select the hamburger menu **> APIs & Services > Credentials**. Google takes you to your **Credentials** page.
2. Select **+ CREATE CREDENTIALS > OAuth client ID**.

    !!! note "New users"
        If you're creating OAuth credentials for the first time, you must [configure the consent screen](https://support.google.com/cloud/answer/10311615?hl=en&ref_topic=3473162){:target=_blank .external-link}.
    
3. In the **Application type** dropdown, select **Web application**. Google automatically generates a name.
4. In Google Cloud, select **+ ADD URI**. Paste in the OAuth redirect URL from the previous step.
5. Select **CREATE**.
6. Enable each Google service API that you want to use:
	--8<-- "_snippets/integrations/builtin/credentials/google/enable-apis.md"

### Create and test your connection

In n8n:

1. Enter your new **Client ID** and **Client Secret** from Google Cloud Console in the credentials modal.
2. Select **Sign in with Google** to complete your Google authentication.
3. **Save** your new credentials.

The following video demonstrates the steps described above:

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/gZ6N2H3_vys" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Service Account

Using service accounts is more complex than OAuth2. Before you begin:

* Make sure you really need to use service account. For most use cases, OAuth2 is a better option.
* Read the Google documentation on [Creating and managing service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts){:target=_blank .external-link}.

### Create a new credential in n8n

1. Follow the steps to [Create a credential](/credentials/add-edit-credentials/). 

	!!! note "Generic and specific credentials"
		If you create a credential by selecting **Create new** in the credentials dropdown in a node, n8n automatically creates the correct credential type for that node. If you select **Credentials > New**, you must browse for the credential type:

		* To connect with a specific service, using resources and operations supported by n8n, choose that service. For example, to create a credential for use in the Gmail node, search for `Gmail`.
		* To create a credential for a [custom API call](/integrations/custom-operations/), select **Google API**.

2. Note the **Private Key** from the node credential modal. You'll need this in the next section.

### Set up service account in Google Cloud

In your [Google Cloud Console](https://console.cloud.google.com){:target=_blank .external-link} dashboard:

1. Select the hamburger menu **> APIs & Services > Credentials**. Google takes you to your **Credentials** page.
2. Select **+ CREATE CREDENTIALS > Service account**.
3. Enter a name in **Service account name**, and an ID in **Service account ID**. Refer to [Creating a service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts?hl=en#creating){:target=_blank .external-link} for more information.
4. Select **CREATE AND CONTINUE**.
5. Based on your use-case, you may want to **Select a role** and **Grant users access to this service account**  using the corresponding sections.
6. Select **DONE**.
7. Select your newly created service account under the **Service Accounts** section. Open the **KEYS** tab.
8. Select **ADD KEY > Create new key**.
9. In the modal that appears, select **JSON**, then select **CREATE**. Google saves the file to your computer.
10. Enable each Google service API that you want to use:
	--8<-- "_snippets/integrations/builtin/credentials/google/enable-apis.md"

### Create and test your connection

In n8n:

1. In the **Service Account Email** field, enter the email associated with your new Service Account (you can find this in the **Details** tab in Google Cloud).
2. Enter the **Private Key** from the downloaded JSON file. If you're running an n8n version older than 0.156.0: replace all instances of `\n` in the JSON file with new lines.
3. **Optional**: Click the toggle to enable [**Impersonate a User**](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority){:target=_blank .external-link} and enter the email.
4. **Save** your credentials.

The following video demonstrates the steps described above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/ArXVlpo3y1k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Scopes

Many Google services have multiple possible access scopes. A scope limits what a user can do. Refer to [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes){:target=_blank .external-link} for a list of scopes for all services.

n8n doesn't support all scopes. When creating a generic Google OAuth2 API credential, you can enter scopes from the list. If you enter a scope that n8n doesn't already support, it won't work.

??? Details "Supported scopes"
	| Service | Available scopes |
	| ------- | ---------------- |
	| Gmail | 	https://www.googleapis.com/auth/gmail.labels <br /> https://www.googleapis.com/auth/gmail.addons.current.action.compose <br />	https://www.googleapis.com/auth/gmail.addons.current.message.action <br /> https://mail.google.com/ <br /> https://www.googleapis.com/auth/gmail.modify <br />	https://www.googleapis.com/auth/gmail.compose |
	| Google Ads | https://www.googleapis.com/auth/adwords |
	| Google Analytics | https://www.googleapis.com/auth/analytics <br /> https://www.googleapis.com/auth/analytics.readonly |
	| Google Big Query | https://www.googleapis.com/auth/bigquery |
	| Google Books | https://www.googleapis.com/auth/books |
	| Google Calendar | 	https://www.googleapis.com/auth/calendar <br /> https://www.googleapis.com/auth/calendar.events |
	| Google Cloud Natural Language | https://www.googleapis.com/auth/cloud-language <br /> https://www.googleapis.com/auth/cloud-platform |
	| Google Cloud Storage | https://www.googleapis.com/auth/cloud-platform <br /> https://www.googleapis.com/auth/cloud-platform.read-only <br /> https://www.googleapis.com/auth/devstorage.full_control <br /> https://www.googleapis.com/auth/devstorage.read_only <br /> https://www.googleapis.com/auth/devstorage.read_write |
	| Google Contacts | https://www.googleapis.com/auth/contacts |
	| Google Docs | https://www.googleapis.com/auth/documents <br /> https://www.googleapis.com/auth/drive <br /> https://www.googleapis.com/auth/drive.file |
	| Google Drive | https://www.googleapis.com/auth/drive <br /> https://www.googleapis.com/auth/drive.appdata <br /> https://www.googleapis.com/auth/drive.photos.readonly |
	| Google Firebase Cloud Firestore | https://www.googleapis.com/auth/datastore <br /> https://www.googleapis.com/auth/firebase |
	| Google Firebase Realtime Database | https://www.googleapis.com/auth/userinfo.email <br /> https://www.googleapis.com/auth/firebase.database <br /> https://www.googleapis.com/auth/firebase |
	| Google Perspective | https://www.googleapis.com/auth/userinfo.email |
	| Google Sheets | https://www.googleapis.com/auth/drive.file <br /> https://www.googleapis.com/auth/spreadsheets |
	| Google Slide | https://www.googleapis.com/auth/drive.file <br /> https://www.googleapis.com/auth/presentations |
	| Google Tasks | https://www.googleapis.com/auth/tasks |
	| Google Translate | https://www.googleapis.com/auth/cloud-translation |
	| GSuite Admin | https://www.googleapis.com/auth/admin.directory.group <br /> https://www.googleapis.com/auth/admin.directory.user <br /> https://www.googleapis.com/auth/admin.directory.domain.readonly <br /> https://www.googleapis.com/auth/admin.directory.userschema.readonly |


## Troubleshooting

### Google hasn't verified this app

If using the OAuth authentication method, you might see the warning **Google hasn't verified this app**. To avoid this, you can create OAuth credentials from the same account you want to authenticate. However, if you're using credentials that were generated by another account (by a developer or another third party), do the following in Google Cloud:

1. Select**Advanced**.
2. Select **Go to CREDENTIALS_NAME (unsafe)**. `CREDENTIALS_NAME` is the name of the credentials created by the third party.
3. Grant the requested permissions.

### Service Account cannot access Google Drive files

A Service Account can't access Google Drive files and folders that weren't shared with its associated user email.

1. Access your [Google Cloud Console](https://console.cloud.google.com){:target=_blank .external-link} and copy your Service Account email.
2. Access your [Google Drive](https://drive.google.com){:target=_blank .external-link} and go to the designated file or folder.
3. Right-click on the file or folder and select **Share**.
4. Paste your Service Account email into **Add People and groups**.
5. Select **Editor** for read-write access or **Viewer** for read-only access.
