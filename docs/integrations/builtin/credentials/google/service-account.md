---
title: Google Service Account
contentType:
  - integration
  - reference
nodeTitle: Google Service Account
originalFilePath: integrations/builtin/credentials/google/service-account.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/google/service-account
url: https://docs.n8n.io/integrations/builtin/credentials/google/service-account
description: >-
  Documentation for service account Google credentials. Use these credentials to
  authenticate Google in n8n, a workflow automation platform.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Google Service Account

Using service accounts is more complex than OAuth2. Before you begin:

* Check if your node is [compatible](./#compatible-nodes) with Service Account.
* Make sure you need to use Service Account. For most use cases, [OAuth2](oauth-single-service.md) is a better option.
* Read the Google documentation on [Creating and managing service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts).

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* Create a [Google Cloud](https://cloud.google.com/) account.

## Set up Service Account <a href="#set-up-service-account" id="set-up-service-account"></a>

There are four steps to connecting your n8n credential to a Google Service Account:

1. [Create a Google Cloud Console project](service-account.md#create-a-google-cloud-console-project).
2. [Enable APIs](service-account.md#enable-apis).
3. [Set up Google Cloud Service Account](service-account.md#set-up-google-cloud-service-account).
4. [Finish your n8n credential](service-account.md#finish-your-n8n-credential).

### Create a Google Cloud Console project <a href="#create-a-google-cloud-console-project" id="create-a-google-cloud-console-project"></a>

First, create a Google Cloud Console project. If you already have a project, jump to the next section:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/paEFxT9cGqxGvuYxg0Ej/" %}

### Enable APIs <a href="#enable-apis" id="enable-apis"></a>

With your project created, enable the APIs you'll need access to:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/WnNE7wjfHbu7rBfeO97t/" %}

### Set up Google Cloud Service Account <a href="#set-up-google-cloud-service-account" id="set-up-google-cloud-service-account"></a>

1.  Access your [Google Cloud Console - Library](https://console.cloud.google.com/apis/library). Make sure you're in the correct project.

    <figure><img src="../../../.gitbook/assets/google-cloud-project-dropdown (1).png" alt=""><figcaption><p>Check the project dropdown in the Google Cloud top navigation</p></figcaption></figure>
2. Open the left navigation menu and go to **APIs & Services > Credentials**. Google takes you to your **Credentials** page.
3. Select **+ Create credentials > Service account**.
4. Enter a name in **Service account name** and an ID in **Service account ID**. Refer to [Creating a service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts?hl=en#creating) for more information.
5. Select **Create and continue**.
6. Based on your use-case, you may want to **Select a role** and **Grant users access to this service account** using the corresponding sections.
7. Select **Done**.
8. Select your newly created service account under the **Service Accounts** section. Open the **Keys** tab.
9. Select **Add key > Create new key**.
10. In the modal that appears, select **JSON**, then select **CREATE**. Google saves the file to your computer.

### Finish your n8n credential <a href="#finish-your-n8n-credential" id="finish-your-n8n-credential"></a>

With the Google project and credentials fully configured, finish the n8n credential:

1. Open the downloaded JSON file.
2. Copy the `client_email` and enter it in your n8n credential as the **Service Account Email**.
3.  Copy the `private_key`. Don't include the surrounding `"` marks. Enter this as the **Private Key** in your n8n credential.<br>

    <div data-gb-custom-block data-tag="hint" data-style="warning" class="hint hint-warning"><p><strong>Older versions of n8n</strong></p><p>If you're running an n8n version older than 0.156.0, replace all instances of <code>\n</code> in the JSON file with new lines.</p></div>
4. **Optional**: Choose if you want to [**Impersonate a User**](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority) (turned on).
   1. To use this option, you must [Enable domain-wide delegation](service-account.md#enable-domain-wide-delegation) for the service account as a Google Workspace super admin.
   2. Enter the **Email** of the user you want to impersonate.
5. If you plan to use this credential with the [HTTP Request](../../core-nodes/n8n-nodes-base.httprequest/) node, turn on **Set up for use in HTTP Request node**.
   1. With this setting turned on, you'll need to add **Scope(s)** for the node. n8n prepopulates some scopes. Refer to [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes) for more information.
6. **Save** your credentials.

## Video <a href="#video" id="video"></a>

{% embed url="https://www.youtube.com/embed/FzQzGODb5Gk?si=YR9vDaTet8vsj-y2" %}

## Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

### Service Account can't access Google Drive files <a href="#service-account-cant-access-google-drive-files" id="service-account-cant-access-google-drive-files"></a>

{% hint style="danger" %}
**No access to my drive**

Google no longer allows Service Accounts created after April 15, 2025 to access `my drive`. Service Accounts now only have access to shared drives.

While not recommended, if you need to use a Service Account to access `my drive`, you can do so by [enabling domain-wide delegation](service-account.md#enable-domain-wide-delegation). You can learn more in [this post in the community](https://community.n8n.io/t/please-please-help-upload-file-google-drive-node-with-service-account-not-working/147750/15).
{% endhint %}

A Service Account can't access Google Drive files and folders that weren't shared with its associated user email.

1. Access your [Google Cloud Console](https://console.cloud.google.com) and copy your Service Account email.
2. Access your [Google Drive](https://drive.google.com) and go to the designated file or folder.
3. Right-click on the file or folder and select **Share**.
4. Paste your Service Account email into **Add People and groups**.
5. Select **Editor** for read-write access or **Viewer** for read-only access.

### Enable domain-wide delegation <a href="#enable-domain-wide-delegation" id="enable-domain-wide-delegation"></a>

To impersonate a user with a service account, you must enable domain-wide delegation for the service account.

{% hint style="warning" %}
**Not recommended**

Google recommends you [avoid using domain-wide delegation](https://cloud.google.com/iam/docs/best-practices-service-accounts#domain-wide-delegation), as it allows impersonation of any user (including super admins) and can pose a security risk.
{% endhint %}

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
