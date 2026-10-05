---
description: Manage encryption keys, verify database TLS, and configure deletion protection in the terraform-aws-n8n module.
layout:
  description:
    visible: false
---

# Maintain and tear down the AWS deployment

The [terraform-aws-n8n](https://github.com/n8n-io/terraform-aws-n8n) module manages encryption keys and database protection settings that matter most when you upgrade, recover from an incident, or decommission a deployment. This page covers those settings. For step-by-step upgrade and destroy troubleshooting, see the module's [upgrade guide](https://github.com/n8n-io/terraform-aws-n8n/blob/main/docs/upgrading-n8n.md) and [destroy checklist](https://github.com/n8n-io/terraform-aws-n8n/blob/main/docs/destroy-cleanup.md) on GitHub.

## Bring your own KMS key

By default, the module creates and manages its own KMS key to encrypt the RDS instance and the S3 bucket. To encrypt with a key you already own instead, for example one a central security team controls:

```hcl
create_db_kms_key = false
db_kms_key_arn    = "arn:aws:kms:eu-west-1:123456789012:key/1a2b3c4d-..."

create_s3_kms_key = false
s3_kms_key_arn    = "arn:aws:kms:eu-west-1:123456789012:key/1a2b3c4d-..."
```

Set both the boolean and the ARN together: the boolean alone stops the module creating its own key, and the ARN alone is ignored.

{% hint style="info" %}
**The CloudWatch Logs group needs its own key policy statement**

RDS can use your key through a grant, but CloudWatch Logs rejects a key that doesn't explicitly name the regional Logs service principal in its key policy. Without that statement, the module's `postgresql` log group falls back to CloudWatch's own managed key instead of yours. Add a statement granting `kms:Encrypt`, `kms:Decrypt`, `kms:ReEncrypt*`, `kms:GenerateDataKey*`, and `kms:DescribeKey` to the `logs.<region>.amazonaws.com` principal, then set `db_logs_kms_key_enabled = true` and `db_logs_kms_key_arn` to the same key.
{% endhint %}

## Verify the PostgreSQL TLS certificate

By default, the connection between n8n and the module's RDS instance is encrypted but unverified (`DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED=false`), because the RDS server certificate chains to Amazon's own certificate authority, which Node.js doesn't trust by default. To verify the server identity as well as encrypt the connection:

```hcl
db_postgresdb_ssl_reject_unauthorized = true
db_postgresdb_ssl_ca_pem              = file("${path.module}/global-bundle.pem")
```

Download the combined CA bundle from AWS's trust store at `https://truststore.pki.rds.amazonaws.com`. The module mounts it read-only on every n8n pod and points `DB_POSTGRESDB_SSL_CA_FILE` at it.

## KMS keys after terraform destroy

The module schedules its managed KMS keys for deletion seven days after a `terraform destroy`, rather than deleting them immediately. A key becomes unusable as soon as deletion is scheduled, even though permanent loss only occurs once the seven-day window completes. If you need to recover a deployment inside that window, cancel the deletion before re-applying:

```bash
aws kms cancel-key-deletion --key-id <key-id>
aws kms enable-key --key-id <key-id>
```

{% hint style="warning" %}
**A pending-deletion key blocks recovery, even with a retained snapshot or S3 objects**

RDS snapshots and S3 objects encrypted with the module's own KMS keys can't be decrypted once the key enters `PendingDeletion`. If you need encrypted backups to outlive a `terraform destroy`, bring your own KMS key (see above) and manage its lifecycle outside the module.
{% endhint %}

## Deletion protection and teardown

The module defaults to teardown-friendly settings, so example deployments can be destroyed cleanly:

| Setting | Default | Production value |
|---|---|---|
| `db_deletion_protection` | `false` | `true` |
| `db_skip_final_snapshot` | `true` | `false` (also set `db_final_snapshot_identifier`) |
| `db_delete_automated_backups` | `true` | `false` |
| `s3_force_destroy` | `true` | `false` |

All four are in-place changes on an existing deployment and don't force replacement. Apply the change before running `terraform destroy`: these settings take effect from the value already recorded in Terraform state, not from your configuration on disk, so a `terraform destroy` run straight after editing a `.tfvars` file still uses the old values.

## Related resources

* [Deploy to AWS with Terraform](./)
* [Scale and run at high availability on AWS](scale-and-run-at-high-availability.md)
* [Configure Enterprise features on AWS](use-enterprise-features-on-aws.md)
* [Customize the AWS infrastructure](customize-the-infrastructure.md)
