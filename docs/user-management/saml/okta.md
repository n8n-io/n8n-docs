---
title: Okta Workforce Identity SAML setup
description: Use Okta Workforce Identity with n8n.
contentType: tutorial
---

# Okta Workforce Identity SAML setup

Set up SAML SSO in n8n with Okta.

/// note | Workforce Identity and Customer Identity
This guide covers setting up Workforce Identity. This is the original Okta product. Customer Identity is Okta's name for Auth0, which they've acquired.
///
## Prerequisites

You need an Okta Workforce Identity account, and the redirect URL and entity ID from n8n's SAML settings.

Okta Workforce may enforce two factor authentication for users, depending on your Okta configuration.

Read the [Set up SAML](/user-management/saml/setup.md) guide first.

## Setup

In addition to the following instructions, [this PDF](n8n-saml-with-okta.pdf) provides visual step-by-step guide on how to setup SAML in n8n with Okta.

1. In your Okta admin panel, select **Applications** > **Applications**.
1. Select **Create App Integration**. Okta opens the app creation modal.
1. Select **SAML 2.0**, then select **Next**.
1. On the **General Settings** tab, enter `n8n` as the **App name**. 
1. Select **Next** .
1. On the **Configure SAML** tab, complete the following **General** fields:
	* **Single sign-on URL**: the **Redirect URL** from n8n.
	* **Audience URI (SP Entity ID)**: the **Entity ID** from n8n.
	* **Default RelayState**: leave this empty.
	* **Name ID format**: `EmailAddress`.
	* **Application username**: `Okta username`.
	* **Update application username on**: `Create and update`.
1. Create **Attribute Statements**:
	
	| **Name** | **Name format** | **Value** |
	| -------- | --------------- | --------- |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/firstname` | URI Reference | user.firstName |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/lastname` | URI Reference | user.lastName |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn` | URI Reference | user.login |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` | URI Reference | user.email |
	
1. Select **Next**. Okta may prompt you to complete a marketing form, or may take you directly to your new n8n Okta app.
1. Assign the n8n app to people:
	1. On the n8n app dashboard in Okta, select **Assignments**.
	1. Select **Assign** > **Assign to People**. Okta displays a modal with a list of available people.
	1. Select **Assign** next to the person you want to add. Okta displays a prompt to confirm the username.
	1. Leave the username as email address. Select **Save and Go Back**.
	1. Select **Done**.
1. Get the metadata XML: on the **Sign On** tab, copy the Metadata URL. Navigate to it, and copy the XML. Paste this into **Identity Provider Settings** in n8n.
1. Select **Save settings**.
1. Select **Test settings**. n8n opens a new tab. If you're not currently logged in, Okta prompts you to sign in. n8n then displays a success message confirming the attributes returned by Okta.

### Instance and project access provisioning

See the [Set up SAML page](/user-management/saml/setup.md#instance-and-project-access-provisioning) for additional information of this feature.

**Adding the required attributes**

1. In your Okta admin panel, select **Applications** > **Applications**.
2. Go to the configuration of your n8n application
3. On the **General** tab, click **Edit** next to **SAML Settings**
4. In the page that opens, continue to step 2: **Configure SAML**
5. Add the following two **Attribute Statements**:

	| **Name** | **Name format** | **Value** |
	| -------- | --------------- | --------- |
	| n8n_instance_role | Basic | appuser.n8n_instance_role |
	| n8n_projects | Basic | appuser.n8n_projects |

6. Click **Next**
7. Click **Finish**

**Updating the app profile**

1. In your Okta admin panel, select **Directory** > **Profile Editor**.
2. Go to the profile of your n8n application
3. Click **Add Attribute**
4. Add the **n8n_instance_role** attribute
	* **Data type**: string
	* **Display name**: n8n_instance_role
	* **Variable name**: n8n_instance_role
	* **Attribute type**: Group
4. Add the **n8n_projects** attribute
	* **Data type**: string array
	* **Display name**: n8n_projects
	* **Variable name**: n8n_projects
	* **Attribute type**: Group
	* **Group priority**: Combine values across groups

Now when you go to **Directory** > **Groups** and edit the assigned n8n application, you can configure the **n8n_instance_role** and **n8n_projects** to be sent to n8n upon logging in via SAML.
