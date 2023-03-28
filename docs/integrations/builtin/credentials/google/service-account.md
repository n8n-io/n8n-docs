---
title: Google Service Account - n8n Documentation
description: Documentation for service account Google credentials. Use these credentials to authenticate Google in n8n, a workflow automation platform.
---

# Google: Service Account

Using service accounts is more complex than OAuth2. Before you begin:

* Check if your node is [compatible](/integrations/builtin/credentials/google/#compatible-nodes) with Service Account.
* Make sure you need to use service account. For most use cases, OAuth2 is a better option.
* Read the Google documentation on [Creating and managing service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts){:target=_blank .external-link}.


## Prerequisites

* [Google Cloud](https://cloud.google.com/){:targe=_blank .external-link} account
* [Google Cloud Platform project](https://developers.google.com/workspace/marketplace/create-gcp-project){:targe=_blank .external-link}

## Set up Service Account

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

	??? Details "View screenshot"
		![Access the Credentials page for APIs and services](/_images/integrations/builtin/credentials/google/service-account-api-services-credentials.png)

2. Select **+ CREATE CREDENTIALS > Service account**.

	??? Details "View screenshot"
		![Access the Credentials page for APIs and services](/_images/integrations/builtin/credentials/google/service-account-create-credentials.png)

3. Enter a name in **Service account name**, and an ID in **Service account ID**. Refer to [Creating a service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts?hl=en#creating){:target=_blank .external-link} for more information.
4. Select **CREATE AND CONTINUE**.
5. Based on your use-case, you may want to **Select a role** and **Grant users access to this service account**  using the corresponding sections.
6. Select **DONE**.
7. Select your newly created service account under the **Service Accounts** section. Open the **KEYS** tab.
8. Select **ADD KEY > Create new key**.

	??? Details "View screenshot"
		![Create a new key](/_images/integrations/builtin/credentials/google/service-account-create-key.png)

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

## Troubleshooting

### Service Account cannot access Google Drive files

A Service Account can't access Google Drive files and folders that weren't shared with its associated user email.

1. Access your [Google Cloud Console](https://console.cloud.google.com){:target=_blank .external-link} and copy your Service Account email.
2. Access your [Google Drive](https://drive.google.com){:target=_blank .external-link} and go to the designated file or folder.
3. Right-click on the file or folder and select **Share**.
4. Paste your Service Account email into **Add People and groups**.
5. Select **Editor** for read-write access or **Viewer** for read-only access.

