---
title: Encryption key rotation
description: Enable and rotate the data encryption key that protects credentials and other sensitive data on your self-hosted n8n instance.
contentType: howto
---

# Encryption key rotation

/// info | Feature availability
* Available on self-hosted n8n instances only.
* You need to be the instance owner to enable the feature and rotate keys.
///

Encryption key rotation lets you periodically replace the key that encrypts your n8n data, like credentials, OAuth tokens, and other sensitive content, without changing your instance's master encryption key.

## How encryption key rotation works

n8n uses a two-layer key model:

* **Instance encryption key** (`N8N_ENCRYPTION_KEY`): your master key, set at deployment time. This key never changes. n8n uses it only to protect the data encryption keys.
* **Data encryption key**: the key that directly encrypts your credential data. This is the key you rotate. n8n stores it encrypted in the database, protected by the instance key.

When you rotate, n8n generates a new data encryption key and uses it for all future writes. Existing data encrypted with the previous key remains readable. n8n silently re-encrypts each record to the new key the next time you update it.

## Before you begin

/// danger | Take a full database backup before enabling this feature
Enabling encryption key rotation is a one-way change. There's no rollback path. See [Backwards compatibility and rollback](#backwards-compatibility-and-rollback) for details.
///

You also need to make sure that:

* All n8n instances, main and all workers, share the same `N8N_ENCRYPTION_KEY` value.
* You have direct control over your environment variables and your n8n database. This is only possible on self-hosted deployments.

## Enable encryption key rotation

1. Set the following environment variable on **all** n8n instances, both main and workers:

    ```sh
    N8N_ENV_FEAT_ENCRYPTION_KEY_ROTATION=true
    ```

2. Restart all instances. On startup, n8n automatically generates the initial data encryption key and stores it, encrypted, in your database.
3. To confirm the feature is active, go to **Settings** > **Data Encryption Keys**. You should see the active key listed.

## Rotate the active key

Once the feature is enabled, you can rotate to a new data encryption key at any time.

### Using the UI

Go to **Settings** > **Data Encryption Keys** and select **Rotate key**.

### Using the API

Make a `POST` call to the `/encryption/keys` endpoint. The request requires the `encryptionKey:manage` global scope. n8n never returns key material in API responses, only metadata such as the ID, algorithm, status, and timestamps.

After rotation, n8n uses the new active key for all new writes. Records encrypted with previous keys remain readable. n8n re-encrypts them to the new key the next time you update each record.

## Backwards compatibility and rollback

/// danger | This is a one-way migration
Read this section carefully before enabling encryption key rotation.
///

Once you enable encryption key rotation, n8n begins writing credentials and other sensitive data in a new format that includes a key identifier. Older versions of n8n, and instances running without the feature flag, can't read this format.

* **Don't disable the feature flag** after any data has been written in the new format. Removing `N8N_ENV_FEAT_ENCRYPTION_KEY_ROTATION` or setting it to `false` makes all data encrypted after you enabled the feature permanently inaccessible.
* **Don't downgrade your n8n version** after enabling. Older versions can't decrypt the new format.

There's no automated tool to convert data encrypted in the new format back to the legacy format. The only recovery path is restoring from a database backup taken before you enabled the feature.

## Recommended steps

1. **Back up your database**. Take a full snapshot before any changes.
2. **Enable on staging first**. Set `N8N_ENV_FEAT_ENCRYPTION_KEY_ROTATION=true` on a non-production environment, restart, and verify that credentials still decrypt correctly.
3. **Enable on production**. Only do this after validating staging behavior.
4. **Don't disable or downgrade**. Once production data has been written in the new format, keep the flag enabled and stay on the same or a newer n8n version.

## Related resources

* [Set a custom encryption key](/hosting/configuration/configuration-examples/encryption-key.md): set the instance-level `N8N_ENCRYPTION_KEY` value.
* [Deployment environment variables](/hosting/configuration/environment-variables/deployment.md): reference for `N8N_ENCRYPTION_KEY` and `N8N_ENV_FEAT_ENCRYPTION_KEY_ROTATION`.
* [Configuring queue mode](/hosting/scaling/queue-mode.md): make sure all workers share the same instance encryption key.
