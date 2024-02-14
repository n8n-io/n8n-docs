---
contentType: howto
---

# n8n Cloud

n8n Cloud is n8n's hosted solution. It provides:

- No technical set up or maintenance for your n8n instance
- Continual uptime monitoring
- Managed OAuth for authentication
- One-click upgrades to the newest n8n versions

[Sign up for n8n Cloud](https://www.n8n.cloud/){:target=_blank .external-link}

/// note | Russia and Belarus
n8n Cloud isn't available in Russia and Belarus. Refer to this blog post: [Update on n8n cloud accounts in Russia and Belarus](https://n8n.io/blog/update-on-n8n-cloud-accounts-in-russia-and-belarus/) for more information.
///
## Cloud configuration

You can configure settings for your n8n instance in your [Admin dashboard](/cloud-admin-dashboard/). This includes changing your n8n version.


## Cloud IP addresses

/// warning | Cloud IP addresses change without warning
n8n can't guarantee static source IPs, as Cloud operates in a dynamic cloud provider environment and scales its infrastructure to meet demand. You should use strong authentication and secure transport protocols when connecting into and out of n8n.
///
Outbound traffic may appear to originate from any of:

* 20.79.227.226
* 20.79.72.36
* 20.113.47.122
* 20.218.202.73
* 20.79.232.36
* 20.79.192.145
* 20.79.75.61

