---
title: Debug Helper
description: Documentation for the Debug Helper node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Debug Helper

The Debug Helper node can be used to trigger different error types or generate random datasets to help test n8n workflows.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Debug Helper integrations](https://n8n.io/integrations/debughelper/){:target=_blank .external-link} list.
///

## Operations

Operations are called **Categories** in this node.

* Do Nothing
* Throw Error
* Out Of Memory
* Generate Random Data
	* Address
	* Coordinates
	* Credit Card
	* Email
	* IPv4
	* IPv6
	* MAC
	* NanoIds
	* URL
	* User Data
	* UUID
	* Version

## Node parameters

The node parameters depend on the **Category** selected. The **Do Nothing** Category has no other parameters.

### Throw Error parameters

* **Error Type**: Select the type of error to throw. Choose from:
	* **NodeApiError**
	* **NodeOperationError**
	* **Error**
* **Error Message**: Enter the error message to throw.

### Out Of Memory parameters

The Out of Memory Category adds one parameter, the **Memory Size to Generate**. Enter the approximate amount of memory to generate.

### Generate Random Data parameters

* **Data Type**: Choose the type of random data you'd like to generate. Options include:
	* **Address**
	* **Coordinates**
	* **Credit Card**
	* **Email**
	* **IPv4**
	* **IPv6**
	* **MAC**
	* **Nanoids**: If you select this data type, you'll also need to enter:
		* **Nanoid Alphabet**: The alphabet the generator will use to generate the nanoids.
		* **Nanoid Length**: The length of each nanoid.
	* **URL**
	* **User Data**
	* **UUID**
	* **Version**
* **Seed**: If you'd like to generate the data using a specific seed, enter it here. This ensures the data gets generated consistently. If you'd rather use random data generation, leave this field empty.
* **Number of Items to Generate**: Enter the number of random items you'd like to generate.
* **Output as Single Array**: Whether to generate the data as a single array (turned on) or multiple items (turned off).

## Related resources

View [example workflows and related content](https://n8n.io/integrations/debughelper/){:target=_blank .external-link} on n8n's website.
