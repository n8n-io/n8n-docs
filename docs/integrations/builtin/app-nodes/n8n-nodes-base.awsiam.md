---
title: AWS IAM node documentation
description: Learn how to use the AWS IAM node in n8n. Follow technical documentation to integrate AWS IAM node into your workflows.
contentType: [integration, reference]
---

# AWS IAM node

Use the AWS IAM node to automate work in AWS Identity and Access Management (IAM) and integrate AWS IAM with other applications. n8n has built-in support for a wide range of AWS IAM features, which includes creating, updating, getting and deleting users and groups as well as managing group membership.

On this page, you'll find a list of operations the AWS IAM node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/aws.md).
///


## Operations

* **User**:
	* **Add to Group**: Add an existing user to a group.
	* **Create**: Create a new user.
	* **Delete**: Delete a user.
	* **Get**: Retrieve a user.
	* **Get Many**: Retrieve a list of users.
	* **Remove From Group**: Remove a user from a group.
	* **Update**: Update an existing user.
* **Group**:
	* **Create**: Create a new group.
	* **Delete**: Create a new group.
	* **Get**: Retrieve a group.
	* **Get Many**: Retrieve a list of groups.
	* **Update**: Update an existing group.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'aws-iam') ]]

## Related resources

<!-- add a link to the service's documentation. This should usually go direct to the API docs -->
Refer to the [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/APIReference/welcome.html) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
