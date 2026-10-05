---
description: Configure multi-main, worker autoscaling, and Redis high availability in the terraform-aws-n8n module.
layout:
  description:
    visible: false
---

# Scale and run at high availability on AWS

The [terraform-aws-n8n](https://github.com/n8n-io/terraform-aws-n8n) module deploys n8n in [queue mode](../../../configure-n8n/scaling/enable-queue-mode.md) by default, with a [multi-main setup](../../../configure-n8n/scaling/enable-queue-mode.md#multi-main-setup) for high availability. This page covers the module-specific settings for that topology: multi-main licensing, worker autoscaling, and Redis high availability.

## Multi-main setup

By default, the module runs more than one main pod and requires an Enterprise license. Set `n8n_main_hpa_min_replicas = 1` to run a single main pod instead, which only requires a Business plan license, since n8n's multi-main leader-election feature is disabled in that mode.

{% hint style="warning" %}
**Single-main mode has upgrade downtime**

With `n8n_main_hpa_min_replicas = 1`, the main pod's autoscaling maximum is forced to one, upgrades use a `Recreate` strategy, and the pod disruption budget permits evicting the only main. Expect editor, REST API, and scheduled-trigger downtime during upgrades and maintenance. Plan a maintenance window.
{% endhint %}

Any load balancer or Ingress in front of the main pods needs session persistence (sticky sessions) enabled so a browser stays connected to one main pod. The module's own Ingress sets this by default. If you bring your own Ingress, see [Customize the AWS infrastructure](customize-the-infrastructure.md#customer-managed-ingress).

## Worker autoscaling

Worker pods scale on Redis queue depth using [KEDA](https://keda.sh/), which the module installs automatically. To check whether a worker's autoscaler can reach Redis:

```bash
kubectl -n n8n get scaledobject
```

A healthy scaler reports `READY=True`. If it reports `READY=False`, check the KEDA operator logs for the reason:

```bash
kubectl -n keda logs -l app=keda-operator | grep -i 'connection to redis'
```

{% hint style="info" %}
**The worker HPA's TARGETS column can be misleading**

`kubectl get hpa` often shows `<unknown>` in the TARGETS column for KEDA-backed worker HPAs, even while autoscaling works correctly. Use `kubectl get scaledobject` instead to check scaler health.
{% endhint %}

If you enable [Redis in-transit encryption](#redis-in-transit-encryption-and-auth), KEDA's queue-depth triggers automatically use the same encrypted, authenticated connection as the workers.

## Redis high availability

By default, the module provisions Redis as a single-node `aws_elasticache_cluster`, which is a single point of failure for both the worker queue and multi-main leader election. Set `redis_high_availability_enabled = true` to provision a replication group (one primary and one replica) with automatic failover across two Availability Zones instead:

```hcl
module "n8n" {
  # ...
  redis_high_availability_enabled = true
  redis_node_type                 = "cache.r6g.large"
}
```

Both nodes use `redis_node_type`, so enabling high availability roughly doubles the Redis cost.

{% hint style="warning" %}
**High availability doesn't prevent pod restarts**

A Redis failover promotes the replica in about twenty seconds, and queued executions survive. However, every main, worker, and webhook pod still restarts: n8n's Redis client exits the process once Redis is unreachable for longer than `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` (ten seconds by default). This is a fail-fast design, not a crash loop. Kubernetes brings each pod back immediately, and recovery typically completes within a minute with the queue intact.
{% endhint %}

### Avoid restarts during a failover

Set `n8n_redis_timeout_threshold` to raise how long n8n waits for Redis before exiting. The useful budget is coarser than the number you set, because each failed connection attempt takes about 11.1 seconds (a 1-second retry interval plus a 10-second connection timeout):

| You set | Real budget | Reconnect attempts before exit |
|---|---|---|
| `10000` (default) | 11.1 seconds | 1 |
| `30000` | 33.2 seconds | 3 |
| `60000` | 66.4 seconds | 6 |

A stale Redis endpoint after a failover can take longer to resolve than the failover itself, due to DNS caching. Setting the threshold to `60000` clears this in practice, with pods logging `Recovered Redis connection` instead of restarting:

```hcl
module "n8n" {
  # ...
  redis_high_availability_enabled = true
  n8n_redis_timeout_threshold     = 60000
}
```

This is a trade-off, not a free win: the same threshold also decides how long a pod waits before restarting against a genuinely dead Redis. For a worker, that's usually an acceptable trade, since restarting doesn't help when Redis is unreachable either way.

### Switching topologies

Switching `redis_high_availability_enabled` on a live deployment destroys the existing cache and creates a new one. Everything queued or in progress at that moment is lost. Treat this as a maintenance-window operation: stop new work from reaching n8n, let the workers drain (`bull:jobs:wait` and `bull:jobs:active` reaching zero in Redis), then apply.

## Redis eviction policy

The module sets Redis's `maxmemory-policy` to `noeviction` (`redis_maxmemory_policy`), rather than ElastiCache's `volatile-lru` default. Under memory pressure, a `noeviction` Redis rejects new writes with an out-of-memory error instead of silently evicting queue keys, such as job locks. This makes a full Redis visible as failed writes and job-lock-renewal failures, rather than as queue data disappearing without explanation. Plan Redis memory for the queue and n8n's cache together, since both share the same instance.

## Redis in-transit encryption and AUTH

By default, Redis sits in private subnets behind a security group that only admits VPC traffic, with no TLS and no password. Set `redis_transit_encryption_enabled = true` to add both: the module enables TLS, generates an AUTH token, and wires it onto every n8n container.

```bash
terraform output -raw redis_auth_token
```

## Related resources

* [Deploy to AWS with Terraform](./)
* [Configure Enterprise features on AWS](use-enterprise-features-on-aws.md)
* [Customize the AWS infrastructure](customize-the-infrastructure.md)
* [Maintain and tear down the AWS deployment](maintain-and-tear-down.md)
* [Enable queue mode](../../../configure-n8n/scaling/enable-queue-mode.md)
