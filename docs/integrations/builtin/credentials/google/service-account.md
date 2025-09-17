---
title: Google Service Account
description: Documentation for service account Google credentials. Use these credentials to authenticate Google in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Google: Service Account

Using service accounts is more complex than OAuth2. Before you begin:

* Check if your node is [compatible](/integrations/builtin/credentials/google/index.md#compatible-nodes) with Service Account.
* Make sure you need to use Service Account. For most use cases, [OAuth2](/integrations/builtin/credentials/google/oauth-single-service.md) is a better option.
* Read the Google documentation on [Creating and managing service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts).

## Prerequisites

* Create a [Google Cloud](https://cloud.google.com/) account.

## Set up Service Account

There are four steps to connecting your n8n credential to a Google Service Account:

1. [Create a Google Cloud Console project](#create-a-google-cloud-console-project).
1. [Enable APIs](#enable-apis).
1. [Set up Google Cloud Service Account](#set-up-google-cloud-service-account).
1. [Finish your n8n credential](#finish-your-n8n-credential).

### Create a Google Cloud Console project

First, create a Google Cloud Console project. If you already have a project, jump to the next section:

--8<-- "_snippets/integrations/builtin/credentials/google/create-google-cloud-project.md"

### Enable APIs

With your project created, enable the APIs you'll need access to:

--8<-- "_snippets/integrations/builtin/credentials/google/enable-apis.md"

### Set up Google Cloud Service Account

1. Access your [Google Cloud Console - Library](https://console.cloud.google.com/apis/library). Make sure you're in the correct project.

	<figure markdown="span">
	![The project dropdown in the Google Cloud top navigation](/_images/integrations/builtin/credentials/google/google-cloud-project-dropdown.png)
	<figcaption>Check the project dropdown in the Google Cloud top navigation</figcaption>
	</figure>

1. Open the left navigation menu and go to **APIs & Services > Credentials**. Google takes you to your **Credentials** page.
2. Select **+ Create credentials > Service account**.
3. Enter a name in **Service account name** and an ID in **Service account ID**. Refer to [Creating a service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts?hl=en#creating) for more information.
4. Select **Create and continue**.
5. Based on your use-case, you may want to **Select a role** and **Grant users access to this service account**  using the corresponding sections.
6. Select **Done**.
7. Select your newly created service account under the **Service Accounts** section. Open the **Keys** tab.
8. Select **Add key > Create new key**.
9. In the modal that appears, select **JSON**, then select **CREATE**. Google saves the file to your computer.

### Finish your n8n credential

With the Google project and credentials fully configured, finish the n8n credential:

1. Open the downloaded JSON file.
2. Copy the `client_email` and enter it in your n8n credential as the **Service Account Email**.
3. Copy the `private_key`. Don't include the surrounding `"` marks. Enter this as the **Private Key** in your n8n credential.

	///warning | Older versions of n8n
	If you're running an n8n version older than 0.156.0, replace all instances of `\n` in the JSON file with new lines.
	///

4. **Optional**: Choose if you want to [**Impersonate a User**](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority) (turned on).
    1. To use this option, you must [Enable domain-wide delegation](#enable-domain-wide-delegation) for the service account as a Google Workspace super admin.
	1. Enter the **Email** of the user you want to impersonate.
5. If you plan to use this credential with the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node, turn on **Set up for use in HTTP Request node**.
	1. With this setting turned on, you'll need to add **Scope(s)** for the node. n8n prepopulates some scopes. Refer to [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes) for more information.
6. **Save** your credentials.

## Video

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/FzQzGODb5Gk?si=YR9vDaTet8vsj-y2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Troubleshooting

### Service Account can't access Google Drive files

<!-- vale from-microsoft.FirstPerson = NO -->
/// danger | No access to my drive
Google no longer allows Service Accounts created after April 15, 2025 to access `my drive`. Service Accounts now only have access to shared drives.

While not recommended, if you need to use a Service Account to access `my drive`, you can do so by [enabling domain-wide delegation](#enable-domain-wide-delegation). You can learn more in [this post in the community](https://community.n8n.io/t/please-please-help-upload-file-google-drive-node-with-service-account-not-working/147750/15).
///
<!-- vale from-microsoft.FirstPerson = YES -->

A Service Account can't access Google Drive files and folders that weren't shared with its associated user email.

1. Access your [Google Cloud Console](https://console.cloud.google.com) and copy your Service Account email.
2. Access your [Google Drive](https://drive.google.com) and go to the designated file or folder.
3. Right-click on the file or folder and select **Share**.
4. Paste your Service Account email into **Add People and groups**.
5. Select **Editor** for read-write access or **Viewer** for read-only access.

### Enable domain-wide delegation

To impersonate a user with a service account, you must enable domain-wide delegation for the service account.

/// warning | Not recommended
Google recommends you [avoid using domain-wide delegation](https://cloud.google.com/iam/docs/best-practices-service-accounts#domain-wide-delegation), as it allows impersonation of any user (including super admins) and can pose a security risk.
///

To delegate domain-wide authority to a service account, you must be a super administrator for the Google Workspace domain. Then:

1. From your Google Workspace domain's [Admin console](https://admin.google.com/), select the hamburger menu, then select **Security > Access and data control > API Controls**.
2. In the **Domain wide delegation** pane, select **Manage Domain Wide Delegation**.
3. Select **Add new**.
4. In the **Client ID** field, enter the service account's **Client ID**. To get the Client ID:
    * Open your Google Cloud Console project, then open the [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) page.
    * Copy the **OAuth 2 Client ID** and use this as the **Client ID** for the **Domain Wide Delegation**.
5. In the **OAuth scopes** field, enter a list of comma-separate scopes to grant your application access. For example, if your application needs domain-wide full access to the Google Drive API and the Google Calendar API, enter: `https://www.googleapis.com/auth/drive, https://www.googleapis.com/auth/calendar`.
6. Select **Authorize**.

It can take from 5 minutes up to 24 hours before you can impersonate all users in your Workspace.
