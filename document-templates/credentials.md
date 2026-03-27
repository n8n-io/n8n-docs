<!--
# How to use this template

1. Make a new branch. If working on an internal ticket, include it at the start of the name. For example, DOC-123-feature-summary.
2. Create a new file, or find the file you want to edit, in integrations/builtin/credentials/. If creating a new file, the name should be the integration name.
3. Copy the template into the file (don't copy this comment).
4. Placeholder text is in _italic_ or between <>. Make sure to replace it!
5. Use the "Low" priority credential section unless you've been told otherwise. Refer to https://docs.google.com/spreadsheets/d/14YVtqhVnKH2d59LmldyqcK2OW3-2KgHYVaDSFx-8oeM/edit?gid=0#gid=0 for priority breakdown from July 2024.
6. Before publishing, delete any comments.

Use the style guide: https://github.com/n8n-io/n8n-docs/wiki
You can find more info on working with the docs project in the README: https://github.com/n8n-io/n8n-docs/blob/main/README.md
-->

<!--
Set the meta title and meta description in the frontmatter
-->

---
title: _Name_ credentials
description: Documentation for the _Name_ credentials. Use these credentials to authenticate _Name_ in n8n, a workflow automation platform.
contentType: [integration, reference]
---

<!-- 
The title should be the name of the integration.
Match the brand name exactly. For example, GitHub NOT Github
-->
# _Name_ credentials

You can use these credentials to authenticate the following nodes:

* _List of apps_
* _That use these credentials_

<!--if this is a credential-only node, use this snippet instead-->
--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

<!-- If this credential has numerous prerequisites, include the Prerequisites section below and remove the account reference in the in the Using_Auth method_ section.
If a single prereq. like having an account, delete the Prerequisites section here and just update the intro statement in the Using _Auth method_ section -->
## Prerequisites

_Include info on services they need to sign up for or required account settings/permissions_

## Supported authentication methods

* _List of supported auth methods. Identify if methods should only be used for certain purposes_

## Related resources

<!-- add a link to the service's documentation. This should usually go directly to the API credential docs. Amend the link text if necessary. -->
Refer to [_Name_'s API documentation]() for more information about the service.


<!-- If this is a credential-only node, add a link to the node page on n8n's website. For example: https://n8n.io/integrations/gmail/ 
This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/_Name_/) on n8n's website. -->


## Using _Auth method_

To configure this credential, you'll need a _add link to account login or app page_ account and:

- _List of fields they'll need to fill out within n8n and a brief description of what those fields are_

<!-- For "Medium," "High," or "Critical" credentials, use this section. For "Low" credentials, delete it. -->
_Add an intro statement that makes sense. For example: To generate an access token, create a Slack app:_

1. _Detailed numbered instructions to configure credential. Add links to specific docs here if there are any that are relevant._

<!-- For all credentials, include a link to the service's documentation on this type of authentication. This usually goes directly to API credentials, OAuth, etc.
Amend the link/sentence text as necessary. -->
Refer to [_Name_'s API documentation]() for more information about authenticating to the service.

<!-- IF OAUTH FOR CLOUD-HOSTED DOESN'T REQUIRE ANY SETUP, use the section below. Otherwise omit -->
--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

<!-- If OAuth method, self-hosted usually needs to configure OAuth from scratch. -->
<!-- For low or unprioritized credentials, use this statement and delete the next one -->
If you're [self-hosting](/hosting/index.md) n8n, you'll need to _create an app_ to configure OAuth2. Refer to [_Name_'s OAuth documentation]() for more information about setting up OAuth2.

<!-- For Medium, High, or Critical credentials, use this section: -->
If you're [self-hosting](/hosting/index.md) n8n, you'll need to _create an app_ to configure OAuth2. To do so:

1. _Detailed numbered instructions to create app for OAuth2 and configure credential. Add links to specific docs here if there are any that are relevant._

Refer to [_Name_'s OAuth documentation]() for more information about setting up OAuth2.

## Common issues

<!-- 
if the node is small enough for a single page, add the sentence below. Create a subheading below this for each error, quirk, pain point, or other complex topic that might trip people up
-->
Here are some common errors and issues with the _Name_ node and steps to resolve or troubleshoot them.
<!-- 
If the node is large enough to warrant subpages, create a separate Common issues page using the common-issues.md template and link to it here using this text:

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/_filepath_.md).

-->
