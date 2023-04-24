---
title: LinkedIn credentials
description: Documentation for LinkedIn credentials. Use these credentials to authenticate LinkedIn in n8n, a workflow automation platform.
---

# LinkedIn credentials

You can use these credentials to authenticate the following nodes with LinkedIn.

- [LinkedIn](/integrations/builtin/app-nodes/n8n-nodes-base.linkedin/)


## Prerequisites

* A [LinkedIn](https://www.linkedin.com/){:target=_blank .external-link} account.
* A LinkedIn Company Page.

## Using OAuth

!!! note "Note for n8n Cloud users"
    You can skip this setup. Enter the **Credentials Name** and select **Connect my account** to connect your LinkedIn account to n8n.

This section provides outline steps for setting up OAuth with LinkedIn. Refer to [LinkedIn's documentation](https://learn.microsoft.com/en-gb/linkedin/){:target=_blank .external-link} for detailed information.

To enable OAuth, you need to:

1. Create a [new app](https://www.linkedin.com/developers/apps/new){:target=_blank .external-link}.
	* Provide a LinkedIn Company Page for **LinkedIn Page**. Refer to [Associate an App with a LinkedIn Page](https://www.linkedin.com/help/linkedin/answer/a548360){:target=_blank .external-link} for more guidance.
2. Enable APIs for your app. You need to enable **Share on LinkedIn** and **Sign In with LinkedIn**.

!!! note "Posting from organization accounts"
	To post as an organization, you need to put your app through LinkedIn's [Community Management App Review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review){:target=_blank .external-link} process.
