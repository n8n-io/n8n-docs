---
title: LinkedIn
description: Documentation for the LinkedIn node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# LinkedIn

Use the LinkedIn node to automate work in LinkedIn, and integrate LinkedIn with other applications. n8n supports creating posts.

On this page, you'll find a list of operations the LinkedIn node supports and links to more resources.

/// note | Credentials
Refer to [LinkedIn credentials](/integrations/builtin/credentials/linkedIn/) for guidance on setting up authentication. 
///

/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [LinkedIn integrations](https://n8n.io/integrations/linkedin/){:target="_blank" .external-link} list.
///

## Operations

* Post
    * Create

## Parameters

* **Post As**: choose whether to post as a **Person** or **Organization**.
* **Person Name or ID** and **Organization URN**: enter an identifier for the person or organization.

	/// note | Posting as organization
	If posting as an Organization enter the organization number in the URN field. For example, `03262013` not `urn:li:company:03262013`.
	///
	
* **Text**: the post contents.
* **Media Category**: use this when including images or article URLs in your post.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/linkedin/){:target=_blank .external-link} on n8n's website.

Refer to [LinkedIn's API documentation](https://learn.microsoft.com/en-us/linkedin/){:target=_blank .external-link} for more information about the service.





