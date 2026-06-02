---
title: Crypto
description: Documentation for the Crypto node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: medium
---

# Crypto

Use the Crypto node to perform cryptographic operations in workflows.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/crypto.md).
///

## Actions

* [**Decrypt** a string](#decrypt-parameters) with a passphrase or private key
* [**Encrypt** a string](#encrypt-parameters) with a passphrase or public key
* [**Generate** a random string](#generate-parameters)
* [**Hash** a text or file](#hash-parameters) in a specified format
* [**Hmac** a text or file](#hmac-parameters) in a specified format
* [**Sign** a string](#sign-parameters) using a private key

## Node parameters

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

Node parameters depend on the action you select.

The **Hmac**, **Sign**, **Encrypt**, and **Decrypt** actions need [Crypto credentials](/integrations/builtin/credentials/crypto.md). Each action uses the credential field it needs:

* **Hmac** uses the **Hmac Secret**.
* **Sign** uses the **Private Key**.
* **Encrypt** and **Decrypt** use the **Encryption Passphrase** for symmetric mode, or the **Encryption Public Key** and **Encryption Private Key** for asymmetric mode.

### Decrypt parameters

* **Mode**: Select the mode to use. This must match the mode used to encrypt the value. Choose from:
	* **Symmetric (Passphrase)**: Decrypt with a passphrase using an authenticated cipher.
	* **Asymmetric (RSA)**: Decrypt with an RSA private key.
* **Cipher**: When you select **Symmetric (Passphrase)**, choose the authenticated cipher to use. This must match the cipher used to encrypt the value. Choose from:
	* **AES-256-GCM**
	* **AES-192-GCM**
	* **AES-128-GCM**
	* **ChaCha20-Poly1305**
* **Value**: Enter the base64 string produced by the **Encrypt** action.
* **Property Name**: Enter the name of the property you want to write the decrypted value to.

### Encrypt parameters

* **Mode**: Select the mode to use. Choose from:
	* **Symmetric (Passphrase)**: Encrypt with a passphrase using an authenticated cipher.
	* **Asymmetric (RSA)**: Encrypt with an RSA public key.
* **Cipher**: When you select **Symmetric (Passphrase)**, choose the authenticated cipher to use. You must select the same cipher when you decrypt the value. Choose from:
	* **AES-256-GCM**
	* **AES-192-GCM**
	* **AES-128-GCM**
	* **ChaCha20-Poly1305**
* **Value**: Enter the value you want to encrypt.
* **Property Name**: Enter the name of the property you want to write the encrypted value to. The node writes the result as a base64 string.

/// note | RSA payload size
Asymmetric (RSA) mode can only encrypt small payloads, around 190 bytes with a 2048-bit key. Use symmetric mode for larger data.
///

### Generate parameters

* **Property Name**: Enter the name of the property to write the random string to.
* **Type**: Select the encoding type to use to generate the string. Choose from:
	* **ASCII**
	* **BASE64**
	* **HEX**
	* **UUID**
* **Length**: When you select **ASCII**, **BASE64**, or **HEX**, enter the length of the generated string. The default is `32`.

### Hash parameters

* **Type**: Select the hash type to use. Choose from:
	* **MD5**
	* **SHA256**
	* **SHA3-256**
	* **SHA3-384**
	* **SHA3-512**
	* **SHA384**
	* **SHA512**
* **Binary File**: Turn this parameter on if the data you want to hash is from a binary file.
	* **Value**: If you turn off **Binary File**, enter the value you want to hash.
	* **Binary Property Name**: If you turn on **Binary File**, enter the name of the binary property that contains the data you want to hash.
* **Property Name**: Enter the name of the property you want to write the hash to.
* **Encoding**: Select the encoding type to use. Choose from:
	* **BASE64**
	* **HEX**

### Hmac parameters

* **Binary File**: Turn this parameter on if the data you want to create an Hmac for is from a binary file.
	* **Value**: If you turn off **Binary File**, enter the value you want to create an Hmac for.
	* **Binary Property Name**: If you turn on **Binary File**, enter the name of the binary property that contains the data you want to create an Hmac for.
* **Type**: Select the hash type to use. Choose from:
	* **MD5**
	* **SHA256**
	* **SHA3-256**
	* **SHA3-384**
	* **SHA3-512**
	* **SHA384**
	* **SHA512**
* **Property Name**: Enter the name of the property you want to write the Hmac to.
* **Encoding**: Select the encoding type to use. Choose from:
	* **BASE64**
	* **HEX**

This action uses the **Hmac Secret** from your [Crypto credentials](/integrations/builtin/credentials/crypto.md).

### Sign parameters

* **Value**: Enter the value you want to sign.
* **Property Name**: Enter the name of the property you want to write the signed value to.
* **Algorithm Name or ID**: Choose an algorithm name from the list or specify an ID using an [expression](/data/expressions.md).
* **Encoding**: Select the encoding type to use. Choose from:
	* **BASE64**
	* **HEX**

This action uses the **Private Key** from your [Crypto credentials](/integrations/builtin/credentials/crypto.md).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'crypto') ]]
