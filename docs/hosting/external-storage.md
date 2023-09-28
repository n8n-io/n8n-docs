---
description: External storage for your n8n instance.
contentType: howTo
---

# External storage

!!! info "Feature availability"
	* Available on Self-hosted Enterprise plans
	* If you want access to this feature on Cloud Enterprise, contact us

n8n can externally store binary data produced by workflow executions. This feature is useful to avoid relying on the filesystem for storing large amounts of binary data. In future, n8n will support external storage for other kinds of data in addition to binary data.

## Storing n8n's binary data in S3

n8n can use [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) as an external store for binary data produced by workflow executions. Other S3-compatible services like Cloudflare R2 and Backblaze B2 may work, but are not officially supported.

!!! info "Enterprise-tier feature"
    You will need an [Enterprise license key](/enterprise-key/) for external storage. If your license key expires and you remain on S3 mode, the instance will be able to read from, but not write to, the S3 bucket.

### Setup

First, create and configure a bucket following the [official AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html). You can use the following policy, replacing `<bucket-name>` with the name of the bucket you created.

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

Once you finish creating the bucket, you will have a host, bucket name and region, and an access key ID and secret access key. You will need to set them in n8n's environment.

```sh
export N8N_EXTERNAL_STORAGE_S3_HOST=... # example: s3.us-east-1.amazonaws.com
export N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME=...
export N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION=...
export N8N_EXTERNAL_STORAGE_S3_ACCOUNT_ID=...
export N8N_EXTERNAL_STORAGE_S3_SECRET_KEY=...
```

!!! note "No region"
    If your provider does not require a region, e.g. Cloudflare, you can set `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` to `'auto'`.

Finally, instruct n8n to store binary data in S3 and start the server.

```sh
export N8N_AVAILABLE_BINARY_DATA_MODES=filesystem,s3
export N8N_DEFAULT_BINARY_DATA_MODE=s3
```

### Usage

Once S3 is enabled, any new binary data will be written to, and read from, the S3 bucket. Binary data will be written to your S3 bucket in this format:

```
workflows/{workflowId}/executions/{executionId}/binary_data/{binaryFileId}
```

Older binary data that was stored in the filesystem will continue to be read from the filesystem, if `filesystem` remains listed in `N8N_AVAILABLE_BINARY_DATA_MODES`.

If you store binary data in S3 and later switch to filesystem mode, the instance will continue to read any data that was stored in S3, as long as `s3` remains listed in `N8N_AVAILABLE_BINARY_DATA_MODES` and your S3 credentials remain valid.

!!! note "Binary data pruning"
    At this time, binary data pruning is based on the active binary data mode. For example, if your instance stored data in S3 and was later switched to filesystem mode, only binary data in the filesystem will be pruned. This may change in future.
