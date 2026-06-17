---
description: External storage of binary data and execution data for your n8n instance.
contentType: howto
tags:
  - external storage
  - storage
hide:
  - tags
search:
  boost: 1.5
---

# External storage

/// info | Feature availability

* Available on Self-hosted Enterprise plans
* If you want access to this feature on Cloud Enterprise, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa).
///

n8n can store binary data and execution data produced by workflow executions externally. This feature is useful to avoid relying on the database or filesystem for storing large amounts of data.

## Storing n8n's binary data in S3

n8n supports [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) as an external store for binary data produced by workflow executions. You can use other S3-compatible services like Cloudflare R2 and Backblaze B2, but n8n doesn't officially support these.

/// info | Enterprise-tier feature
You will need an [Enterprise license key](/license-key.md) for external storage. If your license key expires and you remain on S3 mode, the instance will be able to read from, but not write to, the S3 bucket.
///

### Setup

Create and configure a bucket following the [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html). You can use the following policy, replacing `<bucket-name>` with the name of the bucket you created:

```json
{
 "Version": "2012-10-17",
 "Statement": [
  {
   "Sid": "VisualEditor0",
   "Effect": "Allow",
   "Action": ["s3:*"],
   "Resource": ["arn:aws:s3:::<bucket-name>", "arn:aws:s3:::<bucket-name>/*"]
  }
 ]
}
```

Set a bucket-level lifecycle configuration so that S3 automatically deletes old binary data. n8n delegates pruning of binary data to S3, so setting a lifecycle configuration is required unless you want to preserve binary data indefinitely.

Once you finish creating the bucket, you will have a host, bucket name and region, and an access key ID and secret access key. You need to set them in n8n's environment:

```sh
export N8N_EXTERNAL_STORAGE_S3_HOST=... # example: s3.us-east-1.amazonaws.com
export N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME=...
export N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION=...
export N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY=...
export N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET=...
```

/// note | No region
If your provider doesn't require a region, you can set `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` to `'auto'`.
///

## Validate and update your S3 bucket region format (v2.6.4 onward)

Starting from n8n v2.6.4, the value of the environment variable `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` must meet these conditions:

- Only contain alphanumeric characters (`a-z`, `A-Z`, `0-9`) and hyphens (`-`).
- Not contain underscores (`_`) or other special characters.

If these conditions are not met, n8n will fail startup with connection errors even if the storage endpoint is reachable and was previously working in older versions.

If S3 connection fails after upgrading n8n to v2.6.4, verify your region value matches these conditions and redeploy n8n.

Tell n8n to store binary data in S3:

```sh
export N8N_AVAILABLE_BINARY_DATA_MODES=filesystem,s3
export N8N_DEFAULT_BINARY_DATA_MODE=s3
```


/// note | Auth autodetection
To automatically detect credentials to authenticate your S3 calls, set `N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT` to `true`. This will use the default [credential provider chain](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html#credchain).
///

Restart the server to load the new configuration.

### Usage

After you enable S3, n8n writes and reads any new binary data to and from the S3 bucket. n8n writes binary data to your S3 bucket in this format:

```
workflows/{workflowId}/executions/{executionId}/binary_data/{binaryFileId}
```

n8n continues to read older binary data stored in the filesystem from the filesystem, if `filesystem` remains listed as an option in `N8N_AVAILABLE_BINARY_DATA_MODES`.

If you store binary data in S3 and later switch to filesystem mode, the instance continues to read any data stored in S3, as long as `s3` remains listed in `N8N_AVAILABLE_BINARY_DATA_MODES` and your S3 credentials remain valid.

--8<-- "_snippets/self-hosting/scaling/binary-data-pruning.md"

### Upgrade best practices for S3 storage

When using S3 or S3-compatible storage:

1. Upgrade all n8n components (main, worker, runner) to the same version simultaneously to avoid protocol incompatibilities.
2. For on-premise or S3-compatible storage over HTTP, set `N8N_EXTERNAL_STORAGE_S3_PROTOCOL=http` and include the protocol in the host configuration.
3. Use only supported environment variable names: for access key, use `N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY`.

Newer n8n versions have stricter validation and protocol handling. Older configurations may need updates after upgrading.

## Storing n8n's execution data in S3

n8n can also store execution data in S3.

Configure the S3 bucket and credentials as described in the binary data [setup](#setup) section, then tell n8n to store execution data in S3:

```sh
export N8N_EXECUTION_DATA_STORAGE_MODE=s3
```

In [queue mode](/hosting/scaling/queue-mode.md), set `N8N_EXECUTION_DATA_STORAGE_MODE` and the `N8N_EXTERNAL_STORAGE_S3_*` variables on all instances, including workers.

/// warning | License required to start
S3 execution data storage requires a valid [Enterprise license key](/license-key.md). If you set `N8N_EXECUTION_DATA_STORAGE_MODE=s3` without a valid license, n8n won't start. To start n8n again, switch the mode back to `database` or `filesystem`, or restore a valid license.
///

After you enable S3 execution data storage, n8n writes the data of any new execution to your S3 bucket in this format:

```
workflows/{workflowId}/executions/{executionId}/execution_data/bundle.json
```

n8n records where each execution's data is stored, so switching modes is non-destructive. Older executions stay readable from the database or filesystem, and if you later switch back to another mode, executions stored in S3 stay readable as long as the bucket remains configured.

n8n prunes execution data in S3 itself, using the standard [executions pruning](/hosting/scaling/execution-data.md#enable-executions-pruning) settings (the `EXECUTIONS_DATA_*` variables). Unlike binary data, execution data doesn't rely on an S3 lifecycle rule. Don't add a lifecycle rule for execution data, as it could delete data that n8n still references.
