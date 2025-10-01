---
title: AWS Elastic Load Balancing node documentation
description: Learn how to use the AWS Elastic Load Balancing node in n8n. Follow technical documentation to integrate AWS Elastic Load Balancing node into your workflows.
contentType: [integration, reference]
---

# AWS Elastic Load Balancing node

Use the AWS Elastic Load Balancing node to automate work in AWS ELB, and integrate AWS ELB with other applications. n8n has built-in support for a wide range of AWS ELB features, including adding, getting, removing, deleting certificates and load balancers.

On this page, you'll find a list of operations the AWS ELB node supports and links to more resources.

/// note | Credentials
Refer to [AWS ELB credentials](/integrations/builtin/credentials/aws.md) for guidance on setting up authentication. 
///

## Operations

* Listener Certificate
	* Add
	* Get Many
	* Remove
* Load Balancer
	* Create
	* Delete
	* Get
	* Get Many

This node supports creating and managing application and network load balancers. It doesn't currently support gateway load balancers.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'aws-elb') ]]

## Related resources

Refer to [AWS ELB's documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html) for more information on this service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

