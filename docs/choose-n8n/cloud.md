---
contentType: howto
---

# n8n Cloud

n8n Cloud is n8n's hosted solution. In addition to all the features of n8n, it provides added benefits such as:

- No technical set up or maintenance for your n8n instance
- 24/7 uptime monitoring
- Managed OAuth for authentication
- One-click upgrades to the newest n8n versions

[Sign up for n8n Cloud](https://www.n8n.cloud/){:target=_blank .external-link}

!!! note "Russia and Belarus"
        n8n Cloud is not available in Russia and Belarus. Refer to our blog post [Update on n8n cloud accounts in Russia and Belarus](https://n8n.io/blog/update-on-n8n-cloud-accounts-in-russia-and-belarus/) for more information.

## Update your Cloud version

To updated your n8n Cloud instance navigate to your Dashboard:

![Admin Dashboard](/_images/choose-n8n/cloud/dashboard.png)

1. Click the **Settings** button or switch to the **Manage** tab.
2. From **Instance Settings**, use the **n8n version** dropdown to select your desired release version: Latest Stable, Beta, or Latest Beta.

    ![Manage Tab](/_images/choose-n8n/cloud/manage_version.png)

3. Click **Save Changes** to restart your n8n instance and perform the update. A confirmation modal will appear and the **Instance Status** will reflect the update in progress.

    ![Instance Status](/_images/choose-n8n/cloud/instance_status.png)


## Cloud IP addresses

!!! warning "Cloud IP addresses change without warning"
    n8n can't guarantee static source IPs, as Cloud operates in a dynamic cloud provider environment and scales its infrastructure to meet demand. You should use strong authentication and secure transport protocols when connecting into and out of n8n.

Outbound traffic may currently appear to originate from any of:

* 20.79.227.226
* 20.79.72.36
* 20.113.47.122
* 20.218.202.73
* 20.79.232.36

