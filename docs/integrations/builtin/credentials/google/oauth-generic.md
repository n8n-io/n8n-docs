---
title: Google OAuth2 generic
contentType:
  - integration
  - reference
nodeTitle: Google OAuth2 generic
originalFilePath: integrations/builtin/credentials/google/oauth-generic.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/google/oauth-generic
url: https://docs.n8n.io/integrations/builtin/credentials/google/oauth-generic
description: >-
  Documentation for generic OAuth2 Google credentials. Use these credentials to
  authenticate Google services in n8n, a workflow automation platform.
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

# Google OAuth2 generic

This document contains instructions for creating a generic Google OAuth2 API credential for use with [custom operations](../../custom-api-actions-for-existing-nodes.md).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/3hg9lh4E1cKGSLdAAfcv/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* Create a [Google Cloud](https://cloud.google.com/) account.

## Set up OAuth <a href="#set-up-oauth" id="set-up-oauth"></a>

There are five steps to connecting your n8n credential to Google services:

1. [Create a Google Cloud Console project](oauth-generic.md#create-a-google-cloud-console-project).
2. [Enable APIs](oauth-generic.md#enable-apis).
3. [Configure your OAuth consent screen](oauth-generic.md#configure-your-oauth-consent-screen).
4. [Create your Google OAuth client credentials](oauth-generic.md#create-your-google-oauth-client-credentials).
5. [Finish your n8n credential](oauth-generic.md#finish-your-n8n-credential).

### Create a Google Cloud Console project <a href="#create-a-google-cloud-console-project" id="create-a-google-cloud-console-project"></a>

First, create a Google Cloud Console project. If you already have a project, jump to the [next section](oauth-generic.md#enable-apis):

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/paEFxT9cGqxGvuYxg0Ej/" %}

### Enable APIs <a href="#enable-apis" id="enable-apis"></a>

With your project created, enable the APIs you'll need access to:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/WnNE7wjfHbu7rBfeO97t/" %}

### Configure your OAuth consent screen <a href="#configure-your-oauth-consent-screen" id="configure-your-oauth-consent-screen"></a>

If you haven't used OAuth in your Google Cloud project before, you'll need to [configure the OAuth consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent):

1.  Access your [Google Cloud Console - Library](https://console.cloud.google.com/apis/library). Make sure you're in the correct project.

    <figure><img src="../../../.gitbook/assets/google-cloud-project-dropdown (1).png" alt=""><figcaption><p>Check the project dropdown in the Google Cloud top navigation</p></figcaption></figure>
2. Open the left navigation menu and go to **APIs & Services > OAuth consent screen**. Google will redirect you to the Google Auth Platform overview page.
3. Select **Get started** on the **Overview** tab to begin configuring OAuth consent.
4. Enter an **App name** and **User support email** to include on the Oauth screen. Select **Next** to continue.
5. For the **Audience**, select **Internal** for user access within your organization's Google workspace or **External** for any user with a Google account. Refer to Google's [User type documentation](https://support.google.com/cloud/answer/15549945?sjid=17061891731152303663-EU#user-type) for more information on user types. Select **Next** to continue.
6. Select the **Email addresses** Google should use to contact you about changes to your project. Select **Next** to continue.
7. Read and accept the Google's User Data Policy. Select **Continue** and then select **Create**.
8. In the left-hand menu, select **Branding**.
9. In the **Authorized domains** section, select **Add domain**:
   * If you're using n8n's Cloud service, add `n8n.cloud`
   * If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n), add the domain of your n8n instance.
10. Select **Save** at the bottom of the page.

### Create your Google OAuth client credentials <a href="#create-your-google-oauth-client-credentials" id="create-your-google-oauth-client-credentials"></a>

Next, create the OAuth client credentials in Google:

1. Access your [Google Cloud Console](https://console.cloud.google.com/). Make sure you're in the correct project.
2. In the **APIs & Services** section, select [**Credentials**](https://console.cloud.google.com/apis/credentials).
3. Select **+ Create credentials** > **OAuth client ID**.
4. In the **Application type** dropdown, select **Web application**.
5. Google automatically generates a **Name**. Update the **Name** to something you'll recognize in your console.
6. From your n8n credential, copy the **OAuth Redirect URL**. Paste it into the **Authorized redirect URIs** in Google Console.
7. Select **Create**.

### Finish your n8n credential <a href="#finish-your-n8n-credential" id="finish-your-n8n-credential"></a>

With the Google project and credentials fully configured, finish the n8n credential:

1. From Google's **OAuth client created** modal, copy the **Client ID**. Enter this in your n8n credential.
2. From the same Google modal, copy the **Client Secret**. Enter this in your n8n credential.
3.  You must provide the scopes for this credential. Refer to [Scopes](oauth-generic.md#scopes) for more information. Enter multiple scopes in a space-separated list, for example:

    ```
    https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.addons.current.action.compose
    ```
4. In n8n, select **Sign in with Google** to complete your Google authentication.
5. **Save** your new credentials.

## Video <a href="#video" id="video"></a>

The following video demonstrates the steps described above:

{% embed url="https://www.youtube.com/embed/FBGtpWMTppw" %}

## Scopes <a href="#scopes" id="scopes"></a>

Google services have one or more possible access scopes. A scope limits what a user can do. Refer to [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes) for a list of scopes for all services.

n8n doesn't support all scopes. When creating a generic Google OAuth2 API credential, you can enter scopes from the **Supported scopes** list below. If you enter a scope that n8n doesn't already support, it won't work.

<details>

<summary>Supported scopes</summary>

| Service                                     | Available scopes                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gmail                                       | <ul><li><code>https://www.googleapis.com/auth/gmail.labels</code></li><li><code>https://www.googleapis.com/auth/gmail.addons.current.action.compose</code></li><li><code>https://www.googleapis.com/auth/gmail.addons.current.message.action</code></li><li><code>https://mail.google.com/</code></li><li><code>https://www.googleapis.com/auth/gmail.modify</code></li><li><code>https://www.googleapis.com/auth/gmail.compose</code></li></ul> |
| Google Ads                                  | <ul><li><code>https://www.googleapis.com/auth/adwords</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                           |
| Google Analytics                            | <ul><li><code>https://www.googleapis.com/auth/analytics</code></li><li><code>https://www.googleapis.com/auth/analytics.readonly</code></li></ul>                                                                                                                                                                                                                                                                                                 |
| Google BigQuery                             | <ul><li><code>https://www.googleapis.com/auth/bigquery</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                          |
| Google Books                                | <ul><li><code>https://www.googleapis.com/auth/books</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                             |
| Google Calendar                             | <ul><li><code>https://www.googleapis.com/auth/calendar</code></li><li><code>https://www.googleapis.com/auth/calendar.events</code></li></ul>                                                                                                                                                                                                                                                                                                     |
| <p>Google Cloud<br>Natural Language</p>     | <ul><li><code>https://www.googleapis.com/auth/cloud-language</code></li><li><code>https://www.googleapis.com/auth/cloud-platform</code></li></ul>                                                                                                                                                                                                                                                                                                |
| <p>Google Cloud<br>Storage</p>              | <ul><li><code>https://www.googleapis.com/auth/cloud-platform</code></li><li><code>https://www.googleapis.com/auth/cloud-platform.read-only</code></li><li><code>https://www.googleapis.com/auth/devstorage.full_control</code></li><li><code>https://www.googleapis.com/auth/devstorage.read_only</code></li><li><code>https://www.googleapis.com/auth/devstorage.read_write</code></li></ul>                                                    |
| Google Contacts                             | <ul><li><code>https://www.googleapis.com/auth/contacts</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                          |
| Google Docs                                 | <ul><li><code>https://www.googleapis.com/auth/documents</code></li><li><code>https://www.googleapis.com/auth/drive</code></li><li><code>https://www.googleapis.com/auth/drive.file</code></li></ul>                                                                                                                                                                                                                                              |
| Google Drive                                | <ul><li><code>https://www.googleapis.com/auth/drive</code></li><li><code>https://www.googleapis.com/auth/drive.appdata</code></li><li><code>https://www.googleapis.com/auth/drive.photos.readonly</code></li></ul>                                                                                                                                                                                                                               |
| <p>Google Firebase<br>Cloud Firestore</p>   | <ul><li><code>https://www.googleapis.com/auth/datastore</code></li><li><code>https://www.googleapis.com/auth/firebase</code></li></ul>                                                                                                                                                                                                                                                                                                           |
| <p>Google Firebase<br>Realtime Database</p> | <ul><li><code>https://www.googleapis.com/auth/userinfo.email</code></li><li><code>https://www.googleapis.com/auth/firebase.database</code></li><li><code>https://www.googleapis.com/auth/firebase</code></li></ul>                                                                                                                                                                                                                               |
| Google Perspective                          | <ul><li><code>https://www.googleapis.com/auth/userinfo.email</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                    |
| Google Sheets                               | <ul><li><code>https://www.googleapis.com/auth/drive.file</code></li><li><code>https://www.googleapis.com/auth/spreadsheets</code></li></ul>                                                                                                                                                                                                                                                                                                      |
| Google Slide                                | <ul><li><code>https://www.googleapis.com/auth/drive.file</code></li><li><code>https://www.googleapis.com/auth/presentations</code></li></ul>                                                                                                                                                                                                                                                                                                     |
| Google Tasks                                | <ul><li><code>https://www.googleapis.com/auth/tasks</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                             |
| Google Translate                            | <ul><li><code>https://www.googleapis.com/auth/cloud-translation</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                 |
| GSuite Admin                                | <ul><li><code>https://www.googleapis.com/auth/admin.directory.group</code></li><li><code>https://www.googleapis.com/auth/admin.directory.user</code></li><li><code>https://www.googleapis.com/auth/admin.directory.domain.readonly</code></li><li><code>https://www.googleapis.com/auth/admin.directory.userschema.readonly</code></li></ul>                                                                                                     |

</details>

## Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

### Google hasn't verified this app <a href="#google-hasnt-verified-this-app" id="google-hasnt-verified-this-app"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tj49fa4uxtfjnWkAXo65/" %}

### Google Cloud app becoming unauthorized <a href="#google-cloud-app-becoming-unauthorized" id="google-cloud-app-becoming-unauthorized"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/eGnzeqNthIcbNwJqWUD7/" %}
