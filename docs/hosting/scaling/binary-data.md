---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Scaling binary data in n8n
description: How to handle large files without degrading n8n's performance.
contentType: howto
tags:
  - external storage
  - storage
hide:
  - tags
search:
  boost: 1.5
---

# Binary data

Binary data is any file-type data, such as image files or documents generated or processed during the execution of a workflow. 

To learn how to work with binary data, take a look at the [binary data usage](/new-data/binary-data.md) page.

## Choose the binary data mode

You can choose where to store binary data for your n8n instance by setting the [`N8N_DEFAULT_BINARY_DATA_MODE` environment variable](/hosting/configuration/environment-variables.md#binary-data) to one of the following options:

* `default`: n8n will store binary data in memory. Large files can cause crashes when the host doesn't have enough memory.
* `filesystem`: n8n stores binary data to the host's filesystem. n8n doesn't support storing binary data on the filesystem when running in queue mode.
* `s3`: Enterprise plans can configure n8n to store binary data in an AWS S3-compatible object storage provider. This is more scalable than storing in memory or on an instance's filesystem.

While the `default` binary data mode works without configuration, for the other options, you'll likely need to configure some further details.

## Enable filesystem mode

/// warning | Not available in queue mode
n8n doesn't support filesystem mode with queue mode. If you're using queue mode, either leave `N8N_DEFAULT_BINARY_DATA_MODE` set to `default` or use `s3` if you have an Enterprise plan.
///

When handling binary data, n8n keeps the data in memory by default. This can cause crashes when working with large files. 

To avoid this, change the `N8N_DEFAULT_BINARY_DATA_MODE` [environment variable](/hosting/configuration/environment-variables.md#binary-data) to `filesystem`. This causes n8n to save data to disk, instead of using memory.

To choose the location where n8n stores binary data, set the `N8N_BINARY_DATA_STORAGE_PATH` environment variable to a location on your host's (or your n8n container's) filesystem.

## Enable external storage

/// note | Enterprise plans only
The s3 binary storage mode is available on Self-hosted Enterprise plans. If you want access to this feature on Cloud Enterprise, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa).

You will need an [Enterprise license key](/license-key.md) to use this feature. If your license key expires and you remain on S3 mode, the instance will be able to read from, but not write to, the S3 bucket.
///

n8n can store binary data produced by workflow executions externally in s3-compatible storage backends. This feature is useful to avoid relying on the filesystem for storing large amounts of binary data.

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
If your provider doesn't require a region, you can set `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` to `auto`.
///

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

## Binary data pruning

n8n executes binary data pruning as part of execution data pruning. Refer to [Execution data | Enable executions pruning](/hosting/scaling/execution-data.md#enable-executions-pruning) for details. 

If you configure multiple binary data modes, binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem.
