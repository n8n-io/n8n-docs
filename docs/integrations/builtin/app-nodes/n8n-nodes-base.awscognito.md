---
title: AWS Cognito node documentation
description: Learn how to use the AWS Cognito node in n8n. Follow technical documentation to integrate AWS Cognito node into your workflows.
contentType: [integration, reference]
---

# AWS Cognito node

Use the AWS Cognito node to automate work in AWS Cognito and integrate AWS Cognito with other applications. n8n has built-in support for a wide range of AWS Cognito features, which includes creating, retrieving, updating, and deleting groups, users, and user pools.

On this page, you'll find a list of operations the AWS Cognito node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/aws.md).
///


## Operations

* Group:
	* Create: Create a new group.
	* Delete: Delete an existing group.
	* Get: Retrieve details about an existing group.
	* Get Many: Retrieve a list of groups.
	* Update: Update an existing group.
* User:
	* Add to Group: Add an existing user to a group.
	* Create: Create a new user.
	* Delete: Delete a user.
	* Get: Retrieve information about an existing user.
	* Get Many: Retrieve a list of users.
	* Remove From Group: Remove a user from a group.
	* Update: Update an existing user.
* User Pool:
	* Get: Retrieve information about an existing user pool.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'aws-cognito') ]]

## Related resources

<!-- add a link to the service's documentation. This should usually go direct to the API docs -->
Refer to [AWS Cognito's documentation](https://docs.aws.amazon.com/cognito/) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
