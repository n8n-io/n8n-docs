---
title: Set a custom encryption key
description: Set a custom encryption key for n8n to securely encrypt credentials.
contentType: howto
nodeTitle: Set a custom encryption key
originalFilePath: hosting/configuration/configuration-examples/encryption-key.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/configuration-examples/encryption-key
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key
layout:
  description:
    visible: false
---

# Set a custom encryption key <a href="#set-a-custom-encryption-key" id="set-a-custom-encryption-key"></a>

n8n creates a random encryption key automatically on the first launch and saves
it in the `~/.n8n` folder. n8n uses that key to encrypt the credentials before
they get saved to the database. If the key isn't yet in the settings file,
you can set it using an environment variable, so that n8n 
uses your custom key instead of generating a new one.

In [queue mode](../../scaling/enable-queue-mode.md), you must specify the encryption key environment variable for all workers.

```bash
export N8N_ENCRYPTION_KEY=<SOME RANDOM STRING>
```
Refer to [Environment variables reference](../use-environment-variables/deployment.md) for more information on this variable.
