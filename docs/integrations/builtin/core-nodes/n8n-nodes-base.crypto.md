---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Crypto
description: Documentation for the Crypto node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: medium
---

# Crypto

Use the Crypto node to encrypt data in workflows.

## Actions

* [**Generate** a random string](#generate-parameters)
* [**Hash** a text or file](#hash-parameters) in a specified format
* [**Hmac** a text or file](#hmac-parameters) in a specified format
* [**Sign** a string](#sign-parameters) using a private key

## Node parameters

Node parameters depend on the action you select.

### Generate parameters

* **Property Name**: Enter the name of the property to write the random string to.
* **Type**: Select the encoding type to use to generate the string. Choose from:
	* **ASCII**
	* **BASE64**
	* **HEX**
	* **UUID**

### Hash parameters

* **Type**: Select the hash type to use. Choose from:
	* **MD5**
	* **SHA256**
	* **SHA3-256**
	* **SHA3-384**
	* **SHA3-512**
	* **SHA385**
	* **SHA512**
* **Binary File**: Turn this parameter on if the data you want to hash is from a binary file.
	* **Value**: If you turn off **Binary File**, enter the value you want to hash.
	* **Binary Property Name**: If you turn on **Binary File**, enter the name of the binary property that contains the data you want to hash.
* **Property Name**: Enter the name of the property you want to write the hash to.
* **Encoding**: Select the encoding type to use. Choose from:
	* **BASE64**
	* **HEX**

### Hmac parameters

* **Binary File**: Turn this parameter on if the data you want to encrypt is from a binary file.
	* **Value**: If you turn off **Binary File**, enter the value you want to encrypt.
	* **Binary Property Name**: If you turn on **Binary File**, enter the name of the binary property that contains the data you want to encrypt.
* **Type**: Select the encryption type to use. Choose from:
	* **MD5**
	* **SHA256**
	* **SHA3-256**
	* **SHA3-384**
	* **SHA3-512**
	* **SHA385**
	* **SHA512**
* **Property Name**: Enter the name of the property you want to write the hash to.
* **Secret**: Enter the secret or secret key used for decoding.
* **Encoding**: Select the encoding type to use. Choose from:
	* **BASE64**
	* **HEX**

### Sign parameters

* **Value**: Enter the value you want to sign.
* **Property Name**: Enter the name of the property you want to write the signed value to.
* **Algorithm Name or ID**: Choose an algorithm name from the list or specify an ID using an [expression](/code/expressions/).
* **Encoding**: Select the encoding type to use. Choose from:
	* **BASE64**
	* **HEX**
* **Private Key**: Enter a private key to use when signing the string.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'crypto') ]]
