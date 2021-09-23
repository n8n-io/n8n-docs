---
permalink: /credentials/misp
description: Learn to configure credentials for the MISP node in n8n
---

# MISP

You can use these credentials to authenticate the following nodes:
- [MISP](../../nodes-library/nodes/Misp/README.md)

## Prerequisites

Install and run a [MISP](https://misp.github.io/MISP/) instance.

## Using API Key

From your MISP UI:
1. Navigate to the **Event Actions** > **Automation** menu.
2. Copy the API Key provided there.

From n8n:

3. Enter your API key and application Base URL.
4. Use the toggle to select if you want to **Allow Unauthorized Certificates**.
5. Click **Save** to create your credentials.