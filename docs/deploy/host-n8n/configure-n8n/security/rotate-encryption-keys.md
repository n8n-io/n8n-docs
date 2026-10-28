---
title: Encryption key rotation
description: >-
  Enable and rotate the data encryption key that protects credentials and other
  sensitive data on your self-hosted n8n instance.
contentType: howto
nodeTitle: Rotate encryption keys
originalFilePath: hosting/securing/encryption-key-rotation.md
originalUrl: 'https://docs.n8n.io/hosting/securing/encryption-key-rotation'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/rotate-encryption-keys
layout:
  description:
    visible: false
---

# Encryption key rotation <a href="#encryption-key-rotation" id="encryption-key-rotation"></a>

{% hint style="info" %}
**Feature availability**

Encryption key rotation is available on:

- **Self-hosted:** All editions

It isn't available on n8n Cloud.

Encryption key rotation is on by default from n8n 3.0. On earlier versions, you turn it on with an environment variable.

You need to be the instance owner to turn the feature on or off and to rotate keys.
{% endhint %}

Encryption key rotation lets you periodically replace the key that encrypts your n8n data, like credentials, OAuth tokens, and other sensitive content, without changing your instance's master encryption key.

## How encryption key rotation works <a href="#how-encryption-key-rotation-works" id="how-encryption-key-rotation-works"></a>

n8n uses a two-layer key model:

* **Instance encryption key** (`N8N_ENCRYPTION_KEY`): your master key, set at deployment time. This key never changes. n8n uses it only to protect the data encryption keys.
* **Data encryption key**: the key that directly encrypts your credential data. This is the key you rotate. n8n stores it encrypted in the database, protected by the instance key.

When you rotate, n8n generates a new data encryption key and uses it for all future writes. Existing data encrypted with the previous key remains readable. n8n silently re-encrypts each record to the new key the next time you update it.

## Before you begin <a href="#before-you-begin" id="before-you-begin"></a>

{% hint style="warning" %}
**Take a full database backup first**

Once n8n writes data with a data encryption key, older n8n versions can't read it. Back up your database before you turn the feature on, and before you upgrade to n8n 3.0, which turns it on for you. See [Backwards compatibility and rollback](#backwards-compatibility-and-rollback) for details.
{% endhint %}

You also need to make sure that:

* All n8n instances, main and all workers, share the same `N8N_ENCRYPTION_KEY` value.
* You have direct control over your environment variables and your n8n database. This is only possible on self-hosted deployments.

## Enable encryption key rotation <a href="#enable-encryption-key-rotation" id="enable-encryption-key-rotation"></a>

From n8n 3.0, encryption key rotation is on by default. You don't need to set anything. On first startup after the upgrade, n8n generates the initial data encryption key and stores it, encrypted, in your database.

On n8n 2.x, turn the feature on yourself:

1. Set the following environment variable on **all** n8n instances, both main and workers:

    ```sh
    N8N_ENV_FEAT_ENCRYPTION_KEY_ROTATION=true
    ```

2. Restart all instances. On startup, n8n automatically generates the initial data encryption key and stores it, encrypted, in your database.

To confirm the feature is active, go to **Settings** > **Data Encryption Keys**. You should see the active key listed.

## Rotate the active key <a href="#rotate-the-active-key" id="rotate-the-active-key"></a>

Once the feature is enabled, you can rotate to a new data encryption key at any time.

### Using the UI <a href="#using-the-ui" id="using-the-ui"></a>

Go to **Settings** > **Data Encryption Keys** and select **Rotate key**.

### Using the API <a href="#using-the-api" id="using-the-api"></a>

Make a `POST` call to the `/encryption/keys` endpoint. The request requires the `encryptionKey:manage` global scope. n8n never returns key material in API responses, only metadata such as the ID, algorithm, status, and timestamps.

After rotation, n8n uses the new active key for all new writes. Records encrypted with previous keys remain readable. n8n re-encrypts them to the new key the next time you update each record.

## Turn off encryption key rotation

From n8n 2.40.3, you can turn encryption key rotation off again. Set the following environment variable on **all** n8n instances, both main and workers, then restart them:

```sh
N8N_ENV_FEAT_ENCRYPTION_KEY_ROTATION=false
```

On versions earlier than n8n 2.40.3, turning the feature off after n8n has written data in the new format makes that data permanently inaccessible. Upgrade to n8n 2.40.3 first.

## Backwards compatibility and rollback <a href="#backwards-compatibility-and-rollback" id="backwards-compatibility-and-rollback"></a>

{% hint style="danger" %}
**Don't downgrade n8n after encryption key rotation writes data**

Read this section before you turn the feature on, and before you upgrade to n8n 3.0, which turns it on for you.
{% endhint %}

Once encryption key rotation is on, n8n writes credentials and other sensitive data in a new format that includes a key identifier. Older versions of n8n can't read this format.

* **Don't downgrade your n8n version** after n8n writes data in the new format. Older versions can't decrypt it.
* **Turning the feature off is safe from n8n 2.40.3.** On earlier versions, setting `N8N_ENV_FEAT_ENCRYPTION_KEY_ROTATION` to `false` makes all data encrypted since you turned the feature on permanently inaccessible.

There's no automated tool to convert data encrypted in the new format back to the legacy format. If you end up on an n8n version that can't read it, the only recovery path is restoring from a database backup.

## Recommended steps <a href="#recommended-steps" id="recommended-steps"></a>

1. **Back up your database**. Take a full snapshot before any changes, including before you upgrade to n8n 3.0.
2. **Try staging first**. Turn the feature on, or upgrade to n8n 3.0, in a non-production environment, restart, and verify that credentials still decrypt correctly.
3. **Then do production**. Only do this after validating staging behavior.
4. **Don't downgrade**. Once production data has been written in the new format, stay on the same or a newer n8n version.

## Related resources <a href="#related-resources" id="related-resources"></a>

* [Security](../security.md): audit, harden, and restrict a self-hosted instance.
* [Set a custom encryption key](../basic-configuration/configuration-examples/set-a-custom-encryption-key.md): set the instance-level `N8N_ENCRYPTION_KEY` value.
* [Deployment environment variables](../basic-configuration/use-environment-variables/deployment.md): reference for `N8N_ENCRYPTION_KEY` and `N8N_ENV_FEAT_ENCRYPTION_KEY_ROTATION`.
* [Configuring queue mode](../scaling/enable-queue-mode.md): make sure all workers share the same instance encryption key.
* [n8n 3.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v30-breaking-changes): what changes when you upgrade, including encryption key rotation.
