---
title: SSRF protection
description: "Protect your self-hosted n8n instance from Server-Side Request Forgery (SSRF) attacks."
contentType: howto
---

# SSRF protection

/// info | Available since 2.12.0
///

Server-Side Request Forgery (SSRF) attacks abuse workflow nodes to make requests to internal network resources, cloud metadata endpoints, or localhost services that shouldn't be accessible.

/// warning
SSRF protection is an additional application-level defense. You should always configure network-level protections (firewalls, security groups, network policies) on your infrastructure as your primary line of defense. n8n's SSRF protection adds defense-in-depth on top of those controls.
///

## Enable SSRF protection

```
N8N_SSRF_PROTECTION_ENABLED=true
```

When enabled, n8n validates all outbound HTTP requests from user-controllable nodes (such as the HTTP Request node) against the configured blocked and allowed ranges. This includes redirect targets and DNS resolution to prevent bypass techniques like DNS rebinding.

## Default blocked ranges

When SSRF protection is enabled, the following IP ranges are blocked by default:

| Range | Description |
| :---- | :---------- |
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | RFC 1918 private addresses |
| `127.0.0.0/8`, `::1/128` | Loopback |
| `169.254.0.0/16`, `fe80::/10` | Link-local |
| `fc00::/7`, `fd00::/8` | IPv6 unique local |
| `0.0.0.0/8`, `192.0.0.0/24`, `192.0.2.0/24`, `198.18.0.0/15`, `198.51.100.0/24`, `203.0.113.0/24` | Reserved/special purpose |

You can extend this list with `N8N_SSRF_BLOCKED_IP_RANGES=default,100.0.0.0/8`.

## Allow access to internal services

If your workflows need to reach legitimate internal services, use allowlists. Allowlists take precedence over blocklists, following this order: hostname allowlist > IP allowlist > IP blocklist.

Allow by hostname pattern (supports wildcards like `*.n8n.internal`):

```
N8N_SSRF_ALLOWED_HOSTNAMES=*.n8n.internal,*.company.local
```

Allow by IP range:

```
N8N_SSRF_ALLOWED_IP_RANGES=10.0.1.0/24,10.0.2.50/32
```

/// warning
Only allowlist hostnames within your control (internal DNS zones). Hostname allowlists bypass IP blocklist checks.
///

## Related resources

Refer to [SSRF protection environment variables](/hosting/configuration/environment-variables/ssrf-protection.md) for the full list of configuration options.

Refer to [Configuration methods](/hosting/configuration/configuration-methods.md) for more information on setting environment variables.
