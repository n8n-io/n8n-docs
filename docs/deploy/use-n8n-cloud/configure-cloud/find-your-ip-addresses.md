---
contentType: reference
nodeTitle: Find your IP addresses
originalFilePath: manage-cloud/cloud-ip.md
originalUrl: 'https://docs.n8n.io/manage-cloud/cloud-ip'
url: >-
  https://docs.n8n.io/deploy/use-n8n-cloud/configure-cloud/find-your-ip-addresses
layout:
  description:
    visible: false
---

# Cloud IP addresses <a href="#cloud-ip-addresses" id="cloud-ip-addresses"></a>

When a workflow on n8n Cloud sends an outbound request, for example from the **HTTP Request** node or an app node, the request comes from one of the IP addresses on this page. Use these addresses to allowlist n8n Cloud in a firewall or a service that limits access by IP address. Inbound webhook traffic to your instance doesn't use these addresses.

## How n8n Cloud outbound IP addresses work

n8n Cloud runs on shared infrastructure. Many instances share each address, so there's no address unique to your instance. Your instance normally keeps the same address. It changes only in rare cases where n8n has to move instances between clusters. n8n doesn't send advance notice of these changes.

Because these addresses are shared, an IP allowlist alone doesn't prove a request came from your instance. Always require authentication on the services you expose to n8n Cloud.

## n8n Cloud outbound IP address list

n8n recommends that you allowlist every address in this list. In practice, these addresses rarely change. The most reliable way to know which address your instance uses at any point in time is to [check it with a workflow](#find-the-address-your-instance-currently-uses). n8n may add new addresses over time, so if your allowlist starts blocking requests from n8n Cloud, check this page for new ones. Entries ending in `/28` are blocks of 16 addresses. Entries ending in `/32` are single addresses.

```text
4.165.103.112/28
4.182.64.64/28
4.184.78.240/28
9.223.34.48/28
20.52.126.0/28
20.79.32.32/28
20.218.174.0/28
20.218.238.112/28
20.240.52.208/28
20.240.204.176/28
51.107.180.112/28
51.116.119.64/28
4.182.88.118/32
4.182.111.50/32
4.182.128.108/32
4.182.129.20/32
4.182.190.144/32
4.182.191.184/32
4.182.212.136/32
72.144.69.38/32
72.144.83.147/32
72.144.111.50/32
72.144.128.145/32
98.67.233.91/32
98.67.233.200/32
98.67.244.108/32
```

## Find the address your instance currently uses

To allowlist a narrower set, check which address your instance uses now:

1. Create a workflow with a **Manual Trigger** node and an **HTTP Request** node.
2. In the **HTTP Request** node, set **Method** to `GET` and **URL** to an IP echo service, for example `https://api.ipify.org?format=json`. A third party, not n8n, runs this example service.
3. Select **Execute workflow**. The **HTTP Request** node's output shows your instance's current outbound address in the `ip` field.

To confirm over time that the address hasn't changed, add a **Schedule Trigger** node, connect it to the **HTTP Request** node, and publish the workflow.

{% hint style="warning" %}
**A single address isn't guaranteed**

This workflow is a convenience, not a guarantee. Your instance's address can change without notice. If you allowlist only that address, your workflows may stop working when it changes.
{% endhint %}

## Related resources

* [Configure Cloud](./)
* [Set your timezone](set-your-timezone.md)
* [Manage your data](manage-your-data.md)
* [Change instance ownership or username](change-instance-ownership-or-username.md)
