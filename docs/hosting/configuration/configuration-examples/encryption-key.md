---
title: Set a custom encryption key
description: Set a custom encryption key for n8n to securely encrypt credentials.
contentType: howto
---

# Set a custom encryption key

n8n creates a random encryption key automatically on the first launch and saves
it in the `~/.n8n` folder. n8n uses that key to encrypt the credentials before
they get saved to the database. If the key isn't yet in the settings file,
you can set it using an environment variable, so that n8n 
uses your custom key instead of generating a new one.

In [queue mode](/hosting/scaling/queue-mode.md), you must specify the encryption key environment variable for all workers.

```bash
export N8N_ENCRYPTION_KEY=<SOME RANDOM STRING>
```
Refer to [Environment variables reference](/hosting/configuration/environment-variables/deployment.md) for more information on this variable.
