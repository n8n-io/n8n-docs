---
title: "SSO for Azure AD"
date: "2021-10-14"
description: This is a step by step guide how to configure SSO in Infor Cloud. Starting with the prerequisites, getting access to the cloud and checking it to add a new service provider.
tags:
  - DOC²
  - Azure Active Directory
  - SSO
---

# Configure Azure Active Directory

## Create SAML SSO in Azure AD

Perform the following steps to add SAML SSO in Azure AD:

1. In Azure, go to your `Azure Active Directory` console
![](/_images/doc2/SSO/Azure_1.png)

2. In the left panel, click `Enterprise applications`
![](/_images/doc2/SSO/Azure_2.png)

3. Click `+ New application`
![](/_images/doc2/SSO/Azure_3.png)

4. Click `+ Create your own application`
![](/_images/doc2/SSO/Azure_4.png)

5. Enter a name for your application. Keep the remaining default selections.
![](/_images/doc2/SSO/Azure_5.png)

6. Click on `Create``


## Assign Users to the SSO Configuration

Next, assign users or groups to the SSO configuration.

:fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" }
Important: You should already have created users and groups in Azure AD. If you don’t have any users or groups, create them now before proceeding.
:fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" }

1. Under `Getting Started`, click `Assign Users and Groups`.

2. Click `+ Add user`
![](/_images/doc2/SSO/Azure_6.png)

3. Select the users and groups you want to assign to this SSO configuration. These users will be able to authenticate Transact using SSO.
![](/_images/doc2/SSO/Azure_7.png)
            Figure 7. Select Users


4. Click `Select`

5. When you’re satisfied with your selection, click `Assign`
![](/_images/doc2/SSO/Azure_8.png)
            Figure 8. Assign Users
![](/_images/doc2/SSO/Azure_9.png)
            Figure 9. Assign Users (cont)

6. Go to the `Groups` view list and find the assigned groups.


## Set up SSO in Azure

Next, you need to finish setting up single-sign-on in Azure.

1. In the left panel, click `Single sign-on`
![](/_images/doc2/SSO/Azure_10.png)
            Figure 11. Single Sign-On

2. Click `SAML`
![](/_images/doc2/SSO/Azure_11.png)
            Figure 12. SAML Card

3. Click `Upload metadata file`
![](/_images/doc2/SSO/Azure_12.png)
            Figure 13. Upload Metadata File

4. Upload the DOC² **metadata.xml**, which you can find in the Settings menu **Integration** under **SSO Service Provider Settings** of your DOC² account.

5. Edit the `Basic SAML Configuration`
![](/_images/doc2/SSO/Azure_13.png)

6. Add the SAML/SSO endpoint to the configuration in Azure. For example: 
```
https://<ServerURL>/dcma/saml/SSO
```
            Figure 15. SAML/SSO Endpoint

7. Enter the appropriate URL for the `Sign on URL` and `Logout URL` fields.
            Figure 16. Sign-on URL and Logout URL

8. Click on `Save`

9. Download the newly generated signing `Certificate (Raw)` and `Federation Metadata XML`.
![](/_images/doc2/SSO/Azure_14.png)
                Figure 21. Download Files

10. Upload the FederationMetadata.xml into the **Identity Service Provider Settings** of your DOC² account which you can find in the Settings menu **Integration**.
![](/_images/doc2/SSO/Azure_15.png)






