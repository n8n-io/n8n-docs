# n8n Cloud

n8n Cloud is n8n's hosted solution. In addition to all the features of n8n, it provides added benefits such as:

- No technical set up or maintenance for your n8n instance
- 24/7 uptime monitoring
- Managed OAuth for authentication
- One-click upgrades to the newest n8n versions

[Sign up for n8n Cloud](https://www.n8n.cloud/){:target=_blank .external-link}

!!! note "Russia and Belarus"
        n8n Cloud is not available in Russia and Belarus. Refer to our blog post [Update on n8n cloud accounts in Russia and Belarus](https://n8n.io/blog/update-on-n8n-cloud-accounts-in-russia-and-belarus/) for more information.


## Cloud IP addresses

!!! warning "Cloud IP addresses change without warning"
	n8n doesn't guarantee static source IP addresses, as Cloud operates in a dynamic environment, scaling to meet demand.

The `20.218.202.73`. This is subject to change. The NAT addresses are `20.79.227.226` and `20.79.72.36`, but this is also subject to change.

Recommended practice is to allowlist `20.79.72.0/24`, but if you need stricter measures, at minimum you must allowlist `20.218.202.73`, `20.79.72.36`, and `20.79.227.226`.
